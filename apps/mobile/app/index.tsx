import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { authClient } from '../lib/auth-client';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await authClient.signIn.email({ email, password });
        alert('Logged in!');
      } else {
        await authClient.signUp.email({ email, password, name });
        alert('Registered!');
      }
    } catch (e: any) {
      alert(e.message || 'Error');
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white p-4">
      <View className="w-full max-w-sm gap-4">
        <Text className="text-2xl font-bold text-center mb-8">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </Text>
        
        {!isLogin && (
          <TextInput
            className="border border-gray-300 rounded p-3"
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        )}
        
        <TextInput
          className="border border-gray-300 rounded p-3"
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        
        <TextInput
          className="border border-gray-300 rounded p-3"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <TouchableOpacity 
          className="bg-black rounded p-4 items-center mt-4"
          onPress={handleAuth}
        >
          <Text className="text-white font-bold">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)} className="mt-4">
          <Text className="text-center text-blue-500">
            {isLogin ? "Don't have an account? Sign Up" : "Have an account? Sign In"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
