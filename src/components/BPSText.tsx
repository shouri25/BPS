import React from 'react';
import {Text, StyleSheet, StyleProp, TextStyle} from 'react-native';
import {Colors} from '../theme/Colors';
import {moderateScale} from 'react-native-size-matters';
export const fonts = {
  100: 'BasierSquare-Regular',
  200: 'BasierSquare-Regular',
  300: 'BasierSquare-Regular',
  400: 'BasierSquare-Regular',
  normal: 'BasierSquare-Regular',
  500: 'BasierCircle-Medium',
  600: 'BasierSquare-SemiBold',
  700: 'BasierSquare-SemiBold',
  800: 'BasierCircle-Bold',
  900: 'BasierCircle-Bold',
  bold: 'BasierCircle-Bold',
};

type FontWeight = "400" | "normal" | "bold" | "100" | "200" | "300" | "500" | "600" | "700" | "800" | "900" 

interface BPSTextProps {
  text?: string;
  children?: JSX.Element;
  color?: string;
  textStyle?: StyleProp<TextStyle> | any;
  fontWeight?: FontWeight;
  fontSize?: number;
  onPress?: () => void;
  center?: boolean;
  lineHeight?: number;
  numberOfLines?: number;
  shimmering?: boolean;
}

const BPSText = ({
  text = '',
  color = Colors.black,
  textStyle,
  fontWeight = '400',
  fontSize = 14,
  children,
  onPress,
  center,
  lineHeight = 18,
  numberOfLines,
  shimmering,
}: BPSTextProps) => {
  return (
    <Text
      style={[
        {
          color,
          fontWeight,
          fontFamily: fonts[fontWeight],
          textAlign: center ? 'center' : 'auto',
          
          // lineHeight:lineHeight,
          fontSize: textStyle?.fontSize
            ? moderateScale(textStyle?.fontSize)
            : moderateScale(fontSize),
        },
        textStyle,
      ]}
      // adjustsFontSizeToFit
      onPress={onPress}
      numberOfLines={numberOfLines}>
      {shimmering ? '-' : text}
      {children}
    </Text>
  );
};
export default BPSText;