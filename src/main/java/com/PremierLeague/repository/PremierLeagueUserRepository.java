package com.PremierLeague.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.PremierLeague.model.PremierLeagueUser;

import java.util.Optional;

@Repository
public interface PremierLeagueUserRepository extends JpaRepository<PremierLeagueUser, Long> {
    
	
	//now checking the credential by name and paswword
	
	boolean existsByNameAndPassword(String name, String password);
	Optional<PremierLeagueUser> findByEmail(String email);
	Optional<PremierLeagueUser> findByNameAndPassword(String name, String password);

}