// POST Controller: Handles saving news (NewsCreateController.java)
package com.PremierLeague.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PremierLeague.model.News;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    // Shared static list for simplicity
    public static List<News> savedNews = new ArrayList<>();

    @PostMapping
    public ResponseEntity<News> createNews(@RequestBody News news) {
    	
        savedNews.add(news);  // Save it
        System.out.println("The data is saved inside the database");
        return ResponseEntity.status(HttpStatus.CREATED).body(news);
    }

    // Static getter for the GET controller
    public static List<News> getSavedNews() {
        return savedNews;
    }
}