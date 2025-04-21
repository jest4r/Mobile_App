import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Alert,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native'
import React, { useState } from 'react'
import TwiterIcon from '../../images/twitter.webp'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isFocused, setIsFocused] = useState({
    username: false,
    password: false,
  });

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }
    
    // Here you would typically call your authentication API
    console.log('Logging in with:', username, password);
    try {
      const response = await axios.post('https://mobile-fake-api.vercel.app/user',
        {
          id: 3,
          username: username,
          password: password
        }
      );
      
      console.log('Login successful:', response.data);
      // Store user data or token if needed
      if (!response.data) {
        throw new Error('No data received from server');
      }
    // ...existing code...
    } catch (error) {
      console.log('Login error:', error?.response?.data || error?.message || error);
      Alert.alert('Error', 'Login failed.');
    }

    await AsyncStorage.setItem('token', 'onJAX9E4f8mRW1t22H1gkShNITDBPe53QEHPEdPkAQ0W3Ti9XEFS4PCqpYpQ9qQX')
    // Navigate to main app screen after successful login
    navigation.replace('Main');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.appTitle}>SmartRead</Text>
            <Text style={styles.welcomeText}>Welcome back!</Text>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Username/Email</Text>
            <TextInput
              onChangeText={setUsername}
              value={username}
              placeholder='Enter your username or email'
              style={[
                styles.input, 
                isFocused.username && styles.inputFocused
              ]}
              placeholderTextColor="#A0A0A0"
              onFocus={() => setIsFocused({...isFocused, username: true})}
              onBlur={() => setIsFocused({...isFocused, username: false})}
            />
            
            <Text style={[styles.formLabel, styles.spaceTop]}>Password</Text>
            <TextInput
              onChangeText={setPassword}
              value={password}
              placeholder='Enter your password'
              secureTextEntry={true}
              style={[
                styles.input, 
                isFocused.password && styles.inputFocused
              ]}
              placeholderTextColor="#A0A0A0"
              onFocus={() => setIsFocused({...isFocused, password: true})}
              onBlur={() => setIsFocused({...isFocused, password: false})}
            />

            <View style={styles.optionsRow}>
              <TouchableOpacity 
                style={styles.rememberMeContainer} 
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View style={[
                  styles.checkbox, 
                  rememberMe && styles.checkboxChecked
                ]}>
                  {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or sign in with</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                style={styles.socialIcon}
                source={TwiterIcon}
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.socialButton, {backgroundColor: '#4267B2'}]}>
              <Text style={styles.socialButtonText}>f</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.socialButton, {backgroundColor: '#DB4437'}]}>
              <Text style={styles.socialButtonText}>G</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.signupContainer}
            onPress={handleSignUp}
          >
            <Text style={styles.signupText}>
              New user? <Text style={styles.signupLink}>Create an account</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 36,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: '#505050',
  },
  formContainer: {
    backgroundColor: '#F7F8FA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#505050',
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#303030',
  },
  inputFocused: {
    borderColor: '#4A90E2',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  spaceTop: {
    marginTop: 18,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rememberMeText: {
    fontSize: 14,
    color: '#505050',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    paddingHorizontal: 16,
    color: '#909090',
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  socialButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  signupContainer: {
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    color: '#505050',
  },
  signupLink: {
    color: '#4A90E2',
    fontWeight: '600',
  },
});