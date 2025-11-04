package com.PremierLeague.controller;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.PremierLeague.model.PremierLeagueUser;
import com.PremierLeague.repository.PremierLeagueUserRepository;

@CrossOrigin(origins = "http://localhost:8081") // React Native app
@RestController
@RequestMapping("/api")
public class LoginRestApiController {

    @Autowired
    private PremierLeagueUserRepository userRepository;

    @PostMapping("/loginbro")
    public ResponseEntity<String> login(@RequestBody PremierLeagueUser loginRequest) {
        String name = loginRequest.getName(); // or getUsername() if that’s your field
        String inputPassword = loginRequest.getPassword();

        // Hash the password — must match signup hashing method
        String hashedInputPassword = DigestUtils.md5Hex(inputPassword);

        // Check if user exists by name + hashed password
        boolean userExists = userRepository.existsByNameAndPassword(name, hashedInputPassword);

        if (userExists) {
            return ResponseEntity.ok("Login successful for user: " + name);
        } else {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }
    }
}
