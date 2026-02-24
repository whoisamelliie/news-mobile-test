import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';
import { TwGradient } from './TwGradient';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

export function PinkButton({
  title,
  onPress,
  loading,
  disabled,
  className,
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <Pressable onPress={onPress} disabled={isDisabled} className={className}>
      <TwGradient
        colors={['#FF4FD8', '#8B5CFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className={`py-3.5 rounded-2xl items-center ${isDisabled ? 'opacity-70' : ''}`}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-extrabold text-base">{title}</Text>
        )}
      </TwGradient>
    </Pressable>
  );
}
