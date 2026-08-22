package com.vanitha.coverings.controller;

import com.vanitha.coverings.model.CustomerOrder;
import com.vanitha.coverings.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody CustomerOrder order) {
        try {
            CustomerOrder savedOrder = orderService.createOrder(order);
            return ResponseEntity.ok(Map.of(
                "message", "Order placed successfully",
                "orderId", savedOrder.getId(),
                "orderIdStr", savedOrder.getOrderIdStr()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<CustomerOrder>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<CustomerOrder>> getOrdersByUsername(@PathVariable String username) {
        return ResponseEntity.ok(orderService.getOrdersByUsername(username));
    }

    @PutMapping("/{id}/delivery-date")
    public ResponseEntity<?> updateDeliveryDate(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload) {
        String expectedDeliveryDate = payload.get("expectedDeliveryDate");
        String status = payload.get("status");

        return orderService.updateDeliveryDate(id, expectedDeliveryDate, status)
                .map(updated -> ResponseEntity.ok(Map.of(
                    "message", "Delivery date and status updated successfully",
                    "order", updated
                )))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload) {
        String status = payload.get("status");
        return orderService.updateDeliveryDate(id, null, status)
                .map(updated -> ResponseEntity.ok(Map.of(
                    "message", "Order status updated successfully",
                    "order", updated
                )))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
