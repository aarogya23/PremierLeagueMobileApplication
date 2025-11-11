import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Link } from 'expo-router';


const SignupScreen = () => {
  // State for form fields
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [preferredTeam, setPreferredTeam] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [welcomeName, setWelcomeName] = useState('');

  const handleSignup = async () => {
    console.log('Signup button clicked!');
    console.log('Form data:', { email, name, password, preferredTeam });

    // Basic validation
    if (!email || !name || !password || !confirmPassword || !preferredTeam) {
      Alert.alert('Error', 'Please fill all fields');
      console.log('Validation failed: Missing fields');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      console.log('Validation failed: Invalid email');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      console.log('Validation failed: Passwords dont match');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      console.log('Validation failed: Password too short');
      return;
    }

    const userData = {
      name: name,
      email,
      password,
      preferredTeam,
    };

    console.log('Sending data to backend:', userData);

    try {
      const response = await fetch('http://localhost:8083/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        // Show success modal instead of Alert
        setWelcomeName(responseData.name || name);
        setShowSuccessModal(true);
        
        // Clear form after success
        setEmail('');
        setName('');
        setPassword('');
        setConfirmPassword('');
        setPreferredTeam('');
      } else {
        Alert.alert('Error', `Signup failed: ${responseData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      Alert.alert(
        'Connection Error', 
        `Cannot reach backend. Error: ${error.message}\n\nMake sure:\n1. Backend is running on port 8080\n2. Using correct URL for your device`
      );
    }
  };

  const handleSocialLogin = (provider) => {
    Alert.alert('Social Login', `Logging in with ${provider}... (Coming soon)`);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    // Navigate to login or home screen here if needed
  };

  return (
    <>
      <ScrollView 
        contentContainerStyle={styles.container} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StatusBar barStyle="light-content" backgroundColor="#37003c" />
        
        {/* Premier League Header with Logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/ppp.jpg')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Join</Text>
          <Text style={styles.subtitle}>myPremierLeague</Text>

          {/* Email Input */}
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email Address"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Name Input */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="#999"
            autoCapitalize="words"
          />

          {/* Password Input */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
          />

          {/* Confirm Password Input */}
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry
          />

          {/* Preferred Team Input */}
          <Text style={styles.label}>Preferred Team</Text>
          <TextInput
            style={styles.input}
            value={preferredTeam}
            onChangeText={setPreferredTeam}
            placeholder="Preferred Team"
            placeholderTextColor="#999"
          />

          {/* Join with Email Button */}
          <TouchableOpacity style={styles.emailButton} onPress={handleSignup}>
            <Text style={styles.emailButtonText}>Join with email</Text>
          </TouchableOpacity>

          {/* Or Separator */}
          <Text style={styles.orText}>Or</Text>

          {/* Social Buttons */}
          <TouchableOpacity 
            style={styles.socialButton} 
            onPress={() => handleSocialLogin('Google')}
          >
            <Text style={styles.socialIcon}>🔵</Text>
            <Text style={styles.socialText}>Join with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.socialButton} 
            onPress={() => handleSocialLogin('Facebook')}
          >
            <Text style={styles.socialIcon}>📘</Text>
            <Text style={styles.socialText}>Join with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.socialButton} 
            onPress={() => handleSocialLogin('Apple')}
          >
            <Text style={styles.socialIcon}>🍎</Text>
            <Text style={styles.socialText}>Join with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.socialButton} 
            onPress={() => handleSocialLogin('X')}
          >
            <Text style={styles.socialIcon}>✖️</Text>
            <Text style={styles.socialText}>Join with X</Text>
          </TouchableOpacity>

          {/* Footer */}
          <Link href={"/signup/loginPage"} asChild>
          <TouchableOpacity style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account? <Text style={styles.signInLink}>Sign in</Text>
            </Text>
          </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
        onRequestClose={closeSuccessModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Success Icon */}
            <View style={styles.successIconContainer}>
              <Text style={styles.successIcon}>✓</Text>
            </View>
            
            {/* Success Message */}
            <Text style={styles.modalTitle}>Welcome!</Text>
            <Text style={styles.modalMessage}>
              Hi {welcomeName}! Your account has been created successfully.
            </Text>
            <Text style={styles.modalSubMessage}>
              You're now part of the myPremierLeague community! 🎉
            </Text>
            
            {/* Close Button */}
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={closeSuccessModal}
            >
              <Text style={styles.modalButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#37003c', // Official Premier League purple
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'flex-start',
  },
  logoImage: {
    width: 180,
    height: 60,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 0,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    letterSpacing: -1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
    marginTop: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 30,
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  emailButton: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  emailButtonText: {
    color: '#37003c',
    fontSize: 16,
    fontWeight: '700',
  },
  orText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 30,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  socialIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  socialText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  signInLink: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00ff87',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successIcon: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#37003c',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 24,
  },
  modalSubMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  modalButton: {
    backgroundColor: '#37003c',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default SignupScreen;