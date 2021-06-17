package sportapp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import sportapp.repository.OrderRepository;
import sportapp.service.OrderService;

public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
}
