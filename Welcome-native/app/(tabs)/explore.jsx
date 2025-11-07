import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SquadSelectionScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#38003c', '#2d0034']} style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Premier League</Text>
          <Text style={styles.headerSubtitle}>Fantasy Football</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>PL</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNav]}>
          <Text style={[styles.navText, styles.activeNavText]}>Squad selection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Squad Selection Section */}
      <LinearGradient colors={['#38003c', '#2d0034']} style={styles.section}>
        <Text style={styles.sectionTitle}>Squad Selection</Text>
        <Text style={styles.sectionSubtitle}>
          Select or auto pick if you're short of time.
        </Text>
        <Text style={styles.gameweek}>Gameweek 11 • Deadline Sat Nov 8, 16:45</Text>
        
        <View style={styles.teamInfo}>
          <Text style={styles.teamLabel}>Team Name</Text>
          <Text style={styles.teamName}>Aarogya Thapa</Text>
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.stat}>0/15</Text>
              <Text style={styles.statLabel}>Selected</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.stat}>£100.0m</Text>
              <Text style={styles.statLabel}>Bank</Text>
            </View>
          </View>
        </View>

        {/* Pitch View */}
        <View style={styles.pitchContainer}>
          <LinearGradient 
            colors={['#00995d', '#008549']} 
            style={styles.pitch}
          >
            {/* Goalkeeper */}
            <View style={styles.positionRow}>
              <View style={styles.positionSlot}>
                <View style={styles.playerCircle} />
                <Text style={styles.positionLabel}>GK</Text>
              </View>
            </View>

            {/* Defenders */}
            <View style={styles.positionRow}>
              <View style={styles.positionSlot}>
                <View style={styles.playerCircle} />
                <Text style={styles.positionLabel}>DEF</Text>
              </View>
              <View style={styles.positionSlot}>
                <View style={styles.playerCircle} />
              </View>
              <View style={styles.positionSlot}>
                <View style={styles.playerCircle} />
              </View>
              <View style={styles.positionSlot}>
                <View style={styles.playerCircle} />
              </View>
            </View>

            {/* Midfielders */}
            <View style={styles.positionRow}>
              <View style={styles.positionSlot}>
                <View style={styles.playerCircle} />
                <Text style={styles.positionLabel}>MID</Text>
              </View>
              <View style={styles.positionSlot}>
                <View style={styles.playerCircle} />
              </View>
              <View style={styles.positionSlot}>
                <View style={styles.playerCircle} />
              </View>
              <View style={styles.positionSlot}>
                <View style={styles.playerCircle} />
              </View>
            </View>

            {/* Forwards */}
            <View style={styles.positionRow}>
              <View style={styles.positionSlot}>
                <View style={styles.playerCircle} />
                <Text style={styles.positionLabel}>FWD</Text>
              </View>
              <View style={styles.positionSlot}>
                <View style={styles.playerCircle} />
              </View>
              <View style={styles.positionSlot}>
                <View style={styles.playerCircle} />
              </View>
            </View>
          </LinearGradient>
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
            <Text style={styles.toggleTextActive}>Pitch View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton}>
            <Text style={styles.toggleText}>List View</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Latest News */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest News</Text>
        <View style={styles.newsItem}>
          <View style={[styles.newsIcon, {backgroundColor: '#DA291C'}]}>
            <Text style={styles.newsIconText}>MU</Text>
          </View>
          <Text style={styles.newsText}>Amorim gives update on Man Utd squad ahead of</Text>
        </View>
        <View style={styles.newsItem}>
          <View style={[styles.newsIcon, {backgroundColor: '#003399'}]}>
            <Text style={styles.newsIconText}>EV</Text>
          </View>
          <Text style={styles.newsText}>Silva encor</Text>
        </View>
      </View>

      {/* Fixtures */}
      <LinearGradient colors={['#38003c', '#2d0034']} style={styles.section}>
        <Text style={styles.sectionTitle}>Fixtures Gameweek 11</Text>
        <Text style={styles.gameweek}>Sat Nov 8 - Sun Nov 9</Text>
        <Text style={styles.deadline}>Deadlines Sat Nov 8, 16:45</Text>
        <Text style={styles.timeNote}>All times are shown in your local time</Text>
        
        <View style={styles.fixture}>
          <Text style={styles.fixtureTime}>18:15</Text>
          <View style={styles.matchup}>
            <View style={styles.teamContainer}>
              <View style={[styles.teamLogo, {backgroundColor: '#FFF'}]}>
                <Text style={[styles.teamLogoText, {color: '#000'}]}>TOT</Text>
              </View>
              <Text style={styles.teamText}>Spurs</Text>
            </View>
            <Text style={styles.vs}>vs</Text>
            <View style={styles.teamContainer}>
              <View style={[styles.teamLogo, {backgroundColor: '#DA291C'}]}>
                <Text style={styles.teamLogoText}>MU</Text>
              </View>
              <Text style={styles.teamText}>Man Utd</Text>
            </View>
          </View>
        </View>

        <View style={styles.fixture}>
          <Text style={styles.fixtureTime}>20:45</Text>
          <View style={styles.matchup}>
            <View style={styles.teamContainer}>
              <View style={[styles.teamLogo, {backgroundColor: '#003399'}]}>
                <Text style={styles.teamLogoText}>EV</Text>
              </View>
              <Text style={styles.teamText}>Everton</Text>
            </View>
            <Text style={styles.vs}>vs</Text>
            <View style={styles.teamContainer}>
              <View style={[styles.teamLogo, {backgroundColor: '#FFF'}]}>
                <Text style={[styles.teamLogoText, {color: '#000'}]}>FUL</Text>
              </View>
              <Text style={styles.teamText}>Fulham</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Sponsors */}
      <View style={styles.sponsors}>
        <View style={styles.sponsorLogo}>
          <Text style={styles.sponsorText}>EA SPORTS</Text>
        </View>
        <View style={styles.sponsorLogo}>
          <Text style={styles.sponsorText}>Barclays</Text>
        </View>
        <View style={styles.sponsorLogo}>
          <Text style={styles.sponsorText}>Nike</Text>
        </View>
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
          <Text style={styles.bottomNavText}>News</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem}>
          <Text style={styles.bottomNavText}>Video</Text>
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
        <TouchableOpacity>
          <Text style={styles.footerLink}>Modern Slavery Statement</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Contact Us</Text>
        </TouchableOpacity>
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
    paddingTop: 50,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: '#E0E0E0',
    fontSize: 13,
    marginTop: 2,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  logoPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#00ff85',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#38003c',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#38003c',
    borderBottomWidth: 1,
    borderBottomColor: '#4a0048',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
  },
  activeNav: {
    borderBottomWidth: 3,
    borderBottomColor: '#00ff85',
  },
  navText: {
    color: '#CCC',
    fontSize: 14,
    fontWeight: '500',
  },
  activeNavText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    backgroundColor: '#1a0028',
    marginBottom: 2,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: '#CCC',
    fontSize: 15,
    marginBottom: 8,
  },
  gameweek: {
    color: '#00ff85',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  teamInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  teamLabel: {
    color: '#AAA',
    fontSize: 13,
    marginBottom: 4,
  },
  teamName: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 60,
  },
  statItem: {
    alignItems: 'center',
  },
  stat: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#AAA',
    fontSize: 12,
    marginTop: 4,
  },
  pitchContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pitch: {
    width: '100%',
    height: 380,
    borderRadius: 12,
    justifyContent: 'space-evenly',
    padding: 20,
    borderWidth: 2,
    borderColor: '#00995d',
  },
  positionRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  positionSlot: {
    alignItems: 'center',
  },
  playerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderColor: '#38003c',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  positionLabel: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 4,
    backgroundColor: '#38003c',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  pitchButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#4a0048',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: '#00ff85',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonTextPrimary: {
    color: '#38003c',
    fontWeight: 'bold',
    fontSize: 14,
  },
  viewToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  toggleButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#666',
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: '#00ff85',
    borderColor: '#00ff85',
  },
  toggleText: {
    color: '#CCC',
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#38003c',
    fontWeight: 'bold',
  },
  newsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#2a0038',
    borderRadius: 8,
  },
  newsIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsIconText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  newsText: {
    color: '#FFF',
    fontSize: 14,
    flex: 1,
  },
  deadline: {
    color: '#AAA',
    fontSize: 13,
    marginBottom: 4,
  },
  timeNote: {
    color: '#888',
    fontSize: 11,
    marginBottom: 20,
  },
  fixture: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#2a0038',
    padding: 12,
    borderRadius: 8,
  },
  fixtureTime: {
    color: '#00ff85',
    fontSize: 14,
    fontWeight: 'bold',
    width: 50,
  },
  matchup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teamLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamLogoText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  teamText: {
    color: '#FFF',
    fontSize: 13,
  },
  vs: {
    color: '#888',
    fontSize: 12,
  },
  sponsors: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#1a0028',
    gap: 12,
  },
  sponsorLogo: {
    flex: 1,
    height: 50,
    backgroundColor: '#2a0038',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sponsorText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#38003c',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#4a0048',
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  bottomNavText: {
    color: '#CCC',
    fontSize: 11,
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  footerText: {
    color: '#888',
    fontSize: 12,
    marginBottom: 12,
  },
  footerLink: {
    color: '#00ff85',
    fontSize: 11,
    marginTop: 6,
  },
});

export default SquadSelectionScreen;