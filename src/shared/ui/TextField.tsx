import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

type Props = TextInputProps & {
  className?: string;
};

export function TextField({ className, ...props }: Props) {
  return (
    <TextInput
      {...props}
      className={`border border-gray-200 rounded-xl px-4 py-3 ${className ?? ''}`}
      placeholderTextColor="#9CA3AF"
    />
  );
}
