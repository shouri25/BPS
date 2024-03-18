import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {StackParamList} from '../../navigation/navigators';
import HomeLayout, {HomeDataType} from './home.layout';

interface HomeProps {
  navigation: NativeStackNavigationProp<StackParamList, 'HOME'>;
}

const HomeScreen = ({navigation}: HomeProps) => {
  const onPressItem = useCallback((item: HomeDataType) => {
    if (item.screen === 'Billing') navigation.push('Billing');
    if (item.screen === 'Menu') navigation.push('Menu');
    if (item.screen === 'Reports') navigation.push('Reports');
  }, []);

  return <HomeLayout onPressItem={onPressItem} />;
};
export default HomeScreen;
