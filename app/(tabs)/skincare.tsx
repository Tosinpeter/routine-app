import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { AppText as Text } from '@/components/app-text';

export default function SkincareScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text>Skincare Screen</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
