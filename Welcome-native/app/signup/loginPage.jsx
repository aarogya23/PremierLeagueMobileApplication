import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const openModal = (title, message, success = false) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsSuccess(success);
    setShowModal(true);
  };

 const closeModal = () => {
  setShowModal(false);
  if (isSuccess) {
     router.replace('/(tabs)'); // ✅ navigate to tab index
  }
};

  const handleLogin = async () => {
    if (!name || !password) {
      openModal('Missing Fields', 'Please enter both username and password.');
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
        await AsyncStorage.setItem('isLoggedIn', 'true'); // ✅ save login status
        openModal('Login Successful', `Hi ${name}, you are logged in!`, true);
        setName('');
        setPassword('');
      }
      else {
              openModal('Login Failed', data);
            }
    } catch (error) {
      openModal('Connection Error', `Cannot reach backend. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StatusBar barStyle="light-content" backgroundColor="#37003c" />

        {/* Logo Header */}
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/ppp.jpg')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Login Form */}
        <View style={styles.content}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>myPremierLeague</Text>

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Username"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.emailButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.emailButtonText}>
              {loading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal for success/error */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View
              style={[
                styles.successIconContainer,
                { backgroundColor: isSuccess ? '#00ff87' : '#ff4d4d' },
              ]}
            >
              <Text style={styles.successIcon}>{isSuccess ? 'True' : 'Wrong'}</Text>
            </View>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>s
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>
                {isSuccess ? 'Continue' : 'Try Again'}
              </Text>
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
    backgroundColor: '#37003c',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
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
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    marginBottom: 30,
  },
  modalButton: {
    backgroundColor: '#37003c',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default LoginScreen;
