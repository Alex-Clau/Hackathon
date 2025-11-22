import { FormInput } from './FormInput';

interface EmailInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  loading?: boolean;
}

export const EmailInput = ({
  value,
  onChangeText,
  error,
  loading,
}: EmailInputProps) => {
  return (
    <FormInput
      label="Email"
      placeholder="Enter your email"
      value={value}
      onChangeText={onChangeText}
      keyboardType="email-address"
      autoCapitalize="none"
      autoComplete="email"
      error={error}
      loading={loading}
    />
  );
};
