import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Modal } from 'react-native';
const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 21;

const PremierLeagueOverview = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const [showLogoutModal, setShowLogoutModal] = useState(false);

useEffect(() => {
  const checkLoginStatus = async () => {
    const loggedIn = await AsyncStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedIn === 'true');
  };
  checkLoginStatus();
}, []);



useEffect(() => {
  const checkLoginStatus = async () => {
    const loggedIn = await AsyncStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedIn === 'true');
  };
  checkLoginStatus();
}, []);


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8083/api/test');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('❌ Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const matches = [
    { home: 'Leeds', homeLogo: require('@/assets/images/erlig.jpeg'), score: '2 - 1', away: 'West Ham', awayLogo: require('@/assets/images/erlig.jpeg'), status: 'FT' },
    { home: 'Chelsea', homeLogo: require('@/assets/images/erlig.jpeg'), score: '1 - 2', away: 'Sunderland', awayLogo: require('@/assets/images/erlig.jpeg'), status: 'FT' },
    { home: 'Newcastle', homeLogo: require('@/assets/images/erlig.jpeg'), score: '2 - 1', away: 'Fulham', awayLogo: require('@/assets/images/erlig.jpeg'), status: 'FT' },
    { home: 'Man Utd', homeLogo: require('@/assets/images/erlig.jpeg'), score: '4 - 2', away: 'Brighton', awayLogo: require('@/assets/images/erlig.jpeg'), status: 'FT' },
    { home: 'Brentford', homeLogo: require('@/assets/images/erlig.jpeg'), score: '3 - 2', away: 'Liverpool', awayLogo: require('@/assets/images/erlig.jpeg'), status: 'FT' },
  ];

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#1a001a', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: 'white', marginTop: 10 }}>Loading latest news...</Text>
      </SafeAreaView>
    );
  }

  const renderNews = [];
  for (let i = 0; i < news.length; i++) {
    const n = news[i];
    renderNews.push(
      <Link href={`/news/${n.newsId}`} asChild key={n.id}>
        <TouchableOpacity activeOpacity={0.8}>
          <View style={styles.newsCard}>
            <Image
              source={{ uri: n.img }}
              style={styles.newsImg}
              
            />
            <Text style={styles.newsTitle}>{n.title}</Text>
            <Text style={styles.newsDesc}>{n.fullDesc}</Text>
            <Text style={styles.newsTag}>{n.tag}</Text>
          </View>
        </TouchableOpacity>
      </Link>
    );
  }

  const renderMatches = [];
  for (let j = 0; j < matches.length; j++) {
    const m = matches[j];
    renderMatches.push(
      <View style={styles.matchCard} key={j}>
        <View style={styles.teamContainer}>
          <Image source={m.homeLogo} style={styles.teamLogo} />
          <Text style={styles.teamName}>{m.home}</Text>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.score}>{m.score}</Text>
          <Text style={styles.status}>{m.status}</Text>
        </View>

        <View style={styles.teamContainer}>
          <Image source={m.awayLogo} style={styles.teamLogo} />
          <Text style={styles.teamName}>{m.away}</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1a001a' }}>
      <StatusBar barStyle="light-content" backgroundColor="#1a001a" />
      <ScrollView>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Image source={require('@/assets/images/ppp.jpg')} style={styles.logo} />
          <Ionicons name="search" size={22} color="white" style={{ marginHorizontal: 10 }} />

          <Link href="/copilot" asChild>
            <TouchableOpacity>
              <Image source={require('@/assets/images/co.webp')} style={styles.copilotIcon} />
            </TouchableOpacity>
          </Link>
                   {isLoggedIn ? (
  <>
    {/* Profile Icon */}
    <TouchableOpacity onPress={() => setShowLogoutModal(true)}>
      <Image
        source={require('@/assets/images/haa.webp')} // 👈 replace with your profile icon
        style={styles.profileIcon}
      />
    </TouchableOpacity>

    {/* Logout Modal */}
    <Modal
      transparent
      animationType="fade"
      visible={showLogoutModal}
      onRequestClose={() => setShowLogoutModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>Are you sure you want to log out?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: '#38003c' }]}
              onPress={async () => {
                await AsyncStorage.removeItem('isLoggedIn');
                setIsLoggedIn(false);
                setShowLogoutModal(false);
              }}
            >
              <Text style={styles.modalBtnText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: '#999' }]}
              onPress={() => setShowLogoutModal(false)}
            >
              <Text style={styles.modalBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  </>
) : (
  <Link href={"/signup/SignupScreen"} asChild>
    <TouchableOpacity style={styles.signInBtn}>
      <Text style={styles.signInText}>Sign in</Text>
    </TouchableOpacity>
  </Link>
)}


         
        </View>

        <View style={styles.breakingNews}>
          <Text style={styles.breakingText}>Cunha: Everyone has full confidence in Amorim</Text>
        </View>

        <Text style={styles.header}>📰 Latest News</Text>
        {renderNews}

        <Text style={styles.header}>⚽ Latest Matches</Text>
        {renderMatches}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PremierLeagueOverview;

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#2a0030',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginTop: STATUS_BAR_HEIGHT,
  },
  logo: { width: 75, height: 75, resizeMode: 'contain', marginRight: 10 },
  copilotIcon: { width: 38, height: 38, resizeMode: 'contain', marginRight: 12 },
  signInBtn: {
    backgroundColor: '#38003c',
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    marginLeft: 'auto',
  },
  signInText: { color: 'white', fontWeight: '600' },
  breakingNews: {
    backgroundColor: '#38003c',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  breakingText: { color: 'white', fontSize: 14 },
  header: { fontSize: 20, fontWeight: 'bold', color: 'white', marginVertical: 10, marginLeft: 15 },
  newsCard: { backgroundColor: '#3a0040', borderRadius: 15, padding: 12, marginBottom: 15, marginHorizontal: 15 },
  newsImg: { width: '100%', height: 280, borderRadius: 12, marginBottom: 10 },
  newsTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  newsDesc: { color: '#ccc', fontSize: 14, marginBottom: 8 },
  newsTag: { color: '#f2bfff', fontSize: 13, fontWeight: '600' },
  matchCard: {
    backgroundColor: '#3a0040',
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamContainer: { alignItems: 'center' },
  teamLogo: { width: 40, height: 40, resizeMode: 'contain', marginBottom: 5 },
  teamName: { color: 'white', fontSize: 14, fontWeight: '600' },
  scoreContainer: { alignItems: 'center' },
  score: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  status: { color: '#ccc', fontSize: 12 },
   profileIcon: {
    width: 40,             // size of the profile image
    height: 40,
    borderRadius: 20,      // makes it round
    marginLeft: 'auto',    // push to the right in the top bar
    marginRight: 10,       // spacing from edge
    borderWidth: 2,        // optional border
    borderColor: '#fff',   // white border
    resizeMode: 'cover',   // ensures image scales nicely
    shadowColor: '#000',   // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,          // shadow for Android
  },

  // ===== Logout Modal =====
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // dark semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalBox: {
    backgroundColor: '#1a001a',          // dark modal background
    padding: 25,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // ===== Sign in Button =====
  signInBtn: {
    backgroundColor: '#38003c',
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    marginLeft: 'auto',
    alignItems: 'center',
  },
  signInText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },

});
