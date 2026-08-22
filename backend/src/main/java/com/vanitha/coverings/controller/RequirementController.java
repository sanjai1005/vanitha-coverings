package com.vanitha.coverings.controller;

import com.vanitha.coverings.model.Requirement;
import com.vanitha.coverings.service.RequirementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/requirements")
public class RequirementController {

    @Autowired
    private RequirementService requirementService;

    @GetMapping
    public ResponseEntity<List<Requirement>> getAllRequirements() {
        return ResponseEntity.ok(requirementService.getAllRequirements());
    }

    @PostMapping
    public ResponseEntity<?> submitRequirement(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String phoneNumber = request.get("phoneNumber");
            String message = request.get("message");
            String imageUrl = request.get("imageUrl");

            Requirement req = requirementService.createRequirement(username, phoneNumber, message, imageUrl);

            return ResponseEntity.ok(Map.of(
                "message", "Requirement submitted successfully",
                "id", req.getId()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
