import React, {useMemo, useState} from 'react';
import BPSButton from '../../components/BPSbutton';
import {BillingData} from '../../types/billing';

interface BillingFooterProps {
  items: BillingData[];
  onPressNext: () => void;
}

const BillingFooter = ({items = [], onPressNext}: BillingFooterProps) => {

  const itemCount = useMemo(() => {
    return items.reduce((prev, item) => {
      return prev + item.quantity;
    }, 0);
  }, [items]);

  return itemCount > 0 ? (
    <BPSButton
      text={`Next (${itemCount} items)`}
      onPress={onPressNext}
      containerStyle={{
        margin: 20,
        borderRadius: 8,
      }}
    />
  ) : (
    <></>
  );
};
export default BillingFooter;
