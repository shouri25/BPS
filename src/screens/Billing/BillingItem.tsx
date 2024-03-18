import React, {useCallback} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {BillingData} from '../../types/billing';
import BPSText from '../../components/BPSText';
import BPSButton from '../../components/BPSbutton';
import {Colors} from '../../theme/Colors';
import {Card} from 'react-native-paper';
import Icons from '../../../assets/icons';

interface BillingItemProps {
  item: BillingData;
  updateQuantity: (id: number, quantity: number) => void;
}

const BillingItem = ({item, updateQuantity}: BillingItemProps) => {
  const onPressAdd = useCallback(() => {
    updateQuantity(item.item_id, item.quantity + 1);
  }, [ item]);
  const onPressRemove = useCallback(() => {
    updateQuantity(item.item_id, item.quantity - 1);
  }, [ item]);
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
      <View>
        <BPSText
          text={item.item_name}
          textStyle={{flex: 1}}
          fontWeight="700"></BPSText>
        <BPSText text={`Rs. ${item.price}`} textStyle={{width: 100}}></BPSText>
      </View>
      {item.quantity === 0 ? (
        <BPSButton
          text="Add"
          onPress={onPressAdd}
          containerStyle={{
            backgroundColor: Colors.textRed,
            minWidth: 100,
            height: 30,
          }}
        />
      ) : (
        <Card
          style={{
            width: 100,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 4,
              height: 30,
            }}>
            <TouchableOpacity onPress={onPressRemove}>
              <Image
                source={Icons.remove}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
            <BPSText text={item.quantity.toString()} fontWeight="500" />
            <TouchableOpacity onPress={onPressAdd}>
              <Image
                source={Icons.add}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </Card>
      )}
    </View>
  );
};
export default BillingItem;
