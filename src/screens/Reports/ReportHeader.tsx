import React from 'react';
import {DayReport} from '../../storage/sql';
import {Card} from 'react-native-paper';
import BPSText from '../../components/BPSText';
import {View} from 'react-native';

interface ReportLayoutProps {
  reportData: DayReport;
}
const ReportHeader = ({reportData}: ReportLayoutProps) => {
  return (
    <>
    <Card style={{
        margin:16
    }}>
      <Card.Title
        title="Reports : "
        titleStyle={{
          fontWeight: '700',
        }}
      />
      <Card.Content>
        <BPSText
          text={`Total Orders : ${
            reportData.cash.total + reportData.upi.total
          } `}
          center
          fontWeight="bold"
        />
        <BPSText
          text={`Total Amount : Rs. ${
            reportData.cash.amount + reportData.upi.amount
          } `}
          center
          fontWeight="bold"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 16,
          }}>
          <BPSText
            text={`UPI Orders : ${reportData.upi.total} `}
            center
            fontWeight="500"
          />
          <BPSText
            text={`UPI Amount : Rs. ${reportData.upi.amount} `}
            center
            fontWeight="500"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 16,
          }}>
          <BPSText
            text={`Cash Orders : ${reportData.cash.total} `}
            fontWeight="500"
            center
          />
          <BPSText
            text={`Cash Amount : Rs. ${reportData.cash.amount} `}
            fontWeight="500"
            center
          />
        </View>
      </Card.Content>
    </Card>
    
    <BPSText
            text={`Report details`}
            fontWeight="700"
            textStyle={{
                marginStart:16
            }}
          />
    </>
  );
};
export default ReportHeader;