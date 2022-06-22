import { HStack, Box } from 'native-base';
import { StyleSheet} from 'react-native';

export default function DateRangePicker() {
  return(
    <HStack justifyContent='space-between' style={styles.container}>
      <Box alignItems="center" rounded="xl" size="10" mb="3"
      _text={{
        fontSize: "sm",
        color: "warmGray.50",
        margin: 'auto',
      }}>
        24H
      </Box>
      <Box alignItems="center" bg="gray.600" rounded="xl" size="10" mb="3"
      _text={{
        fontSize: "sm",
        color: "warmGray.50",
        margin: 'auto',
      }}>
        1W
      </Box>
      <Box alignItems="center" rounded="xl" size="10" mb="3"
      _text={{
        fontSize: "sm",
        color: "warmGray.50",
        margin: 'auto',
      }}>
        1M
      </Box>
      <Box alignItems="center" rounded="xl" size="10" mb="3"
      _text={{
        fontSize: "sm",
        color: "warmGray.50",
        margin: 'auto',
      }}>
        1Y
      </Box>
      <Box alignItems="center" rounded="xl" size="10" mb="3"
      _text={{
        fontSize: "sm",
        color: "warmGray.50",
        margin: 'auto',
      }}>
        All
      </Box>
    </HStack>
  );
}

const styles = StyleSheet.create({
  container: {
  }
});
