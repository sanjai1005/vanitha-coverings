package com.vanitha.coverings.service;

import com.vanitha.coverings.model.CustomerOrder;
import com.vanitha.coverings.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public CustomerOrder createOrder(CustomerOrder order) {
        return orderRepository.save(order);
    }

    public List<CustomerOrder> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<CustomerOrder> getOrdersByUsername(String username) {
        return orderRepository.findByUsernameOrderByCreatedAtDesc(username);
    }

    public Optional<CustomerOrder> updateDeliveryDate(Long orderId, String expectedDeliveryDate, String status) {
        return orderRepository.findById(orderId).map(order -> {
            if (expectedDeliveryDate != null) {
                order.setExpectedDeliveryDate(expectedDeliveryDate);
            }
            if (status != null && !status.trim().isEmpty()) {
                order.setStatus(status);
            }
            return orderRepository.save(order);
        });
    }
}
