import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { HStack, Box, VStack, Pressable } from 'native-base';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import DateRangePicker from '../components/DateRangePicker';

export default function StatisticScreen({ route, navigation }) {
  const { chartData } = route.params;
  const val = {
    "ACT Symbol": "APPL",
    "Company Name": "Apple, Inc."
  }

  

  const TickerDetail = () => {
    return(
      <View style={{marginTop:'7%',backgroundColor: '#18181c'}}>
        <HStack key={val["ACT Symbol"]} space={3} justifyContent="left">
          <Box alignItems="center" key={val["ACT Symbol"]} bg="gray.600" rounded="xl" size="20" mb="3"
          _text={{fontSize: "lg",fontWeight: "bold",color: "warmGray.50",margin: 'auto',}}>
            {val["ACT Symbol"][0]}
          </Box>
          <VStack justifyContent="center" space={6} paddingBottom='3'>
            <Text>{val["ACT Symbol"]}</Text>
            <Text style={styles.secondaryColor}>{val["Company Name"].substring(0, 20)}</Text>
          </VStack>
          <View style={{flex: 1,backgroundColor: '#18181c',}}></View>
          <VStack justifyContent="center" space={6} paddingBottom='3'>
            <Text style={[styles.tickerData,{textAlign:'right'}]}>$34000.24</Text>
            <Text style={[styles.tickerData,{textAlign:'right', color:'green'}]}>+0.81%</Text>
          </VStack>
        </HStack>
      </View>
    );
  }

  const TickerSummary = () => {
    return(
      <View style={{marginBottom:20, marginTop:20,backgroundColor: '#18181c',}}>
        <HStack space={3} justifyContent="center" marginBottom="2">
          <Text style={styles.secondary}>Daily Change</Text>
          <View style={{flex: 1,backgroundColor: '#18181c',}}></View>
          <Text style={[styles.tickerData, {color: 'green'}]}>4,09%</Text>
        </HStack>
        <HStack space={3} justifyContent="center" marginBottom="2">
          <Text style={styles.secondary}>High Price</Text>
          <View style={{flex: 1,backgroundColor: '#18181c',}}></View>
          <Text style={styles.tickerData}>$8,560.00</Text>
        </HStack>
        <HStack space={3} justifyContent="center" marginBottom="2">
          <Text style={styles.secondary}>Low Price</Text>
          <View style={{flex: 1,backgroundColor: '#18181c',}}></View>
          <Text style={styles.tickerData}>$1560.00</Text>
        </HStack>
      </View>
    );
  }

  const TickerChart = () => {
    return (
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun','Mon'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width - 30} // responsive
          height={380}
          yAxisLabel={'$'}
          chartConfig={{
            backgroundColor: "#18181c",
            backgroundGradientFrom: "#18181c",
            backgroundGradientTo: "#18181c",
            fillShadowGradientFromOpacity: 0.7,
            fillShadowGradientToOpacity: 0,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(53, 181, 85, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 17,
            },
          }}
          bezier
          style={{marginVertical: 8,borderRadius: 0,}}
        />
      </View>
    );
  }

  const BottomSheetView = () => {
    return(
      <View style={styles.bottomNav}>
        <HStack justifyContent='space-between'>
          <Box style={[styles.button, styles.sellButtonColor]} rounded='xs' alignItems="center"
          _text={{color: "warmGray.50",fontSize: "lg"}} justifyContent='center'>
            Sell
          </Box>
          <Box style={[styles.button, styles.buyButtonColor]} rounded='xs' alignItems="center"
          _text={{color: "warmGray.50",fontSize: "lg"}} justifyContent='center'>
            Buy
          </Box>
        </HStack>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TickerDetail></TickerDetail>
      <DateRangePicker></DateRangePicker>
      <TickerChart></TickerChart>
      <TickerSummary></TickerSummary>
      <BottomSheetView></BottomSheetView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181c',
    paddingHorizontal: '5%',
  },
  chartContainer: {
    flex:1,
    alignItems:'center',
    backgroundColor: '#18181c',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    width:'45%',
    height: 50,
  },
  buyButtonColor: {
    backgroundColor:'#e38c40',
  },
  sellButtonColor: {
    backgroundColor:'#4e4e54',
  },
  secondary: {
    color: 'gray',
  },
  secondaryColor: {
    color: 'gray',
  },
  bottomNav: {
    height: '15%',
    backgroundColor: '#282A34',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginHorizontal: '-5%',
  },
  tickerData: {
    fontWeight: '500',
    fontSize: 15,
  }
});
