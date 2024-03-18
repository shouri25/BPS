import React, {useEffect, useCallback, useState,useMemo} from 'react';

import ReportsLayout from './reports.layout';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../navigation/navigators';
import {DayReport, ReportsDetails, SQL} from '../../storage/sql';
import moment from 'moment';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';

interface PaymentProps {
  navigation: NativeStackNavigationProp<StackParamList, 'Reports'>;
}
const ReportsScreen = ({navigation}: PaymentProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [reportData, setReportData] = useState<DayReport>({
    cash: {
      amount: 0,
      total: 0,
    },
    upi: {
      amount: 0,
      total: 0,
    },
  });
  const [reportDetails, setReportDetails] = useState<ReportsDetails[]>([]);

  const getReports = useCallback(async () => {
    try {
      const selectedStartDate = moment(startDate).format('MM/DD/YYYY');
      const selectedEndDate = moment(endDate).format('MM/DD/YYYY');
      const data = await SQL.getReports(selectedStartDate,selectedEndDate);
      setReportData(data);
      const details = await SQL.getDetailedReportByDate(selectedStartDate,selectedEndDate);
      console.log('details', details);
      setReportDetails(details);
    } catch (e) {}
  }, [startDate,endDate]);

  useEffect(() => {
    getReports();
  }, [startDate,endDate]);

  const onPressStartDate = useCallback(() => {
    setShowStartDate(true);
  }, []);

  const onPressEndDate = useCallback(() => {
    setShowEndDate(true);
  }, []);

  const onChangeDatePicker = useCallback(
    (event: DateTimePickerEvent) => {
      if (event.type === 'set') {
        if (showStartDate) {
          setStartDate(moment(event.nativeEvent.timestamp).toDate());
          setShowStartDate(false);
        } else {
          setEndDate(moment(event.nativeEvent.timestamp).toDate());
          setShowEndDate(false);
        }
      }
      setShowStartDate(false);
      setShowEndDate(false);
    },
    [showStartDate, showEndDate],
  );

  const datePickerDate = useMemo(()=>{
    return showEndDate ? endDate : startDate;
  },[showStartDate,showEndDate,startDate,endDate])

  return (
    <ReportsLayout
      reportData={reportData}
      startDate={startDate}
      endDate={endDate}
      showDate={showStartDate || showEndDate}
      datePickerDate={datePickerDate}
      onPressEndDate={onPressEndDate}
      onPressStartDate={onPressStartDate}
      onChangeDatePicker={onChangeDatePicker}
      reportDetails={reportDetails}
    />
  );
};
export default ReportsScreen;
