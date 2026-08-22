package com.vanitha.coverings.controller;

import com.vanitha.coverings.model.Requirement;
import com.vanitha.coverings.service.RequirementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    @Autowired
    private RequirementService requirementService;

    // REST API Endpoint: POST /api/chatbot/submit
    @PostMapping("/submit")
    public ResponseEntity<?> submitRequirement(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String phoneNumber = request.get("phoneNumber");
            String message = request.get("message");
            String imageUrl = request.get("imageUrl");

            Requirement req = requirementService.createRequirement(username, phoneNumber, message, imageUrl);

            return ResponseEntity.ok(Map.of(
                "message", "Requirement submitted successfully. Admin will contact you soon!",
                "id", req.getId()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // REST API Endpoint: GET /api/chatbot/requirements
    @GetMapping("/requirements")
    public ResponseEntity<List<Requirement>> getRequirements() {
        List<Requirement> requirements = requirementService.getAllRequirements();
        return ResponseEntity.ok(requirements);
    }
}
