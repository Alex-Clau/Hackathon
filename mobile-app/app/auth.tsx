import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { AuthHeader } from '../components/auth/AuthHeader';
import { NameInput } from '../components/auth/NameInput';
import { EmailInput } from '../components/auth/EmailInput';
import { PasswordInput } from '../components/auth/PasswordInput';
import { SubmitButton } from '../components/auth/SubmitButton';
import { AuthToggle } from '../components/auth/AuthToggle';

export default function AuthScreen() {
  const {
    mode,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    errors,
    handleSubmit,
    toggleMode,
  } = useAuth();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      style={{ backgroundColor: '#DAD7CD' }}
    >
      <ScrollView
        className="flex-grow px-6 py-12"
        contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full max-w-md mx-auto">
          <AuthHeader mode={mode}/>

          {mode === 'signup' && (
            <NameInput
              value={name}
              onChangeText={setName}
              error={errors.name}
              loading={loading}
            />
          )}

          <EmailInput
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            loading={loading}
          />

          <PasswordInput
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            loading={loading}
            mode={mode}
          />

          <SubmitButton mode={mode} loading={loading} onPress={handleSubmit}/>

          <AuthToggle mode={mode} loading={loading} onToggle={toggleMode}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
