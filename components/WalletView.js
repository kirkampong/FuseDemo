import { Text, View } from "./Themed";
import { Box, HStack } from 'native-base';
import { Ionicons, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import { StyleSheet} from 'react-native';

const balance = '$7,540.00';

export default function WalletView() {
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

const styles = StyleSheet.create({
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
    wallet: {
      backgroundColor: '#18181c',
      paddingHorizontal: '5%',
    },
});
