import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PaymentLayout from './payment.layout';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../navigation/navigators';
import {RouteProp} from '@react-navigation/native';
import {BillingData} from '../../types/billing';
import {PaymentType} from '../../types/payment';
import Toast from 'react-native-toast-message';
import { SQL } from '../../storage/sql';
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from "react-native-bluetooth-ez-escpos-printer";
interface PaymentProps {
  navigation: NativeStackNavigationProp<StackParamList, 'Payment'>;
  route: RouteProp<StackParamList, 'Payment'>;
}
const PaymentScreen = ({navigation, route}: PaymentProps) => {
  const {items} = useMemo(() => {
    return route.params;
  }, [route.params]);

  const [selectedItems, setSelectedItems] = useState<BillingData[]>([]);

  useEffect(() => {
    setSelectedItems(route.params?.items ?? []);
  }, []);

  const updateQuantity = useCallback(
    (id: number, quantity: number) => {
      const tempData = [...selectedItems];
      if (quantity === 0) {
        setSelectedItems(tempData.filter((item) => item.item_id !== id));
      } else {
        tempData.map(item => {
          if (item.item_id === id) {
            item.quantity = quantity;
          }
          return item;
        });
        setSelectedItems(tempData);
      }
    },
    [selectedItems],
  );

  const onPressPrint = useCallback(
    async(val: PaymentType) => {
      await SQL.createOrder(selectedItems,val);
      Toast.show({
        type: 'success',
        text1: 'Billing completed',
      });
      navigation.reset({
        routes: [
          {
            name: 'HOME',
          },
          {
            name: 'Billing',
          },
        ],
      });
    },
    [selectedItems],
  );

  return (
    <PaymentLayout
      items={selectedItems ?? []}
      updateQuantity={updateQuantity}
      onPressPrint={onPressPrint}
    />
  );
};
export default PaymentScreen;
