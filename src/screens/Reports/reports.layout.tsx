import React from 'react';
import {View, FlatList} from 'react-native';
import {DayReport, ReportsDetails} from '../../storage/sql';
import {Card} from 'react-native-paper';
import BPSText from '../../components/BPSText';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import BPSButton from '../../components/BPSbutton';
import moment from 'moment';
import ReportHeader from './ReportHeader';
import ItemSeparator from '../../components/ItemSeparator';
interface ReportLayoutProps {
  reportData: DayReport;
  startDate: Date;
  endDate: Date;
  onPressStartDate: () => void;
  onPressEndDate: () => void;
  showDate: boolean;
  onChangeDatePicker: (event: DateTimePickerEvent) => void;
  reportDetails: ReportsDetails[];
  datePickerDate: Date;
}

const ReportsLayout = ({
  reportData,
  startDate,
  onPressStartDate,
  onPressEndDate,
  showDate,
  onChangeDatePicker,
  reportDetails,
  datePickerDate,
  endDate,
}: ReportLayoutProps) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
        <View style={{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between',
          
          margin: 16,
          marginBottom: 0,
        }}>
      <BPSButton
        text={`Start : ${moment(startDate).format('DD/MM/YYYY')}`}
        onPress={onPressStartDate}
        containerStyle={{
          marginEnd:8,
          minWidth:150,
        }}
      />
      <BPSButton
        text={`End : ${moment(endDate).format('DD/MM/YYYY')}`}
        onPress={onPressEndDate}
        containerStyle={{
          marginStart: 8,
          minWidth:150,
        }}
      />
      </View>
      <FlatList
        data={reportDetails}
        ListHeaderComponent={() => {
          return <ReportHeader reportData={reportData} />;
        }}
        keyExtractor={item => item.item_id.toString()}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 16,
              }}>
              <BPSText text={item.item_name} fontWeight="500" textStyle={{
                flex:1
              }} />
              <BPSText text={`${item.itemCount}`} fontWeight="500" textStyle={{
                width:50
              }} />
              <BPSText text={`Rs. ` + item.totalAmount} fontWeight="500" textStyle={{
                width:100,
                textAlign:'right'
              }}/>
            </View>
          );
        }}
        ItemSeparatorComponent={ItemSeparator}
      />
      {showDate && (
        <DateTimePicker
          mode="date"
          maximumDate={new Date()}
          value={datePickerDate}
          display="calendar"
          onChange={onChangeDatePicker}
        />
      )}
    </View>
  );
};
export default ReportsLayout;
