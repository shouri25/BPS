import React from 'react';
import {MenuType} from '../../types/menu';
import Icons from '../../../assets/icons';

import BPSText from '../../components/BPSText';
import {View, TouchableOpacity, Image} from 'react-native';
import { Colors } from '../../theme/Colors';
interface MenuItemProps {
  onPressDelete: (values: MenuType) => void;
  onPressEdit: (values: MenuType) => void;
  item: MenuType;
}

const MenuItem = ({item, onPressDelete, onPressEdit}: MenuItemProps) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: 'center',
      }}>
      <BPSText text={item.item_name} textStyle={{flex: 1}}></BPSText>
      <BPSText text={`Rs. ${item.price}`} textStyle={{width: 100}}></BPSText>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            padding: 4,
            marginHorizontal: 4,
          }}
          onPress={() => onPressEdit(item)}>
          <Image
            source={Icons.edit}
            style={{
              width: 20,
              height: 20,
              tintColor: Colors.background,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 4,
            marginHorizontal: 4,
          }}
          onPress={() => onPressDelete(item)}>
          <Image
            source={Icons.delete}
            style={{
              width: 20,
              height: 20,
              tintColor: Colors.textRed,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default MenuItem;
