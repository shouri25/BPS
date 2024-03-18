import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {StackParamList} from '../../navigation/navigators';
import BillingLayout from './billing.screen';
import {SQL} from '../../storage/sql';
import {BillingData} from '../../types/billing';
import {MenuType} from '../../types/menu';

interface BillingProps {
  navigation: NativeStackNavigationProp<StackParamList, 'Billing'>;
}
const BillingScreen = ({navigation}: BillingProps) => {
  const [billing, setBilling] = useState<BillingData[]>([]);

  const getMenu = useCallback(async () => {
    try {
      const data = await SQL.getMenu();
      if (data) {
        const newData: BillingData[] = data.map(item => {
          return {
            ...item,
            quantity: 0,
          };
        });
        setBilling(newData);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    getMenu();
  }, []);

  const updateQuantity = useCallback(
    (id: number, quantity: number) => {
      const tempData = [...billing];
      tempData.map(item => {
        if (item.item_id === id) {
          item.quantity = quantity;
        }
        return item;
      });
      setBilling(tempData);
    },
    [billing],
  );

  const onPressNext = useCallback(() => {
    const items = billing.filter(item => item.quantity > 0);
    navigation.push('Payment', {
      items: [...items],
    });
  }, [billing]);

  return (
    <BillingLayout
      billing={billing}
      updateQuantity={updateQuantity}
      onPressNext={onPressNext}
    />
  );
};
export default BillingScreen;
