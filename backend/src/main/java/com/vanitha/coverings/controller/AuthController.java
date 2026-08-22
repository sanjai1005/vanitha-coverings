package com.vanitha.coverings.controller;

import com.vanitha.coverings.model.User;
import com.vanitha.coverings.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // REST API Endpoint: GET /api/auth/seed-admin
    @GetMapping("/seed-admin")
    public ResponseEntity<?> seedAdmin() {
        boolean created = userService.seedAdmin();
        if (created) {
            return ResponseEntity.ok(Map.of("message", "Admin user seeded successfully. Use admin / admin123"));
        }
        return ResponseEntity.ok(Map.of("message", "Admin user already exists."));
    }

    // REST API Endpoint: POST /api/auth/send-otp
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        try {
            String destination = request.get("destination");
            String mode = request.get("mode");
            userService.generateAndStoreOtp(destination, mode);
            return ResponseEntity.ok(Map.of(
                "message", "OTP sent successfully via private SMS",
                "destination", destination
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // REST API Endpoint: POST /api/auth/register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String password = request.get("password");
            String phoneNumber = request.get("phoneNumber");
            String role = request.get("role");
            String otp = request.get("otp");
            String otpDestination = request.get("otpDestination");

            User user = userService.registerUser(username, password, phoneNumber, role, otp, otpDestination);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Registration successful");
            response.put("username", user.getUsername());
            response.put("phoneNumber", user.getPhoneNumber());
            response.put("role", user.getRole());
            response.put("id", user.getId());

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // REST API Endpoint: POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            String usernameOrPhone = request.get("usernameOrPhone");
            String password = request.get("password");

            User user = userService.authenticateUser(usernameOrPhone, password);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("username", user.getUsername());
            response.put("phoneNumber", user.getPhoneNumber());
            response.put("role", user.getRole());
            response.put("id", user.getId());

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));
        }
    }

    // REST API Endpoint: POST /api/auth/forgot-password/reset
    @PostMapping("/forgot-password/reset")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String usernameOrPhone = request.get("usernameOrPhone");
            String otp = request.get("otp");
            String otpDestination = request.get("otpDestination");
            String newPassword = request.get("newPassword");

            userService.resetPassword(usernameOrPhone, otp, otpDestination, newPassword);

            return ResponseEntity.ok(Map.of("message", "Password reset successful"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
