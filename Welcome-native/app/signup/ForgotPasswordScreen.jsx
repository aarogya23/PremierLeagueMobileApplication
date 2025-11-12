import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const openModal = (title, message, success = false) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsSuccess(success);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    if (isSuccess) {
      router.push('/reset-password'); // ✅ Go to reset password page
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      openModal('Missing Field', 'Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8083/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.text();

      if (response.ok) {
        openModal('OTP Sent', data, true);
        setEmail('');
      } else {
        openModal('Failed', data);
      }
    } catch (error) {
      openModal('Connection Error', `Cannot reach backend. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#37003c" />
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your registered email</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          placeholderTextColor="#999"
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={styles.emailButton}
          onPress={handleForgotPassword}
          disabled={loading}
        >
          <Text style={styles.emailButtonText}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal */}
      <Modal animationType="fade" transparent={true} visible={showModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View
              style={[
                styles.successIconContainer,
                { backgroundColor: isSuccess ? '#00ff87' : '#ff4d4d' },
              ]}
            >
              <Text style={styles.successIcon}>{isSuccess ? '✓' : '✕'}</Text>
            </View>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#ddd',
    fontSize: 16,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 30,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  emailButton: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
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

export default ForgotPasswordScreen;
