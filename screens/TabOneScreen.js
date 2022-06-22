import { StyleSheet, ScrollView } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useEffect, useState } from 'react';
import { Box, HStack, Pressable, VStack, Center, Divider } from 'native-base';
import {Ionicons, FontAwesome, MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons';

import axios from 'axios';
const nyseData = require('./../data/nyse.json');

const baseUrl = 'https://yfapi.net';
const region = 'US';
const balance = '$7,540.00';

const tickerSample = [
  {
    "chartPreviousClose": 193.54,
    "close": [
      196.23,
      181.28,
      183.83,
      191.63,
      195.13,
      193.64,
      188.64,
      198.86,
      190.78,
      194.25,
      195.65,
      196.64,
      184,
      175.57,
      164.26,
      163.73,
      169.35,
      160.87,
      163.74,
      157.05,
    ],
    "high": [
      196.99,
      183.68,
      185.45,
      192.83,
      195.33,
      197.6,
      199.53,
      200.94,
      196.61,
      196.92,
      196.53,
      202.03,
      199.45,
      183.1,
      172.58,
      166.75,
      172.16,
      165.08,
      165.9,
      167.76,
    ],
    "low": [
      191.24,
      176.11,
      179.32,
      182.26,
      189.8,
      192.01,
      185,
      187.73,
      189.78,
      188.4,
      191.49,
      194.41,
      183.68,
      175.02,
      164.03,
      161.36,
      163.98,
      159.61,
      159.9,
      155.97,
    ],
    "open": [
      195.19,
      180.55,
      180.4,
      182.88,
      191.36,
      194.89,
      196.51,
      188.45,
      195.98,
      193.99,
      191.93,
      194.67,
      194.28,
      183.04,
      170.59,
      166.03,
      167.2,
      163.72,
      161.68,
      165.93,
    ],
    "symbol": "META",
  },
  {
    "chartPreviousClose": 663.9,
    "close": [
      674.9,
      628.16,
      658.8,
      707.73,
      759.63,
      758.26,
      740.37,
      775,
      703.55,
      714.84,
      716.66,
      725.6,
      719.12,
      696.69,
      647.21,
      662.67,
      699,
      639.3,
      650.28,
      711.11,
    ],
    "high": [
      679.96,
      653.92,
      669.32,
      718.67,
      759.8,
      778.8,
      771.98,
      792.63,
      743.39,
      734.6,
      719.99,
      749.89,
      766.64,
      718.5,
      679.9,
      678.99,
      706.99,
      675.5,
      662.91,
      730.7321,
    ],
    "low": [
      638.06,
      620.57,
      623.01,
      653.66,
      720.53,
      734.23,
      730.92,
      726.2,
      700.25,
      703.05,
      690.28,
      717.53,
      717.98,
      683.74,
      644.05,
      635.21,
      654.45,
      626.08,
      639.59,
      673.21,
    ],
    "open": [
      655.02,
      653.53,
      623.85,
      661.42,
      723.25,
      773.84,
      755.16,
      732.47,
      729.68,
      733.06,
      702,
      720.26,
      748.02,
      705.47,
      669.5,
      654.86,
      662.75,
      668.21,
      640.3,
      673.81,
    ],
    "symbol": "TSLA",
  },
  {
    "chartPreviousClose": 16.44,
    "close": [
      16,
      14.63,
      14.64,
      16.03,
      16.57,
      17.39,
      17.57,
      18.85,
      18.08,
      19.18,
      19.65,
      20.38,
      18.82,
      18.14,
      15.99,
      18.66,
      20.11,
      19.18,
      20.77,
      22.66,
    ],
    "high": [
      16.01,
      15.53,
      15,
      16.13,
      16.69,
      17.92,
      18.93,
      18.85,
      18.74,
      19.8,
      19.68,
      20.45,
      19.68,
      19.18,
      17.49,
      19.09,
      20.26,
      19.93,
      20.89,
      23.1,
    ],
    "low": [
      15.24,
      14.4,
      14.09,
      14.33,
      15.67,
      16.76,
      17.48,
      16.99,
      17.81,
      18.8,
      18.6,
      19.86,
      18.45,
      17.81,
      15.84,
      16.49,
      18.18,
      18.47,
      19.73,
      21.58,
    ],
    "open": [
      15.8,
      15.53,
      14.79,
      14.52,
      16.16,
      17.77,
      17.59,
      17.54,
      18.42,
      18.99,
      18.98,
      20.32,
      18.72,
      18.86,
      17.32,
      16.53,
      18.96,
      19.18,
      19.77,
      21.84,
    ],
    "symbol": "NIO",
  },
  {
    "chartPreviousClose": 28.92,
    "close": [
      27.99,
      26.53,
      27.25,
      29.23,
      30.96,
      31.4,
      30.25,
      31.94,
      30.19,
      28.98,
      29.72,
      29.8,
      28.87,
      28.36,
      26.81,
      27.3,
      29.08,
      26.42,
      26.24,
      29.07,
    ],
    "high": [
      28.61,
      27.5,
      27.725,
      29.92,
      31.821,
      32.6,
      32.22,
      32.79,
      31.46,
      31,
      29.76,
      31.42,
      30.21,
      29.64,
      27.87,
      28.68,
      29.56,
      28.9,
      27.17,
      30.3574,
    ],
    "low": [
      26.7,
      25.54,
      25.72,
      27.081,
      29.58,
      30.09,
      29.95,
      29.16,
      29.877,
      28.675,
      27.4,
      29.63,
      28.73,
      27.71,
      26.371,
      26.026,
      27.14,
      25.8,
      25.59,
      26.998,
    ],
    "open": [
      28.61,
      27.385,
      26.39,
      27.23,
      29.59,
      32.345,
      31.65,
      29.39,
      30.85,
      30.85,
      28.6,
      29.69,
      29.5,
      28.33,
      27.16,
      26.69,
      27.18,
      27.95,
      26.545,
      26.98,
    ],
    "symbol": "RIVN",
  },
  {
    "chartPreviousClose": 107.591,
    "close": [
      107.557,
      104.1,
      106.775,
      111.0775,
      115.1465,
      120.2095,
      121.684,
      125.511,
      122.35,
      124.79,
      123,
      121.18,
      116.15,
      109.65,
      103.67,
      102.31,
      107.67,
      103.66,
      106.22,
      108.68,
    ],
    "high": [
      108.819,
      105.4,
      108.175,
      112.6655,
      115.187,
      121.9945,
      125.179,
      125.61,
      124.4,
      128.99,
      124.1,
      123.75,
      121.3,
      114.5,
      106.54,
      104.88,
      109.06,
      104.58,
      106.98,
      111.6299,
    ],
    "low": [
      103.95,
      101.26,
      103.65,
      107.4535,
      112.628,
      115.675,
      120.6225,
      120.045,
      121.0465,
      123.81,
      120.63,
      120.75,
      116.1,
      109.05,
      101.86,
      101.43,
      103.53,
      102.01,
      102.51,
      103.56,
    ],
    "open": [
      108.461,
      104.025,
      103.6555,
      107.97,
      113.55,
      116.28,
      122.256,
      121.684,
      124.2,
      125.25,
      122.01,
      122.61,
      119.99,
      113.42,
      104.19,
      104.19,
      103.86,
      104.47,
      102.8,
      108.2,
    ],
    "symbol": "AMZN",
  },
]



export default function TabOneScreen({ navigation }){ //}: RootTabScreenProps<'TabOne'>) {
  const [trendingStocks, setTrendingStocks] = useState([]); //<any[]>([]);
  const [portfolioTickers, setPortfolioTickers] = useState([]);
  const [portfolioTickerData, setPortfolioTickerData] = useState([]);
  const [trendingTickerData, setTrendingTickerData] = useState([]);

  // AXIOS : Possible Unhandled Promise Rejection (id: 0): [AxiosError: Request failed with status code 429]
  const fetchTrendingStocks = async () => {
    /*const url = `${baseUrl}/v1/finance/trending/${region}`;
    const response = await axios.get(url,{ headers: {
      'accept': 'application/json',
      'x-api-key': 'nhUTQw77IU1VzNxw3YzOt2vI1gwqzi7S3WwWgGua' 
      }}
    );*/
    const trendingSample = JSON.parse('{"finance":{"result":[{"count":20,"quotes":[{"symbol":"TSLA"},{"symbol":"NIO"},{"symbol":"RIVN"},{"symbol":"META"},{"symbol":"AMZN"},{"symbol":"GME"},{"symbol":"NVDA"},{"symbol":"MULN"},{"symbol":"^IXIC"},{"symbol":"CLVS"},{"symbol":"K"},{"symbol":"COIN"},{"symbol":"SRNE"},{"symbol":"AMC"},{"symbol":"NFLX"},{"symbol":"SPY"},{"symbol":"GOOGL"},{"symbol":"TQQQ"},{"symbol":"AMD"},{"symbol":"SQQQ"}],"jobTimestamp":1655831416128,"startInterval":202206211600}],"error":null}}')
    const res = trendingSample.finance.result[0].quotes//response.data.finance.result[0].quotes
    const result = res.map((o) => o.symbol)
    // sanitize ^ before symbol?
    setTrendingStocks(result)
  };

  const fetchTrendingTickerData = async () => {
    /*
    const url = `${baseUrl}/v8/finance/chart/AAPL`;
    const response = await axios.get(url,{ 
      headers: {
        'accept': 'application/json',
        'x-api-key': 'nhUTQw77IU1VzNxw3YzOt2vI1gwqzi7S3WwWgGua' 
      },
      // return ticker data with daily intervals
      params: {
        'comparisons':trendingStocks.join(),
        'interval': '1d',
        'range': '1mo',
      }
    });

    // Yahoo finance API returns a max of 5 tickers for comparison!!

    //const timestamp = response.data.chart.result[0].timestamp;
    const comp = response.data.chart.result[0].comparisons;
    // console.log(comp)
    */

    setTrendingTickerData(tickerSample);
  };

  const fetchPortfolioTickerData = async () => {
    // Shuffle nyseData
    const shuffled = nyseData.sort(() => 0.5 - Math.random());
    // Get sub-array of first 50 elements after shuffled
    const selected = shuffled.slice(0, 50);
    setPortfolioTickers(selected)
    
    const portfolioSymbols = selected.map(val => val["ACT Symbol"]);
    /*
    const url = `${baseUrl}/v8/finance/chart/AAPL`;
    const response = await axios.get(url,{ 
      headers: {
        'accept': 'application/json',
        'x-api-key': 'nhUTQw77IU1VzNxw3YzOt2vI1gwqzi7S3WwWgGua' 
      },
      // return ticker data with daily intervals
      params: {
        'comparisons':portfolioSymbols.join(),
        'interval': '1d',
        'range': '1mo',
      }
    });
    */

    // Yahoo finance API returns a max of 5 tickers for comparison!!

    //const timestamp = response.data.chart.result[0].timestamp;
    //const comp = response.data.chart.result[0].comparisons;
    //console.log(portfolioSymbols);
    setPortfolioTickerData(tickerSample);
  }

  const calcPercentChange = (previousClose, latestHigh) => {
    return (((latestHigh - previousClose)/(previousClose)) * 100).toFixed(2);
  }

  useEffect(() => {
    fetchTrendingStocks();
    fetchTrendingTickerData();
    fetchPortfolioTickerData();
  }, []);

  const WalletView = () => {
    return (
      <View style={styles.wallet}>
        <HStack>
          <Text style={styles.secondary}>Current Balance</Text>
          <View style={{flex:1, backgroundColor: '#18181c'}}></View>
          <HStack space={4} marginTop='4%'>
            <MaterialCommunityIcons name="line-scan" size={24} color="white" />
            <Ionicons name="notifications-outline" size={24} color="white" />
          </HStack>
        </HStack>
        <HStack space={2}>
          <Text style={styles.balance}>{balance}</Text>
          <Box backgroundColor='#282A34' rounded='xl' justifyContent='center'>
            <HStack>
              <Text style={{color:'gray'}}>USD</Text>
              <MaterialIcons name="keyboard-arrow-down" size={13} color="gray" />
            </HStack>
          </Box>
        </HStack>
      </View>
    );
  }
  
  const TrendingView = () => {
    return (
      <View style={styles.containerTrending}>
        <Text style={styles.title}>Trending</Text>
        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>    
          {trendingTickerData.map(val => 
          <Pressable key={val.symbol}>
            <Box key={val.symbol} bg="gray.600" rounded="xl" height='100%' width='110' mr="3" safeArea>
              <Text>{val.symbol}</Text>
              <Text>${val.high[val.high.length - 1]}</Text>
              <Text>{calcPercentChange(val.chartPreviousClose, val.high[val.high.length - 1])}%</Text>
            </Box>
          </Pressable>
          )}
        </ScrollView>
      </View>
    );
  }

  const PortfolioEntries = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {(portfolioTickers).map(val =>
        <Pressable key={val["ACT Symbol"]} onPress={() => navigation.navigate('Statistic',{chartData: 86})}>
          <HStack key={val["ACT Symbol"]} space={3}>
            <Box key={val["ACT Symbol"]} alignItems="center" bg="gray.600" rounded="xl" size="20" mb="3" safeArea>
              <Center _text={{color: "warmGray.50",fontWeight: "700",fontSize: "lg"}} 
              position="absolute" bottom="0" top="50%">
                {val["ACT Symbol"][0]}
              </Center>
            </Box>
            <VStack justifyContent="center" space={6} paddingBottom='3'>
              <Text>{val["ACT Symbol"]}</Text>
              <Text style={styles.secondaryColor}>{val["Company Name"].substring(0, 20)}</Text>
            </VStack>
            <View style={{flex: 1, backgroundColor:'#18181c'}}></View>
            <VStack justifyContent="center" space={6} paddingBottom='3'>
              <Text style={{textAlign:'right'}}>$34000.24</Text>
              <Text style={{textAlign:'right', color:'green'}}>+0.81%</Text>
            </VStack>
          </HStack>
        </Pressable>
        )}
      </ScrollView>
    );
  }

  const PortfolioView = () => {
    return (
      <View style={styles.containerPf}>
        <Text style={styles.title}>My Portfolio</Text>
        <PortfolioEntries></PortfolioEntries>     
      </View>
    );
  }

  const BottomNavigatorView = () => {
    return(
      <View style={styles.bottomNav}>
        <HStack justifyContent='space-between'>
          <Ionicons name="home" size={26} color="white" />
          <Ionicons name="stats-chart" size={26} color="gray" />
          <MaterialIcons name="compare-arrows" size={26} color="gray" />
          <Ionicons name="cart-outline" size={26} color="gray" />
          <FontAwesome name="globe" size={26} color="white" />
        </HStack>
      </View>
    );
  }

  return (
    <View style={styles.containerMain}>
      <WalletView></WalletView>
      <Divider bg="gray.700" width='90%' alignSelf='center' mt={5}/>
      <TrendingView></TrendingView>
      <PortfolioView></PortfolioView>
      <BottomNavigatorView></BottomNavigatorView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTrending:{
    //flex: 1,
    //alignItems: 'flex-start',
    height: '25%',
    backgroundColor: '#18181c',
    paddingLeft: '5%',
    //paddingHorizontal: '5%',
  },
  wallet: {
    backgroundColor: '#18181c',
    paddingHorizontal: '5%',
  },
  containerMain: {
    flex: 1,
    backgroundColor: '#18181c',
  },
  containerPf: {
    flex: 1,
    backgroundColor: '#18181c',
    paddingHorizontal: '5%',
  },
  bottomNav: {
    height: '12%',
    backgroundColor: '#282A34',
    paddingVertical: 17,
    paddingHorizontal: '5%',
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    marginTop: 15,
  },
  secondary: {
    color: 'gray',
    marginBottom: 15,
    marginTop: '5%',
  },
  secondaryColor: {
    color: 'gray',
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
