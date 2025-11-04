import React from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router'; // 👈 For params and back navigation
import { Ionicons } from '@expo/vector-icons';

// Hardcoded news data (mirroring your overview; in a real app, fetch from API or state)
const newsData = [
  {
    id: 'arsenal-title-race',
    title: 'Arsenal march on in title race as major rivals falter',
    fullDesc: "We assess the impact of Arsenal and Bournemouth's wins and Man City's loss at Aston Villa. Arsenal's victory keeps them firmly in the title conversation, while the slip-ups from key competitors open the door wider. Detailed analysis of key moments, player performances, and what this means for the season ahead.",
    img: require('@/assets/images/haa.webp'),
    tag: 'Features',
    date: 'October 28, 2025', // Example; add real dates as needed
  },
  {
    id: 'liverpool-low',
    title: 'Liverpool hit low as familiar woes bring fourth defeat in a row',
    fullDesc: 'Arne Slot says 3-2 loss at Brentford was the worst of this season. The Reds struggled with defensive lapses and missed opportunities upfront. Slot reflects on tactical adjustments needed, injury updates, and the path to recovery in a challenging campaign.',
    img: require('@/assets/images/slot.webp'),
    tag: 'Features',
    date: 'October 28, 2025', // Example
  },
];

const NewsDetail = () => {
  const { id } = useLocalSearchParams(); // 👈 Get the dynamic ID from URL

  // Find the matching news item
  const article = newsData.find((n) => n.id === id);

  if (!article) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a001a" />
        <Text style={styles.errorText}>Article not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a001a" />
      <ScrollView style={styles.scrollView}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => { /* Expo Router handles back natively, but this is optional for custom */ }}>
          <Link href="/" asChild>
            <View style={styles.backIconContainer}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </View>
          </Link>
        </TouchableOpacity>

        {/* Hero Image */}
        <Image source={article.img} style={styles.heroImg} />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{article.title}</Text>
          <View style={styles.meta}>
            <Text style={styles.tag}>{article.tag}</Text>
            <Text style={styles.date}>{article.date}</Text>
          </View>
          <Text style={styles.fullDesc}>{article.fullDesc}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a001a' },
  scrollView: { flex: 1 },
  backButton: { 
    position: 'absolute', 
    top: 10, 
    left: 15, 
    zIndex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    borderRadius: 20, 
    padding: 8 
  },
  backIconContainer: { flexDirection: 'row', alignItems: 'center' },
  heroImg: { 
    width: '100%', 
    height: 300, 
    resizeMode: 'cover' 
  },
  content: { 
    padding: 20 
  },
  title: { 
    color: 'white', 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  meta: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 15 
  },
  tag: { 
    color: '#f2bfff', 
    fontSize: 14, 
    fontWeight: '600' 
  },
  date: { 
    color: '#ccc', 
    fontSize: 14 
  },
  fullDesc: { 
    color: '#ccc', 
    fontSize: 16, 
    lineHeight: 24 
  },
  errorText: { 
    color: 'white', 
    textAlign: 'center', 
    marginTop: 50, 
    fontSize: 18 
  },
});