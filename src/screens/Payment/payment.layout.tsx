import React, {useMemo} from 'react';
import {BillingData} from '../../types/billing';
import {View, FlatList} from 'react-native';
import BPSText from '../../components/BPSText';
import BillingItem from '../Billing/BillingItem';
import ItemSeparator from '../../components/ItemSeparator';
import PaymentFooter from './PaymentFooter';
import { PaymentType } from '../../types/payment';

interface PaymentLayoutProps {
  items: BillingData[];
  updateQuantity: (index: number, quantity: number) => void;
  onPressPrint: (val: PaymentType) => void
}

const PaymentLayout = ({items, updateQuantity,onPressPrint}: PaymentLayoutProps) => {
  return (
    <View style={{flex: 1, margin: 16}}>
      <BPSText text={'Item(s) Added'} />
      <FlatList
        data={items}
        keyExtractor={item => item.item_id.toString()}
        renderItem={({item, index}) => {
          return (
            <BillingItem
              item={item}
              updateQuantity={updateQuantity}
              index={index}
            />
          );
        }}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={() => {
          return <PaymentFooter items={items} onPressPrint={onPressPrint}/>;
        }}
      />
    </View>
  );
};
export default PaymentLayout;
