package sportapp.ord.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import sportapp.cat.model.Category;
import sportapp.ord.model.Order;
import sportapp.ord.model.OrderDTO;
import sportapp.ord.repository.OrderRepository;
import sportapp.prod.model.Product;
import sportapp.prod.repository.ProductRepository;
import sportapp.prod.service.ProductService;
import sportapp.usr.model.User;
import sportapp.usr.repository.UserRepository;

import java.security.Principal;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ProductRepository productRespository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping()
    public List<Order> getOrders() {
            return orderRepository.findAll();
    }

    @GetMapping(value = {"/my"})
    public List<Order> getMyOrders(Principal principal) {
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;
        User user = (User) token.getPrincipal();
        return orderRepository.findByUserId(user.getId());
    }

    @GetMapping(value = {"/product/{productId}"})
    public List<Order> getProductOrders(@PathVariable Long productId) {
        return orderRepository.findByProductId(productId);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Order createOrder(@RequestBody OrderDTO orderDTO){
        Order order = modelMapper.map(orderDTO, Order.class);
        if(orderDTO.getProductId() > 0) {
            order.setProduct(productRespository.getOne(orderDTO.getProductId()));
        }
        if(orderDTO.getUserId() > 0) {
            order.setUser(userRepository.getOne(orderDTO.getUserId()));
        }
        return orderRepository.save(order);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long orderId, @RequestBody Order orderDetails) {
        Order order = orderRepository.getOne(orderId);
        order.setProduct(orderDetails.getProduct());
        order.setUser(orderDetails.getUser());
        order.setDateFrom(orderDetails.getDateFrom());
        order.setDateTo(orderDetails.getDateTo());
        Order updatedOrder = orderRepository.save(order);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Map<String, Boolean>> deleteOrder(@PathVariable Long id){
        Order order = orderRepository.getOne(id);
        orderRepository.delete(order);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Usunięto", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
