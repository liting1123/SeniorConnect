import Constants from 'expo-constants';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

const DEFAULT_WEB_APP_PORT = 5173;

function getWebAppUrl() {
  if (process.env.EXPO_PUBLIC_WEB_APP_URL) {
    return process.env.EXPO_PUBLIC_WEB_APP_URL;
  }

  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoClient?.hostUri ||
    Constants.manifest?.debuggerHost;

  if (!hostUri) {
    return null;
  }

  const host = hostUri.split(':')[0];
  const port = Constants.expoConfig?.extra?.webAppPort || DEFAULT_WEB_APP_PORT;

  return `http://${host}:${port}`;
}

export default function App() {
  const webAppUrl = useMemo(getWebAppUrl, []);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = () => {
    setHasError(false);
    setIsLoading(true);
    setReloadKey((current) => current + 1);
  };

  if (!webAppUrl) {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.message}>
          <Text style={styles.title}>SeniorConnect</Text>
          <Text style={styles.body}>
            Set EXPO_PUBLIC_WEB_APP_URL to your Vite URL, then restart Expo.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <WebView
        key={reloadKey}
        source={{ uri: webAppUrl }}
        style={styles.webview}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        onShouldStartLoadWithRequest={(request) => {
          const isSameApp = request.url.startsWith(webAppUrl);

          if (!isSameApp && request.navigationType === 'click') {
            Linking.openURL(request.url);
            return false;
          }

          return true;
        }}
        allowsBackForwardNavigationGestures
        originWhitelist={['http://*', 'https://*']}
      />

      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#18833b" />
        </View>
      )}

      {hasError && (
        <View style={styles.errorPanel}>
          <Text style={styles.title}>Cannot reach SeniorConnect</Text>
          <Text style={styles.body}>
            Start the web app with npm run dev, make sure this iPhone is on the
            same Wi-Fi, then try again.
          </Text>
          <Text style={styles.url}>{webAppUrl}</Text>
          <Pressable style={styles.button} onPress={reload}>
            <Text style={styles.buttonText}>Retry</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  message: {
    flex: 1,
    gap: 12,
    justifyContent: 'center',
    padding: 24,
  },
  errorPanel: {
    ...StyleSheet.absoluteFillObject,
    gap: 14,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    color: '#07122e',
    fontSize: 24,
    fontWeight: '700',
  },
  body: {
    color: '#46505f',
    fontSize: 16,
    lineHeight: 23,
  },
  url: {
    color: '#18833b',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#18833b',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
