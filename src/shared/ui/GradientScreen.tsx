import React from 'react';
import { View, type ViewProps } from 'react-native';
import { TwGradient } from './TwGradient';

export function GradientScreen({ children, ...props }: ViewProps) {
  return (
    <TwGradient
      colors={['#0B0014', '#1A0030', '#2B003F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      {/* glow */}
      <View className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-fuchsia-400/30" />
      <View className="absolute -bottom-28 -left-28 w-80 h-80 rounded-full bg-violet-500/25" />

      <View className="flex-1" {...props}>
        {children}
      </View>
    </TwGradient>
  );
}
