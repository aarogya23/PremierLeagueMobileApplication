import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

const Copilot = () => {
 const [messages, setMessages] = useState([{
  from: 'ai', text: "Hi there! I'm you copilot assistant. How can I help you today?" 
 }],
)

 const [inputText, setInputText] = useState('');

 const sendMessage = async() =>{
  
   if(!inputText.trim())
    return;

   //Add user message
   setMessages([...prev, {from: 'user', text: inputText}]);

   const userInput = inputText;

   setInputText('');

        try{
          const userInput = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer  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",
          
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "minimax/minimax-m2:free",
          "messages": [
            {
              "role": "user",
              "content": "userInput"
            },
          ],
        }),
      });
      
      const data = await Response.json();
      console.log(data);

      const aiReply = data.choices[0]?.message?.content || 'No reply.';

      //Add Ai Reply 



   // Add AI reply
      setMessages(prev => [...prev, { from: 'ai', text: aiReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { from: 'ai', text: 'Error: ' + error.message }]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1a001a' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Link href="/" asChild>
            <TouchableOpacity>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </Link>
          <Text style={styles.headerText}>Copilot Assistant</Text>
        </View>

        {/* Chat Area */}
        <ScrollView style={styles.chatContainer} showsVerticalScrollIndicator={false}>
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.message,
                msg.from === 'user' ? styles.userMsg : styles.aiMsg,
              ]}
            >
              <Text style={styles.msgText}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask something..."
            placeholderTextColor="#aaa"
            style={styles.input}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Copilot;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a0030',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
  chatContainer: {
    flex: 1,
    padding: 15,
  },
  message: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  aiMsg: {
    backgroundColor: '#3a0040',
    alignSelf: 'flex-start',
  },
  userMsg: {
    backgroundColor: '#5c1d6a',
    alignSelf: 'flex-end',
  },
  msgText: {
    color: 'white',
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a0030',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: 'white',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#3a0040',
    borderRadius: 20,
    marginRight: 10,
  },
  sendBtn: {
    backgroundColor: '#5c1d6a',
    padding: 10,
    borderRadius: 20,
  },
});