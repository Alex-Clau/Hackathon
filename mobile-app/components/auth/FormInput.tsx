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
    <View className="mb-5">
      <Text 
        className="text-sm font-semibold mb-2"
        style={{ color: '#1A4D2E' }}
      >
        {label}
      </Text>
      <TextInput
        className="border rounded-xl px-4 py-4 text-base"
        style={{
          borderColor: error ? '#DC2626' : '#4F6F52',
          backgroundColor: error ? '#FEF2F2' : '#FFFFFF',
          color: '#1A4D2E',
        }}
        placeholderTextColor="#4F6F52"
        editable={!loading}
        {...textInputProps}
      />
      {error && (
        <Text className="text-sm mt-2" style={{ color: '#DC2626' }}>
          {error}
        </Text>
      )}
    </View> 
  );
};
