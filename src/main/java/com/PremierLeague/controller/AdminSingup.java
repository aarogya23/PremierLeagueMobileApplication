package com.PremierLeague.controller;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PremierLeague.model.AdminModel;
import com.PremierLeague.model.PremierLeagueUser;
import com.PremierLeague.repository.PremierLeagueUserRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class AdminSingup {
	
	@Autowired
	private PremierLeagueUserRepository prepo;
	
	@PostMapping("/adminSignUp")
	public ResponseEntity<AdminModel> signup(@RequestBody AdminModel admin){
		
		//lets add Encryption in password 
		
		
		String Password = admin.getPassword();
		
		String hashPassword = DigestUtils.md5Hex(Password.getBytes());
		
		
		admin.setPassword(hashPassword);
		
		AdminModel saved = prepo.saveAll(admin);
		
		return ResponseEntity.ok(saved);
		
		
		return null;
		
	}

}
