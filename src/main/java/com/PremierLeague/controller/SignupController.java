package com.PremierLeague.controller;


import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.PremierLeague.model.PremierLeagueUser;
import com.PremierLeague.repository.PremierLeagueUserRepository;

@CrossOrigin(origins = "http://localhost:8081") // 👈 Expo Metro bundler port
@RestController
@RequestMapping("/api")
public class SignupController {

    @Autowired
    private PremierLeagueUserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<PremierLeagueUser> signup(@RequestBody PremierLeagueUser user) {
    	
    	//lets add encryption in password 
    	
    	String Password = user.getPassword();
    	
    	//This is going to saved into our databases
    	String hashPassword = DigestUtils.md5Hex(Password.getBytes());
    	
    	//this is going to be saved into the database table
    	user.setPassword(hashPassword);
    	
    	
        PremierLeagueUser saved = userRepository.save(user);
        return ResponseEntity.ok(saved);
    }
}
