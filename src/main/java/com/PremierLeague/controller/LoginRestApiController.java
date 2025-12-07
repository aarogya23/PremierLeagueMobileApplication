package com.PremierLeague.controller;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.PremierLeague.dto.LoginRequest;
import com.PremierLeague.model.AdminModel;
import com.PremierLeague.model.PremierLeagueUser;
import com.PremierLeague.repository.AdminRepository;
import com.PremierLeague.repository.PremierLeagueUserRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class LoginRestApiController {

    @Autowired
    private PremierLeagueUserRepository userRepo;

    @Autowired
    private AdminRepository adminRepo;

    @PostMapping("/loginbro")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {

        String name = loginRequest.getName();
        String password = loginRequest.getPassword();
        String hashPassword = DigestUtils.md5Hex(password);

        // 1️⃣ CHECK USER TABLE
        if (userRepo.existsByNameAndPassword(name, hashPassword)) {
            return ResponseEntity.ok("USER_LOGIN:" + name);
        }

        // 2️⃣ CHECK ADMIN TABLE
        if (adminRepo.existByUsernameAndPassword(name, hashPassword)) {
            return ResponseEntity.ok("ADMIN_LOGIN:" + name);
        }

        // 3️⃣ IF NOT FOUND
        return ResponseEntity.badRequest().body("Invalid username or password");
    }
}
