import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Colors} from '../theme/Colors';
import BPSText from './BPSText';

interface ButtonProps {
  text: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const BPSButton = ({text, onPress, containerStyle}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      <BPSText text={text} color={Colors.white} />
    </TouchableOpacity>
  );
};
export default BPSButton;
const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    minWidth: 200,
  },
});
