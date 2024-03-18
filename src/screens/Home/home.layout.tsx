import React from 'react';
import {FlatList, View, Image, TouchableOpacity} from 'react-native';
import Icons from '../../../assets/icons';
import {Screens} from '../../navigation/Screens';
import {Colors} from '../../theme/Colors';
import BPSText from '../../components/BPSText';
import {Card, Title} from 'react-native-paper';

export interface HomeDataType {
  title: string;
  icon: any;
  screen: string;
}

const data: HomeDataType[] = [
  {
    title: 'Bill',
    icon: Icons.receipt,
    screen: Screens.BILLING,
  },
  {
    title: 'Menu',
    icon: Icons.menu,
    screen: Screens.MENU,
  },
  {
    title: 'Reports',
    icon: Icons.reports,
    screen: Screens.REPORTS,
  },
];

interface HomelayoutProps {
  onPressItem: (item: HomeDataType) => void;
}

const HomeLayout = ({onPressItem}: HomelayoutProps) => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.title + index}
        numColumns={2}
        contentContainerStyle={{
          margin: 8,
          flex: 1,
        }}
        renderItem={({item, index}) => {
          return (
            <Card
              style={{
                flex: 1,
                margin: 8,
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 32,
                }}
                onPress={() => onPressItem(item)}>
                <Image
                  source={item.icon}
                  style={{
                    width: 32,
                    height: 32,
                    tintColor: Colors.background,
                  }}
                  resizeMode="contain"
                />
                <Title>{item.title}</Title>
              </TouchableOpacity>
            </Card>
          );
        }}
      />
    </View>
  );
};
export default HomeLayout;
