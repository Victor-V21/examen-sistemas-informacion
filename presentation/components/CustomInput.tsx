import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export const CustomInput = ({ label, error, style, ...props }: Props) => {
  return (
    <View className="mb-4">
      <Text className="text-base font-semibold text-gray-800 mb-2">
        {label}
      </Text>

      <TextInput
        className="bg-white border rounded-lg p-3 text-baseborder-gray-300 focus:border-blue-500"
        placeholderTextColor="#9ca3af"
        {...props}
      />
    </View>
  );
};
