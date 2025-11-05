import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';

const LoginScreen = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!name || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8083/api/loginbro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.text();

      if (response.ok) {
        Alert.alert('Success', data);
        // Clear inputs after success
        setName('');
        setPassword('');
      } else {
        Alert.alert('Login Failed', data);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Connection Error',
        `Cannot reach backend. Error: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" backgroundColor="#37003c" />

      {/* Header with Logo */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/ppp.jpg')} // same as signup
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>myPremierLeague</Text>

        {/* Username Input */}
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Username"
          placeholderTextColor="#999"
          autoCapitalize="none"
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

        {/* Login Button */}
        <TouchableOpacity
          style={styles.emailButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.emailButtonText}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <TouchableOpacity style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text style={styles.signInLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#37003c', // same purple as signup
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
});

export default LoginScreen;
