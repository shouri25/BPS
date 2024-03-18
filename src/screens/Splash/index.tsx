import React, {useEffect} from 'react';
import {SQL} from '../../storage/sql';
import SplashLayout from './splash.screen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../navigation/navigators';

interface SplashProps {
  navigation: NativeStackNavigationProp<StackParamList, 'SPLASH'>;
}

const SplashScreen = ({navigation}: SplashProps) => {
  useEffect(() => {
    SQL.createDB();
    setTimeout(() => {
      navigation.replace('HOME');
    }, 1000);
  }, []);

  return <SplashLayout />;
};
export default SplashScreen;
