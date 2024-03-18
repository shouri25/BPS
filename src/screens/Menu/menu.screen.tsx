import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import MenuModal from './AddItemModal';
import {FAB} from 'react-native-paper';
import Icons from '../../../assets/icons';
import {MenuType} from '../../types/menu';
import {Colors} from '../../theme/Colors';
import MenuItem from './MenuItem';
import ItemSeparator from '../../components/ItemSeparator';

interface MenuLayoutProps {
  onPressAdd: () => void;
  showAdd: boolean;
  currentItem?: MenuType;
  onSave: (values: MenuType) => void;
  onPressDelete: (values: MenuType) => void;
  onPressEdit: (values: MenuType) => void;
  onDismiss: () => void;
  menu: MenuType[];
}

const MenuLayout = ({
  onPressAdd,
  showAdd,
  currentItem,
  onSave,
  onDismiss,
  menu = [],
  onPressDelete,
  onPressEdit,
}: MenuLayoutProps) => {
  return (
    <View style={{flex: 1}}>
      <MenuModal
        show={showAdd}
        item={currentItem}
        onSave={onSave}
        onDismiss={onDismiss}
      />
      <FlatList
        data={menu}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom:100
        }}
        renderItem={({item}) => {
          return (
            <MenuItem
              item={item}
              onPressDelete={onPressDelete}
              onPressEdit={onPressEdit}
            />
          );
        }}
        ItemSeparatorComponent={ItemSeparator}
      />
      <FAB
        onPress={onPressAdd}
        icon={Icons.add}
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 30,
          right: 30,
        }}
      />
    </View>
  );
};
export default MenuLayout;
