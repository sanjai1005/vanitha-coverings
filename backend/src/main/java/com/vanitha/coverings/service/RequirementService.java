package com.vanitha.coverings.service;

import com.vanitha.coverings.model.Requirement;
import com.vanitha.coverings.repository.RequirementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequirementService {

    @Autowired
    private RequirementRepository requirementRepository;

    // Business Logic: Validate customer input and persist custom requirement
    public Requirement createRequirement(String username, String phoneNumber, String message, String imageUrl) {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username is required to submit a requirement");
        }
        if (phoneNumber == null || phoneNumber.trim().isEmpty()) {
            throw new IllegalArgumentException("Phone number is required to submit a requirement");
        }
        if (message == null || message.trim().isEmpty()) {
            throw new IllegalArgumentException("Message details are required to submit a requirement");
        }

        Requirement req = new Requirement(username.trim(), phoneNumber.trim(), message.trim(), imageUrl);
        return requirementRepository.save(req);
    }

    // Business Logic: Retrieve all customer requirements sorted by date descending
    public List<Requirement> getAllRequirements() {
        return requirementRepository.findAllByOrderByCreatedAtDesc();
    }
}
