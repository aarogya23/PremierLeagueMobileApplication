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


const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 21;

const PremierLeagueOverview = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

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
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={async () => {
                await AsyncStorage.removeItem('isLoggedIn');
                setIsLoggedIn(false);
              }}
            >
              <Text style={styles.signInText}>Logout</Text>
            </TouchableOpacity>
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
});
