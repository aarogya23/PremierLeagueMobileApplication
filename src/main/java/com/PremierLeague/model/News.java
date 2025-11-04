package com.PremierLeague.model;

import jakarta.persistence.*;

@Entity
@Table(name = "dataNews")
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "news_id", unique = true)
    private String newsId; // Renamed from 'id' to avoid conflict with entity ID

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "full_desc", nullable = false, columnDefinition = "TEXT")
    private String fullDesc;

    @Column(name = "img", nullable = false)
    private String img;

    @Column(name = "tag", nullable = false)
    private String tag;

    @Column(name = "date", nullable = false)
    private String date;

    // Default constructor for JPA
    public News() {}

    // Constructor without entity ID
    public News(String newsId, String title, String fullDesc, String img, String tag, String date) {
        this.newsId = newsId;
        this.title = title;
        this.fullDesc = fullDesc;
        this.img = img;
        this.tag = tag;
        this.date = date;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNewsId() {
        return newsId;
    }

    public void setNewsId(String newsId) {
        this.newsId = newsId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFullDesc() {
        return fullDesc;
    }

    public void setFullDesc(String fullDesc) {
        this.fullDesc = fullDesc;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}