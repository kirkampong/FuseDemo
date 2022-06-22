import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function ModalScreenInfo() {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          This app was built using react native:
        </Text>

        <View
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)">
          <TouchableOpacity onPress={handleDocsPress}>
            <MonoText>https://reactnative.dev/</MonoText>
          </TouchableOpacity>
        </View>

        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Click on a ticker symbol in the "Trending" or "My Portfolio" sections to view its stock chart.
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <TouchableOpacity onPress={handleRepoPress} style={styles.repoLink}>
          <Text style={styles.repoLinkText} lightColor={Colors.light.tint}>
            Click here to view the github repo for this demo
          </Text>
        </TouchableOpacity>

        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Drag down to close this modal.
        </Text>
      </View>
    </View>
  );
}

function handleRepoPress() {
  WebBrowser.openBrowserAsync(
    'https://github.com/kirkampong/FuseDemo'
  );
}

function handleDocsPress() {
  WebBrowser.openBrowserAsync(
    'https://reactnative.dev'
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 20
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  repoLink: {
    paddingVertical: 15,
  },
  repoLinkText: {
    textAlign: 'center',
  },
});
