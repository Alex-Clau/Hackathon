import { View, Text, TextInput, TextInputProps } from 'react-native';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  loading?: boolean;
}

export const FormInput = ({
  label,
  error,
  loading,
  ...textInputProps
}: FormInputProps) => {
  return (
    <View className="mb-4">
      <Text className="text-sm font-medium text-gray-700 mb-2">{label}</Text>
      <TextInput
        className={`border rounded-lg px-4 py-3 text-base ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
        }`}
        editable={!loading}
        {...textInputProps}
      />
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};
