package com.PremierLeague.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PremierLeague.model.News;
import com.PremierLeague.repository.NewsRepository;

@CrossOrigin(origins = "http://localhost:8081") // Expo local web app

@RestController
@RequestMapping("/api/test")
public class NewsRetrievalController {
	
	@Autowired
	private NewsRepository repo;
	
	
	@GetMapping("/count")
	public long count() {
		
		return repo.count();
		
	}
	
	@GetMapping 
	public List<News> all(){
		
		return repo.findAll();
		
	}
	
 
}