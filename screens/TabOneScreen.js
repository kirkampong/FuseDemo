import { StyleSheet, ScrollView } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useEffect, useState } from 'react';
import { Box, HStack, Pressable, VStack, Center, Divider } from 'native-base';
import {Ionicons, FontAwesome, MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons';
import { tickerDataSample } from '../data/tickerDataSample';

import axios from 'axios';
const nyseData = require('./../data/nyse.json');

const baseUrl = 'https://yfapi.net';
const region = 'US';
const balance = '$7,540.00';

export default function TabOneScreen({ navigation }){ //}: RootTabScreenProps<'TabOne'>) {
  const [trendingStocks, setTrendingStocks] = useState([]); //<any[]>([]);
  const [portfolioTickers, setPortfolioTickers] = useState([]);
  const [portfolioTickerData, setPortfolioTickerData] = useState([]);
  const [trendingTickerData, setTrendingTickerData] = useState([]);

  // AXIOS : Possible Unhandled Promise Rejection (id: 0): [AxiosError: Request failed with status code 429]
  const fetchTrendingStocks = async () => {
    const url = `${baseUrl}/v1/finance/trending/${region}`;
    const response = await axios.get(url,{ headers: {
      'accept': 'application/json',
      'x-api-key': 'nhUTQw77IU1VzNxw3YzOt2vI1gwqzi7S3WwWgGua' 
      }}
    );
    const res = response.data.finance.result[0].quotes
    const result = res.map((o) => o.symbol)
    setTrendingStocks(result)
  };

  const fetchTrendingTickerData = async () => {
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

    // Yahoo finance API returns a max of 5 tickers per API call
    const comp = response.data.chart.result[0]; 
    setTrendingTickerData(tickerDataSample);
  };

  const fetchPortfolioTickerData = async () => {
    // Shuffle nyseData
    const shuffled = nyseData.sort(() => 0.5 - Math.random());
    // Get sub-array of first 50 elements after shuffled
    const selected = shuffled.slice(0, 50);
    setPortfolioTickers(selected)
    
    const portfolioSymbols = selected.map(val => val["ACT Symbol"]);
    
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
    
    // Yahoo finance API returns a max of 5 tickers for comparison

    const timestamp = response.data.chart.result[0].timestamp;
    const comp = response.data.chart.result[0].comparisons;
    setPortfolioTickerData(tickerDataSample);
  }

  const calcPercentChange = (previousClose, latestHigh) => {
    return (((latestHigh - previousClose)/(previousClose)) * 100).toFixed(2);
  }

  const getPricingForPortfolio = (tickerSymbol) => {
    const res = portfolioTickerData.find((obj) => {
      return obj.symbol === tickerSymbol;
    });
    return (res.high[res.high.length - 1]);
  }

  const getPercentChangeForPortfolio = (tickerSymbol) => {
    const res = portfolioTickerData.find((obj) => {
      return obj.symbol === tickerSymbol;
    });
    return calcPercentChange(res.chartPreviousClose,res.high[val.high.length - 1]);
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
            <Box key={val.symbol} bg="gray.600" rounded="xl" height='100%' width='110' mr="3" paddingLeft="5" safeArea>
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
        <Pressable key={val["ACT Symbol"]} onPress={() => navigation.navigate('Statistic',{ticker: val, tickerData: tickerDataSample})}>
          <HStack key={val["ACT Symbol"]} space={3}>
            <Box key={val["ACT Symbol"]} alignItems="center" bg="gray.600" rounded="xl" size="20" mb="3" safeArea>
              <Center _text={{color: "warmGray.50",fontWeight: "700",fontSize: "lg"}} 
              position="absolute" bottom="0" top="50%">
                {val["ACT Symbol"][0]}
              </Center>
            </Box>
            <VStack justifyContent="center" space={6} paddingBottom='3'>
              <Text>{val["ACT Symbol"].substring(0, 20)}</Text>
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
