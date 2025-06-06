import React, { useState } from 'react'; // Import Math from react-native-reanimated
import axios from 'axios';
import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
SafeAreaView,
KeyboardAvoidingView,
Platform,
ScrollView,
Alert,
} from 'react-native';

const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async () => {
        // Implement signup logic here
        console.log('Signup with:', { name, email, password });
        try {
            const response = await axios.post('https://mobile-fake-api.vercel.app/user',
                {
                id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                email: email,
                username: name,
                password: password
                }
            );
            console.log('Signup successful:', response.data);
            Alert.alert('Success', 'Account created successfully!');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Signup error:', error.response?.data || error.message || error);
            Alert.alert('Error', 'Signup failed. Please try again.');
        }
    };

return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoid}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to get started</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter your username"
                            autoCapitalize="words"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter your password"
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            style={styles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="Confirm your password"
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignup}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.footerLink}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
},
keyboardAvoid: {
    flex: 1,
},
scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
},
header: {
    marginBottom: 30,
},
title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
},
subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
},
form: {
    marginBottom: 20,
},
inputContainer: {
    marginBottom: 15,
},
label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
},
input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
},
button: {
    backgroundColor: '#007bff',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
},
buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
},
footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
},
footerText: {
    color: '#666',
    fontSize: 14,
},
footerLink: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: 'bold',
},
});

export default SignupScreen