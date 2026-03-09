import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/themed-view";

import { Colors } from "@/constants/theme";

export default function OrderIndexScreen() {

  return (
    <ThemedView style={styles.container}>
     
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.scaffold,
  },
  
});
