import { FormInput } from './FormInput';

interface NameInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  loading?: boolean;
}

export const NameInput = ({
  value,
  onChangeText,
  error,
  loading,
}: NameInputProps) => {
  return (
    <FormInput
      label="Name"
      placeholder="Enter your name"
      value={value}
      onChangeText={onChangeText}
      autoCapitalize="words"
      error={error}
      loading={loading}
    />
  );
};
