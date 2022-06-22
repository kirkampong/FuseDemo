import { HStack, Box } from 'native-base';
import { StyleSheet, Dimensions} from 'react-native';
import { Text, View } from '../components/Themed';
import { LineChart } from 'react-native-chart-kit';

export default function TickerChart() {
  return (
    <View style={{flex:1, alignItems:'center'}}>
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
        height={350}
        yAxisLabel={'$'}
        chartConfig={{
          backgroundColor: 'blue',
          backgroundGradientFrom: 'gray',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
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

const styles = StyleSheet.create({
  
});
