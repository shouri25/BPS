import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../theme/Colors';

const ItemSeparator = () => {
  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.textGray,
      }}
    />
  );
};
export default ItemSeparator;