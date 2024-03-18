import React, {useCallback, useMemo, useState} from 'react';

import {View} from 'react-native';
import {BillingData} from '../../types/billing';
import BPSText from '../../components/BPSText';
import {PaymentType} from '../../types/payment';
import {RadioButton} from 'react-native-paper';
import BPSButton from '../../components/BPSbutton';
import {Colors} from '../../theme/Colors';

interface PaymentFooter {
  items: BillingData[];
  onPressPrint: (value: PaymentType) => void;
}

const PaymentFooter = ({items, onPressPrint}: PaymentFooter) => {
  const [paymentMode, setPaymentMode] = useState<PaymentType>(PaymentType.UPI);

  const amount = useMemo(() => {
    return items.reduce((prev, item) => {
      return prev + item.price * item.quantity;
    }, 0);
  }, [items]);

  const onPressComplete = useCallback(() => {
    if (paymentMode) {
      onPressPrint(paymentMode);
    }
  }, [paymentMode]);

  return (
    <View
      style={{
        marginVertical: 16,
      }}>
      <BPSText
        text={`Total Amount Rs.${amount}`}
        fontWeight="bold"
        fontSize={18}
        center
      />
      <View
        style={{
          marginTop: 16,
        }}>
        <BPSText
          text="Payment Modes"
          textStyle={{
            marginBottom: 8,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <RadioButton
            value={PaymentType.UPI}
            status={paymentMode === PaymentType.UPI ? 'checked' : 'unchecked'}
            onPress={() => setPaymentMode(PaymentType.UPI)}
          />
          <BPSText text={'UPI'} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <RadioButton
            value={PaymentType.CASH}
            status={paymentMode === PaymentType.CASH ? 'checked' : 'unchecked'}
            onPress={() => setPaymentMode(PaymentType.CASH)}
          />
          <BPSText text={'CASH'} />
        </View>
        <BPSButton
          text="Complete & Print"
          onPress={onPressComplete}
          containerStyle={{
            backgroundColor: Colors.green,
            margin: 16,
          }}
        />
      </View>
    </View>
  );
};
export default PaymentFooter;
