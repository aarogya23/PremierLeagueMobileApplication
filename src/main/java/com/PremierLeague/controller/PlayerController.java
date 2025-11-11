package com.PremierLeague.controller;

import com.PremierLeague.model.Player;
import com.PremierLeague.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "http://localhost:8081") // Optional: Enable CORS if needed for frontend integration
public class PlayerController {

    @Autowired
    private PlayerRepository playerRepository;

    // Search players by name (partial match, case-insensitive)
    @GetMapping("/search/byName")
    public ResponseEntity<List<Player>> searchByName(@RequestParam String name) {
        List<Player> players = playerRepository.findByNameContainingIgnoreCase(name);
        return ResponseEntity.ok(players);
    }

    // Search players by team (partial match, case-insensitive)
    @GetMapping("/search/byTeam")
    public ResponseEntity<List<Player>> searchByTeam(@RequestParam String team) {
        List<Player> players = playerRepository.findByTeamContainingIgnoreCase(team);
        return ResponseEntity.ok(players);
    }

    // Search players by goals (exact match)
    @GetMapping("/search/byGoals")
    public ResponseEntity<List<Player>> searchByGoals(@RequestParam int goals) {
        List<Player> players = playerRepository.findByGoals(goals);
        return ResponseEntity.ok(players);
    }

    // Search players by goals greater than or equal to (for filtering top scorers, etc.)
    @GetMapping("/search/byGoalsGreaterThan")
    public ResponseEntity<List<Player>> searchByGoalsGreaterThan(@RequestParam int goals) {
        List<Player> players = playerRepository.findByGoalsGreaterThanEqual(goals);
        return ResponseEntity.ok(players);
    }

    // Retrieve player by ID
    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable Long id) {
        Optional<Player> player = playerRepository.findById(id);
        if (player.isPresent()) {
            return ResponseEntity.ok(player.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Optional: General search endpoint accepting multiple optional parameters
    @GetMapping("/search")
    public ResponseEntity<List<Player>> generalSearch(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String team,
            @RequestParam(required = false) Integer minGoals,
            @RequestParam(required = false) Integer maxGoals) {
        // Implement custom query logic here, e.g., using Specifications or a custom repo method
        // For simplicity, assuming a custom method in repository: findByCriteria(name, team, minGoals, maxGoals)
        List<Player> players = playerRepository.findByCriteria(name, team, minGoals, maxGoals);
        return ResponseEntity.ok(players);
    }
}