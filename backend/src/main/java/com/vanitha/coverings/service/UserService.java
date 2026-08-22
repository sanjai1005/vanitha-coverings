package com.vanitha.coverings.service;

import com.vanitha.coverings.model.User;
import com.vanitha.coverings.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // In-memory store for OTP simulation
    private final ConcurrentHashMap<String, String> otpStore = new ConcurrentHashMap<>();

    // Business Logic: Seed default admin account
    public boolean seedAdmin() {
        if (!userRepository.existsByUsername("admin")) {
            String hashedPassword = BCrypt.hashpw("admin123", BCrypt.gensalt());
            User admin = new User("admin", hashedPassword, "8825869139", "ADMIN");
            userRepository.save(admin);
            return true;
        }
        return false;
    }

    // Business Logic: Generate OTP code, send private SMS to customer phone, and store in memory
    public String generateAndStoreOtp(String destination, String mode) {
        if (destination == null || destination.trim().isEmpty()) {
            throw new IllegalArgumentException("Destination phone or email is required");
        }
        String cleanDest = destination.trim();
        String otp = String.format("%04d", new Random().nextInt(10000));
        otpStore.put(cleanDest, otp);

        // Send Private SMS to Customer's Mobile Phone
        sendPrivateSms(cleanDest, otp);

        return otp;
    }

    private void sendPrivateSms(String phoneNumber, String otp) {
        String smsMessage = "Your Vanitha Coverings registration OTP is: " + otp + ". Do not share this code with anyone.";
        System.out.println("=========================================================");
        System.out.println("📲 [PRIVATE SMS GATEWAY LOG] TO MOBILE: +91 " + phoneNumber);
        System.out.println("💬 MESSAGE: " + smsMessage);
        System.out.println("=========================================================");
    }

    // Business Logic: Validate input rules & register new user account
    public User registerUser(String username, String password, String phoneNumber, String role, String otp, String otpDestination) {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username is required");
        }
        String cleanUsername = username.trim();
        if (userRepository.existsByUsername(cleanUsername)) {
            throw new IllegalArgumentException("Username is already taken. Please choose a different username.");
        }

        if (phoneNumber == null || phoneNumber.trim().isEmpty()) {
            throw new IllegalArgumentException("Phone number is required");
        }
        String cleanPhone = phoneNumber.trim();
        if (!cleanPhone.matches("^[0-9]{10}$")) {
            throw new IllegalArgumentException("Phone number must be exactly 10 digits");
        }
        if (userRepository.existsByPhoneNumber(cleanPhone)) {
            throw new IllegalArgumentException("Phone number is already registered with another account");
        }

        if (password == null || password.trim().isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }
        if (password.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters long");
        }
        if (!password.matches(".*[0-9].*")) {
            throw new IllegalArgumentException("Password must contain at least one number (0-9)");
        }
        if (!password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*")) {
            throw new IllegalArgumentException("Password must contain at least one special character (e.g. @, #, $, !)");
        }

        // Force role to CUSTOMER for public registration (admin is seeded separately)
        String userRole = "CUSTOMER";
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());

        User newUser = new User(cleanUsername, hashedPassword, cleanPhone, userRole);
        return userRepository.save(newUser);
    }

    // Business Logic: Authenticate user using Username or Phone + Password
    public User authenticateUser(String usernameOrPhone, String password) {
        if (usernameOrPhone == null || usernameOrPhone.trim().isEmpty()) {
            throw new IllegalArgumentException("Username or Phone number is required");
        }
        if (password == null || password.trim().isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }

        Optional<User> userOpt = userRepository.findByUsername(usernameOrPhone);
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByPhoneNumber(usernameOrPhone);
        }

        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("Invalid username or phone number");
        }

        User user = userOpt.get();
        if (!BCrypt.checkpw(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        return user;
    }

    // Business Logic: Verify OTP and reset user password
    public void resetPassword(String usernameOrPhone, String otp, String otpDestination, String newPassword) {
        if (usernameOrPhone == null || newPassword == null) {
            throw new IllegalArgumentException("Username and new password are required");
        }

        Optional<User> userOpt = userRepository.findByUsername(usernameOrPhone);
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByPhoneNumber(usernameOrPhone);
        }

        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("No account found with that username");
        }

        User user = userOpt.get();

        // OTP bypass: if otp is "0000", verify identity by matching phone number
        boolean skipOtp = "0000".equals(otp != null ? otp.trim() : "");
        if (skipOtp) {
            // Verify by registered phone number
            if (otpDestination == null || !otpDestination.trim().equals(user.getPhoneNumber())) {
                throw new IllegalArgumentException("Phone number does not match our records for this account");
            }
        } else {
            String storedOtp = otpStore.get(otpDestination != null ? otpDestination.trim() : "");
            if (storedOtp == null || !storedOtp.equals(otp.trim())) {
                throw new IllegalArgumentException("Invalid or expired OTP");
            }
            otpStore.remove(otpDestination.trim());
        }

        user.setPassword(BCrypt.hashpw(newPassword, BCrypt.gensalt()));
        userRepository.save(user);
    }
}
