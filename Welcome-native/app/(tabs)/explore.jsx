import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const API_BASE_URL = 'http://localhost:8083/api/players'; // Replace with your machine's IP

const PlayerSearchApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchPlayers = useCallback(async () => {
    if (!searchQuery.trim()) {
      Alert.alert('No Query', 'Please enter a search term.');
      return;
    }

    setLoading(true);
    try {
      // Search by name and team separately, then combine unique results
      const [nameResponse, teamResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/search/byName?name=${encodeURIComponent(searchQuery)}`),
        fetch(`${API_BASE_URL}/search/byTeam?team=${encodeURIComponent(searchQuery)}`),
      ]);

      if (!nameResponse.ok || !teamResponse.ok) {
        throw new Error(`HTTP error! status: ${nameResponse.status || teamResponse.status}`);
      }

      const nameData = await nameResponse.json();
      const teamData = await teamResponse.json();

      // Combine and remove duplicates based on ID
      const combined = [...nameData, ...teamData];
      const uniquePlayers = combined.filter(
        (player, index, self) => index === self.findIndex(p => p.id === player.id)
      );

      setPlayers(uniquePlayers);
    } catch (error) {
      console.error('Search error:', error);
      Alert.alert('Error', `Failed to search players: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    setPlayers([]);
  };

  const handleSearchSubmit = useCallback(() => {
    searchPlayers();
  }, [searchPlayers]);

  const renderPlayer = ({ item }) => (
    <View style={styles.playerItem}>
      <Text style={styles.playerName}>{item.name}</Text>
      <Text style={styles.playerTeam}>Team: {item.team}</Text>
      <Text style={styles.playerGoals}>Goals: {item.goals}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Premier League Player Search</Text>

      {/* Single Search Input Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name or team (e.g., Salah or Liverpool)"
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
          autoCapitalize="words"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? '...' : 'Search'}</Text>
        </TouchableOpacity>
      </View>

      {/* Clear Button */}
      {searchQuery && (
        <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
          <Text style={styles.clearText}>Clear Search</Text>
        </TouchableOpacity>
      )}

      {/* Results */}
      {players.length > 0 && (
        <View style={styles.results}>
          <Text style={styles.resultsTitle}>Search Results ({players.length} players):</Text>
          <FlatList
            data={players}
            renderItem={renderPlayer}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
          />
        </View>
      )}

      {players.length === 0 && !loading && searchQuery && (
        <Text style={styles.noResults}>No players found. Try a different search term.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginBottom: 20,
  },
  clearText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
  results: {
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  list: {
    maxHeight: 400,
  },
  playerItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  playerTeam: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  playerGoals: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 5,
    fontWeight: '600',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
    padding: 20,
  },
});

export default PlayerSearchApp;