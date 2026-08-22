package com.vanitha.coverings.model;

import jakarta.persistence.*;

@Entity
@Table(name = "jewels")
public class Jewel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nameEn;

    @Column(nullable = false)
    private String nameTa;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String descriptionEn;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String descriptionTa;

    @Column(nullable = false)
    private Double price;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String imageUrl;

    @Column(nullable = false)
    private String category; // e.g. "Chains - Baby Chains"

    @Column(name = "created_at", nullable = true)
    private java.time.LocalDateTime createdAt = java.time.LocalDateTime.now();

    // Constructors
    public Jewel() {}

    public Jewel(String nameEn, String nameTa, String descriptionEn, String descriptionTa, Double price, String imageUrl, String category) {
        this.nameEn = nameEn;
        this.nameTa = nameTa;
        this.descriptionEn = descriptionEn;
        this.descriptionTa = descriptionTa;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.createdAt = java.time.LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameEn() {
        return nameEn;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    public String getNameTa() {
        return nameTa;
    }

    public void setNameTa(String nameTa) {
        this.nameTa = nameTa;
    }

    public String getDescriptionEn() {
        return descriptionEn;
    }

    public void setDescriptionEn(String descriptionEn) {
        this.descriptionEn = descriptionEn;
    }

    public String getDescriptionTa() {
        return descriptionTa;
    }

    public void setDescriptionTa(String descriptionTa) {
        this.descriptionTa = descriptionTa;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public java.time.LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(java.time.LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
