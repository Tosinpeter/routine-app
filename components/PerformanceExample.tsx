/**
 * Performance Testing Example Component
 * 
 * This file demonstrates how to use performance utilities in your components.
 * You can copy these patterns to your actual screens.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import {
  measurePerformance,
  useComponentPerformance,
  measureScreenNavigation,
  FPSMonitor,
  logMemoryUsage,
} from '@/utils/performance';

// Example: Measuring screen load time
export function ExampleScreenWithPerformance() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const perf = useComponentPerformance('ExampleScreen');

  useEffect(() => {
    // Log when component mounts
    perf.logMountTime();

    // Measure screen navigation time
    const logScreenReady = measureScreenNavigation('ExampleScreen');

    // Load data with performance tracking
    const loadData = async () => {
      await measurePerformance('Load Screen Data', async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockData = Array.from({ length: 50 }, (_, i) => ({
          id: `item-${i}`,
          title: `Item ${i}`,
        }));
        setData(mockData);
        setLoading(false);
      });

      // Log when screen is ready
      logScreenReady();
    };

    loadData();

    // Log memory usage in development
    if (__DEV__) {
      logMemoryUsage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Example: Measuring expensive operations
  const handleExpensiveOperation = async () => {
    const endMeasure = perf.measureRender('FilterData');
    
    // Simulate expensive filtering
    const filtered = data.filter(item => {
      // Some expensive computation
      return item.title.includes('Item');
    });
    
    endMeasure();
    console.log('Filtered items:', filtered.length);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Performance Example</Text>
      
      <Pressable style={styles.button} onPress={handleExpensiveOperation}>
        <Text style={styles.buttonText}>Run Expensive Operation</Text>
      </Pressable>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
          </View>
        )}
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={5}
      />
    </View>
  );
}

// Example: FPS Monitoring Component
export function FPSMonitorExample() {
  const [avgFPS, setAvgFPS] = useState<number | null>(null);
  const [monitoring, setMonitoring] = useState(false);
  const [fpsMonitor] = useState(() => new FPSMonitor());

  const startMonitoring = () => {
    fpsMonitor.start();
    setMonitoring(true);
    setAvgFPS(null);
  };

  const stopMonitoring = () => {
    const fps = fpsMonitor.stop();
    setAvgFPS(fps);
    setMonitoring(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FPS Monitor</Text>
      
      {avgFPS !== null && (
        <Text style={styles.fpsText}>
          Average FPS: {avgFPS.toFixed(2)}
        </Text>
      )}
      
      <Pressable
        style={[styles.button, monitoring && styles.buttonActive]}
        onPress={monitoring ? stopMonitoring : startMonitoring}
      >
        <Text style={styles.buttonText}>
          {monitoring ? 'Stop Monitoring' : 'Start Monitoring'}
        </Text>
      </Pressable>

      {/* Add some scrollable content to test */}
      <FlatList
        data={Array.from({ length: 100 }, (_, i) => ({ id: i }))}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.scrollItem}>
            <Text>Scroll me! Item {item.id}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EDEBE3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonActive: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  item: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 4,
  },
  fpsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  scrollItem: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 4,
    borderRadius: 4,
  },
});
