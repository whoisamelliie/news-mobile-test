import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'react-native-css-interop';

cssInterop(LinearGradient, {
  className: {
    target: 'style',
  },
});

export { LinearGradient as TwGradient };
