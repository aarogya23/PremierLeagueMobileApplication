package com.PremierLeague.controller;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import com.PremierLeague.model.PremierLeagueUser;
import com.PremierLeague.repository.PremierLeagueUserRepository;

import jakarta.mail.internet.MimeMessage;

@CrossOrigin(origins = "http://localhost:8081") // React Native Expo server
@RestController
@RequestMapping("/api")
public class SignupController {

    @Autowired
    private PremierLeagueUserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    // ✅ Signup endpoint
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody PremierLeagueUser user) {
        try {
            // 1️⃣ Encrypt password using MD5 (for demo — use BCrypt in real projects)
            String hashedPassword = DigestUtils.md5Hex(user.getPassword().getBytes());
            user.setPassword(hashedPassword);

            // 2️⃣ Save to DB
            PremierLeagueUser savedUser = userRepository.save(user);

            // 3️⃣ Send HTML welcome email
            sendWelcomeEmail(savedUser);

            // 4️⃣ Remove password before returning response
            savedUser.setPassword(null);

            return ResponseEntity.ok(savedUser);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Signup failed: " + e.getMessage());
        }
    }

    // ✅ Helper method for sending styled HTML email
    private void sendWelcomeEmail(PremierLeagueUser user) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(user.getEmail());
            helper.setSubject("Welcome to Premier League App ⚽");

            // 📨 HTML email content
            String htmlContent = """
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
                    <div style="text-align: center;">
                        <img src="cid:eplLogo" alt="Premier League Logo" style="width: 140px; margin-bottom: 20px;">
                    </div>

                    <h2 style="color: #1e90ff; text-align: center;">Welcome to Premier League App ⚽</h2>
                    <p>Dear <b>%s</b>,</p>
                    <p>Thank you for registering! You're now part of the Premier League community.</p>
                    <p>Enjoy exclusive access to news, scores, and stats of your favorite team <b>%s</b>.</p>
                    
                    <hr style="margin: 20px 0;">
                    
                    <p style="font-size: 13px; color: #555;">Stay connected with us for the latest updates!</p>

                    <div style="margin-top: 30px; text-align: center; padding-top: 10px; border-top: 1px solid #ddd;">
                        <p style="font-size: 12px; color: #777;">© 2025 Premier League App. All rights reserved.</p>
                    </div>
                </div>
                """.formatted(user.getName(), user.getPreferredTeam());

            helper.setText(htmlContent, true);

            // 🖼️ Embed your logo image from src/main/resources/static/images/EFL.webp
            helper.addInline("eplLogo", new ClassPathResource("static/images/ppp.webp"));

            // ✅ Send email
            mailSender.send(message);
            System.out.println("✅ Email sent successfully to: " + user.getEmail());
        } catch (Exception e) {
            System.err.println("❌ Failed to send email: " + e.getMessage());
        }
    }
}
