package com.vanitha.coverings.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "customer_orders")
public class CustomerOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String orderIdStr;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String doorNo;

    @Column(nullable = false)
    private String street;

    @Column(nullable = false)
    private String area;

    @Column(nullable = false)
    private String district;

    @Column(nullable = false)
    private String pincode;

    @Lob
    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String itemsSummary;

    @Column(nullable = false)
    private Double totalAmount;

    @Column(nullable = false)
    private String paymentMethod; // e.g. "Cash / Online UPI on Delivery"

    @Column(nullable = false)
    private String status = "PENDING"; // PENDING, CONFIRMED, DISPATCHED, DELIVERED, CANCELLED

    @Column(nullable = true)
    private String expectedDeliveryDate; // e.g. "Tomorrow by 5:00 PM" or "2026-08-21"

    @Column(name = "created_at", nullable = true)
    private LocalDateTime createdAt = LocalDateTime.now();

    public CustomerOrder() {}

    public CustomerOrder(String orderIdStr, String username, String fullName, String phone,
                         String doorNo, String street, String area, String district, String pincode,
                         String itemsSummary, Double totalAmount, String paymentMethod) {
        this.orderIdStr = orderIdStr;
        this.username = username;
        this.fullName = fullName;
        this.phone = phone;
        this.doorNo = doorNo;
        this.street = street;
        this.area = area;
        this.district = district;
        this.pincode = pincode;
        this.itemsSummary = itemsSummary;
        this.totalAmount = totalAmount;
        this.paymentMethod = paymentMethod;
        this.status = "PENDING";
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderIdStr() {
        return orderIdStr;
    }

    public void setOrderIdStr(String orderIdStr) {
        this.orderIdStr = orderIdStr;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDoorNo() {
        return doorNo;
    }

    public void setDoorNo(String doorNo) {
        this.doorNo = doorNo;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getItemsSummary() {
        return itemsSummary;
    }

    public void setItemsSummary(String itemsSummary) {
        this.itemsSummary = itemsSummary;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getExpectedDeliveryDate() {
        return expectedDeliveryDate;
    }

    public void setExpectedDeliveryDate(String expectedDeliveryDate) {
        this.expectedDeliveryDate = expectedDeliveryDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
