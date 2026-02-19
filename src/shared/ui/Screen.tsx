import React from 'react';
import { View } from 'react-native';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Screen({ children, className }: Props) {
  return (
    <View className={`flex-1 bg-white ${className ?? ''}`}>{children}</View>
  );
}
