package sportapp.ord.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sportapp.ord.model.Order;
import sportapp.ord.repository.OrderRepository;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping(value = {"/"})
    public List<Order> getOrders(Long productId, Long userId) {
        if(productId != null && userId != null) {
            return orderRepository.findByProductIdAndUserId(productId, userId);
        } else if (userId == null && productId != null) {
            return orderRepository.findByProductId(productId);
        } else if (userId != null) {
            return orderRepository.findByUserId(userId);
        } else {
            return null;
        }
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Order createOrder(Order order){
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
