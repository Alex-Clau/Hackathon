import { FormInput } from './FormInput';

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  loading?: boolean;
  mode: 'login' | 'signup';
}

export const PasswordInput = ({
  value,
  onChangeText,
  error,
  loading,
  mode,
}: PasswordInputProps) => {
  return (
    <FormInput
      label="Password"
      placeholder="Enter your password"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry
      autoCapitalize="none"
      autoComplete={mode === 'login' ? 'password' : 'password-new'}
      error={error}
      loading={loading}
    />
  );
};
