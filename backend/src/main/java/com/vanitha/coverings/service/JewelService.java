package com.vanitha.coverings.service;

import com.vanitha.coverings.model.Jewel;
import com.vanitha.coverings.repository.JewelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JewelService {

    @Autowired
    private JewelRepository jewelRepository;

    // Business Logic: Retrieve all available jewels
    public List<Jewel> getAllJewels() {
        return jewelRepository.findAll();
    }

    // Business Logic: Retrieve jewels by exact category or category prefix match
    public List<Jewel> getJewelsByCategory(String category, boolean prefix) {
        if (prefix) {
            return jewelRepository.findByCategoryStartsWith(category);
        } else {
            return jewelRepository.findByCategory(category);
        }
    }

    // Business Logic: Find jewel by ID
    public Optional<Jewel> getJewelById(Long id) {
        return jewelRepository.findById(id);
    }

    // Business Logic: Validate required fields and persist new jewel
    public Jewel addJewel(Jewel jewel) {
        if (jewel.getNameEn() == null || jewel.getNameEn().trim().isEmpty()) {
            throw new IllegalArgumentException("Jewel English Name is required");
        }
        if (jewel.getPrice() == null || jewel.getPrice() <= 0) {
            throw new IllegalArgumentException("Jewel Price must be greater than zero");
        }
        if (jewel.getCategory() == null || jewel.getCategory().trim().isEmpty()) {
            throw new IllegalArgumentException("Jewel Category is required");
        }
        return jewelRepository.save(jewel);
    }

    // Business Logic: Update existing jewel fields
    public Jewel updateJewel(Long id, Jewel updatedDetails) {
        Optional<Jewel> existingOpt = jewelRepository.findById(id);
        if (existingOpt.isEmpty()) {
            throw new IllegalArgumentException("Jewel not found with ID: " + id);
        }

        Jewel jewel = existingOpt.get();
        if (updatedDetails.getNameEn() != null) jewel.setNameEn(updatedDetails.getNameEn());
        if (updatedDetails.getNameTa() != null) jewel.setNameTa(updatedDetails.getNameTa());
        if (updatedDetails.getDescriptionEn() != null) jewel.setDescriptionEn(updatedDetails.getDescriptionEn());
        if (updatedDetails.getDescriptionTa() != null) jewel.setDescriptionTa(updatedDetails.getDescriptionTa());
        if (updatedDetails.getPrice() != null) jewel.setPrice(updatedDetails.getPrice());
        if (updatedDetails.getImageUrl() != null) jewel.setImageUrl(updatedDetails.getImageUrl());
        if (updatedDetails.getCategory() != null) jewel.setCategory(updatedDetails.getCategory());

        return jewelRepository.save(jewel);
    }

    // Business Logic: Check existence and delete jewel
    public boolean deleteJewel(Long id) {
        if (!jewelRepository.existsById(id)) {
            return false;
        }
        jewelRepository.deleteById(id);
        return true;
    }
}
