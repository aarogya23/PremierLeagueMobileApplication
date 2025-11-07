import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Install via: expo install expo-linear-gradient

const SquadSelectionScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#1a0d2e', '#16213e']} style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Premier League</Text>
          <Text style={styles.headerSubtitle}>Copilot by Microsoft</Text>
        </View>
        <View style={styles.headerRight}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150x50/FF6B6B/FFFFFF?text=Logo' }}
            style={styles.logo}
          />
        </View>
      </LinearGradient>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNav]}>
          <Text style={styles.navText}>Squad selection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Squad Selection Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Squad Selection</Text>
        <Text style={styles.sectionSubtitle}>
          Select or auto pick if you're short of time.
        </Text>
        <Text style={styles.gameweek}>Gameweek 11 • Deadline Sat Nov 8, 16:45</Text>
        
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>Team Name</Text>
          <Text style={styles.teamName}>Aarogya Thapa</Text>
          <View style={styles.stats}>
            <Text style={styles.stat}>0/15</Text>
            <Text style={styles.statLabel}>Selected</Text>
            <Text style={styles.stat}>£100.0m</Text>
            <Text style={styles.statLabel}>Bank</Text>
          </View>
        </View>

        {/* Pitch View */}
        <View style={styles.pitchContainer}>
          <View style={styles.pitch}>
            <Text style={styles.pitchLabel}>GK</Text>
            <View style={styles.gkPosition} />
            <View style={styles.defLine}>
              <Text style={styles.positionLabel}>DEF</Text>
              <View style={styles.defPositions} />
            </View>
            <View style={styles.midLine}>
              <Text style={styles.positionLabel}>MID</Text>
              <View style={styles.midPositions} />
            </View>
            <View style={styles.fwdLine}>
              <Text style={styles.positionLabel}>FWD</Text>
              <View style={styles.fwdPositions} />
            </View>
          </View>
        </View>

        <View style={styles.pitchButtons}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Auto Pick</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPrimary}>
            <Text style={styles.buttonTextPrimary}>Enter Squad</Text>
          </TouchableOpacity>
        </View>

        {/* View Toggle */}
        <View style={styles.viewToggle}>
          <TouchableOpacity style={[styles.toggleButton, styles.activeToggle]}>
            <Text style={styles.toggleText}>Pitch View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton}>
            <Text style={styles.toggleText}>List View</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Latest News */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest News</Text>
        <View style={styles.newsItem}>
          <Image
            source={{ uri: 'https://via.placeholder.com/20x20/FF0000/FFFFFF?text=MU' }}
            style={styles.newsIcon}
          />
          <Text style={styles.newsText}>Amorim gives update on Man Utd squad ahead of</Text>
        </View>
        <View style={styles.newsItem}>
          <Image
            source={{ uri: 'https://via.placeholder.com/20x20/0000FF/FFFFFF?text=EV' }}
            style={styles.newsIcon}
          />
          <Text style={styles.newsText}>Silva encor</Text>
        </View>
      </View>

      {/* Fixtures */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fixtures Gameweek 11</Text>
        <Text style={styles.gameweek}>Sat Nov 8 - Sun Nov 9</Text>
        <Text style={styles.deadline}>Deadlines Sat Nov 8, 16:45</Text>
        <Text style={styles.timeNote}>All times are shown in your local time</Text>
        
        <View style={styles.fixture}>
          <Text style={styles.fixtureTime}>18:15</Text>
          <View style={styles.matchup}>
            <Image source={{ uri: 'https://via.placeholder.com/30x30/FFFFFF/000000?text=Spurs' }} style={styles.teamLogo} />
            <Text>Spurs</Text>
            <Text style={styles.vs}>vs</Text>
            <Image source={{ uri: 'https://via.placeholder.com/30x30/FF0000/FFFFFF?text=ManUtd' }} style={styles.teamLogo} />
            <Text>Man Utd</Text>
          </View>
        </View>
        {/* Add more fixtures similarly */}
        <View style={styles.fixture}>
          <Text style={styles.fixtureTime}>20:45</Text>
          <View style={styles.matchup}>
            <Image source={{ uri: 'https://via.placeholder.com/30x30/0000FF/FFFFFF?text=Everton' }} style={styles.teamLogo} />
            <Text>Everton</Text>
            <Text style={styles.vs}>vs</Text>
            <Image source={{ uri: 'https://via.placeholder.com/30x30/FFFFFF/000000?text=Fulham' }} style={styles.teamLogo} />
            <Text>Fulham</Text>
          </View>
        </View>
        {/* Truncate for brevity; add the rest */}
      </View>

      {/* Sponsors */}
      <View style={styles.sponsors}>
        <Image source={{ uri: 'https://via.placeholder.com/100x50/000000/FFFFFF?text=EA' }} style={styles.sponsorLogo} />
        <Image source={{ uri: 'https://via.placeholder.com/100x50/FF0000/FFFFFF?text=Adobe' }} style={styles.sponsorLogo} />
        <Image source={{ uri: 'https://via.placeholder.com/100x50/0000FF/FFFFFF?text=Barclays' }} style={styles.sponsorLogo} />
        {/* Add more */}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomNavItem}>
          <Text style={styles.bottomNavText}>Matches</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem}>
          <Text style={styles.bottomNavText}>Table</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem}>
          <Text style={styles.bottomNavText}>Statistics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem}>
          <Text style={styles.bottomNavText}>Latest News</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem}>
          <Text style={styles.bottomNavText}>Latest Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem}>
          <Text style={styles.bottomNavText}>Clubs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem}>
          <Text style={styles.bottomNavText}>Players</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© Premier League 2025</Text>
        <Text style={styles.footerLink}>Modern Slavery Statement</Text>
        <Text style={styles.footerLink}>Privacy, Diversity and Inclusion Policy</Text>
        <Text style={styles.footerLink}>Contact Us | Appearance League Back to Top</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50, // For status bar
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#CCC',
    fontSize: 12,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  logo: {
    width: 100,
    height: 30,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#2a1b3d',
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeNav: {
    borderBottomWidth: 2,
    borderBottomColor: '#00FF00',
  },
  navText: {
    color: '#FFF',
    fontSize: 14,
  },
  section: {
    padding: 16,
    backgroundColor: '#1a0d2e',
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: '#CCC',
    fontSize: 14,
    marginBottom: 8,
  },
  gameweek: {
    color: '#00FF00',
    fontSize: 16,
    marginBottom: 16,
  },
  teamInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  teamName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 8,
  },
  stat: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#CCC',
    fontSize: 12,
    textAlign: 'center',
  },
  pitchContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  pitch: {
    width: '90%',
    height: 300,
    backgroundColor: '#228B22',
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative',
  },
  pitchLabel: {
    color: '#FFF',
    fontSize: 14,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  defLine: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  positionLabel: {
    color: '#FFF',
    fontSize: 14,
    marginRight: 10,
  },
  defPositions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  // Similar for mid and fwd
  midLine: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 40,
  },
  midPositions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  fwdLine: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 60,
  },
  fwdPositions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  // Position slots as small circles or squares
  gkPosition: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#000',
  },
  // Repeat for others, e.g., defPositions has 4 small views
  pitchButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonPrimary: {
    backgroundColor: '#00FF00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  buttonTextPrimary: {
    color: '#000',
    fontWeight: 'bold',
  },
  viewToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeToggle: {
    borderColor: '#00FF00',
    backgroundColor: '#00FF00',
  },
  toggleText: {
    color: '#FFF',
  },
  newsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  newsIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  newsText: {
    color: '#FFF',
    fontSize: 14,
    flex: 1,
  },
  deadline: {
    color: '#CCC',
    fontSize: 12,
    marginBottom: 8,
  },
  timeNote: {
    color: '#CCC',
    fontSize: 12,
    marginBottom: 16,
  },
  fixture: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fixtureTime: {
    color: '#FFF',
    fontSize: 14,
    width: 50,
  },
  matchup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  teamLogo: {
    width: 30,
    height: 30,
    marginHorizontal: 8,
  },
  vs: {
    color: '#CCC',
    marginHorizontal: 8,
  },
  sponsors: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#2a1b3d',
  },
  sponsorLogo: {
    width: 80,
    height: 40,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1a0d2e',
    paddingVertical: 12,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
  },
  bottomNavText: {
    color: '#FFF',
    fontSize: 12,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  footerText: {
    color: '#CCC',
    fontSize: 12,
    textAlign: 'center',
  },
  footerLink: {
    color: '#00FF00',
    fontSize: 10,
    marginTop: 4,
  },
});

export default SquadSelectionScreen;