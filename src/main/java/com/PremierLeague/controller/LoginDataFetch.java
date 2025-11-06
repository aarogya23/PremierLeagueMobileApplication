package com.PremierLeague.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PremierLeague.model.PremierLeagueUser;
import com.PremierLeague.repository.PremierLeagueUserRepository;

@CrossOrigin (origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class LoginDataFetch {
	
	
  @Autowired
  private PremierLeagueUserRepository urepo;
  
  @GetMapping("/loginCount")
  public long count() {
	  
	  return urepo.count();
	  }
  
  
  @GetMapping("/allData")
  public List<PremierLeagueUser> all(){
	  return urepo.findAll();
  }
	
	

}
