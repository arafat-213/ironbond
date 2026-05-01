import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export default function WorkoutHistoryScreen() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/workouts/history/f0340356-9be8-4444-972f-5322797e0344`);
      setWorkouts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.workoutType}>{item.type}</Text>
        <Text style={styles.date}>{new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.volume}>{item.volume}</Text>
        <Text style={styles.label}>Total Volume (kg)</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Workout History</Text>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={Colors.electricLime} size="large" />
          </View>
        ) : (
          <FlatList
            data={workouts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, paddingHorizontal: 24 },
  title: { 
    ...Typography.headlineLg, 
    color: Colors.text, 
    marginBottom: 32, 
    marginTop: 20 
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: Colors.glassSurface,
    borderColor: Colors.glassBorder,
    borderWidth: 1,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  workoutType: { 
    ...Typography.headlineMd, 
    fontSize: 20,
    color: Colors.text,
    marginBottom: 4
  },
  date: { 
    ...Typography.bodyMd, 
    color: Colors.textDim 
  },
  volume: { 
    ...Typography.statsNumber, 
    fontSize: 24,
    color: Colors.electricLime 
  },
  label: { 
    ...Typography.labelBold, 
    fontSize: 10,
    color: Colors.textDim,
  }
});
