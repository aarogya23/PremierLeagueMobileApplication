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
        
    	//these elements comes from the jsx point 
    	String name = loginRequest.getName(); 


        String inputPassword = loginRequest.getPassword();

      
        String hashPassword = DigestUtils.md5Hex(inputPassword);

        
        userRepository.existsByNameAndPassword(name, hashPassword);

        if (userRepository.existsByNameAndPassword(name, hashPassword)) {
            return ResponseEntity.ok("Login successful for user: " + name);
        } 
        
        
            return ResponseEntity.badRequest().body("Invalid username or password");
        
    }
}
