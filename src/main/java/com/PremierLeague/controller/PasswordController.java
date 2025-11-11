package com.PremierLeague.controller;

import com.PremierLeague.dto.ForgotPasswordRequest;
import com.PremierLeague.dto.ResetPasswordRequest;
import com.PremierLeague.model.PremierLeagueUser;
import com.PremierLeague.repository.PremierLeagueUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import jakarta.mail.internet.MimeMessage;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8081")
public class PasswordController {

    @Autowired
    private PremierLeagueUserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    //ForgetPassword
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        Optional<PremierLeagueUser> existingUser = userRepository.findByEmail(request.getEmail());

        if (existingUser.isEmpty()) {
            return ResponseEntity.status(404).body("No user found with this email");
        }

        PremierLeagueUser user = existingUser.get();

        // Generate 6-character alphanumeric OTP
        String otp = generateOtp(6);
        user.setResetToken(otp); // store OTP in resetToken field
        userRepository.save(user);

        sendOtpEmail(user);

        return ResponseEntity.ok("OTP sent to your email successfully!");
    }

    //Reset Password
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        Optional<PremierLeagueUser> userOpt = userRepository.findByResetToken(request.getToken()); // token is OTP

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(400).body("Invalid or expired OTP");
        }

        PremierLeagueUser user = userOpt.get();
        user.setPassword(request.getNewPassword()); // Hash in production!
        user.setResetToken(null); // Clear OTP after use
        userRepository.save(user);

        return ResponseEntity.ok("Password reset successfully!");
    }

    //Send Otp to the respective gmail account
    private void sendOtpEmail(PremierLeagueUser user) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(user.getEmail());
            helper.setSubject("Premier League Password Reset OTP");
            helper.setText(
                "<p>Hello " + user.getName() + ",</p>" +
                "<p>You requested to reset your password.</p>" +
                "<p>Your OTP is: <b>" + user.getResetToken() + "</b></p>" +
                "<p>Use this OTP to set your new password.</p>" +
                "<br><p>If you didn't request this, ignore this email.</p>",
                true
            );
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String generateOtp(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random rnd = new Random();
        StringBuilder otp = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            otp.append(chars.charAt(rnd.nextInt(chars.length())));
        }
        return otp.toString();
    }
}
