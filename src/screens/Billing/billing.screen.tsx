import React, {useState,useMemo} from 'react';
import {FlatList, View} from 'react-native';
import {BillingData} from '../../types/billing';
import BillingItem from './BillingItem';
import ItemSeparator from '../../components/ItemSeparator';
import BillingFooter from './BillingFooter';
import {Searchbar} from 'react-native-paper';
import Icons from '../../../assets/icons';

interface BillingProps {
  billing: BillingData[];
  updateQuantity: (index: number, quantity: number) => void;
  onPressNext: () => void;
}

const BillingLayout = ({
  billing,
  updateQuantity,
  onPressNext,
}: BillingProps) => {
  const [search, setSearch] = useState('');

  const searchResults = useMemo(()=>{
    return billing.filter((item)=>item.item_name.toLowerCase().includes(search.toLowerCase()));
  },[search,billing])


  return (
    <View
      style={{
        flex: 1,
      }}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearch}
        value={search}
        icon={Icons.search}
        clearIcon={Icons.close}
      />
      <FlatList
        data={searchResults}
        keyExtractor={item => item.item_id.toString()}
        renderItem={({item}) => {
          return (
            <BillingItem
              item={item}
              updateQuantity={updateQuantity}
            />
          );
        }}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={() => {
          return <BillingFooter items={billing} onPressNext={onPressNext} />;
        }}
      />
    </View>
  );
};
export default BillingLayout;
