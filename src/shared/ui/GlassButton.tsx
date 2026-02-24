import React from 'react';
import { Pressable, Text } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
};

export function GlassButton({ title, onPress, disabled, className }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`px-4 py-3 rounded-2xl border border-white/15 bg-white/5 items-center ${disabled ? 'opacity-70' : ''} ${className ?? ''}`}
    >
      <Text className="text-white font-extrabold">{title}</Text>
    </Pressable>
  );
}
