package com.PremierLeague.model;

import jakarta.persistence.*;

@Entity
@Table(name = "premier_league_users")
public class PremierLeagueUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;
    private String preferredTeam;

    // Default constructor
    public PremierLeagueUser() {}

    // Constructor
    public PremierLeagueUser(String name, String email, String password, String preferredTeam) {
        this.name = name;
        this.email = email;
        this.password = password; // Hash in prod!
        this.preferredTeam = preferredTeam;
    }

    // Getters/Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getPreferredTeam() { return preferredTeam; }
    public void setPreferredTeam(String preferredTeam) { this.preferredTeam = preferredTeam; }
}