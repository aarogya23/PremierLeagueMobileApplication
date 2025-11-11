package com.PremierLeague.repository;

import com.PremierLeague.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    // Search by name (partial match, case-insensitive) - Spring Data JPA auto-generates this
    List<Player> findByNameContainingIgnoreCase(String name);

    // Search by team (partial match, case-insensitive) - Spring Data JPA auto-generates this
    List<Player> findByTeamContainingIgnoreCase(String team);

    // Search by exact goals - Spring Data JPA auto-generates this
    List<Player> findByGoals(int goals);

    // Search by goals greater than or equal to - Spring Data JPA auto-generates this
    List<Player> findByGoalsGreaterThanEqual(int goals);

    // General search with optional criteria using custom JPQL query
    @Query("SELECT p FROM Player p " +
           "WHERE (:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))) " +
           "AND (:team IS NULL OR LOWER(p.team) LIKE LOWER(CONCAT('%', :team, '%'))) " +
           "AND (:minGoals IS NULL OR p.goals >= :minGoals) " +
           "AND (:maxGoals IS NULL OR p.goals <= :maxGoals)")
    List<Player> findByCriteria(@Param("name") String name,
                                @Param("team") String team,
                                @Param("minGoals") Integer minGoals,
                                @Param("maxGoals") Integer maxGoals);
}