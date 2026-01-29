import { StyleSheet } from 'react-native';

// import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function RoutineScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* <ThemedText type="title">Routine</ThemedText>
      <ThemedText>Your daily routines will appear here.</ThemedText> */}
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
