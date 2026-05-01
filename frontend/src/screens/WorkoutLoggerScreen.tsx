import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Plus, Dumbbell } from 'lucide-react-native';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export default function WorkoutLoggerScreen() {
  const [type, setType] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogWorkout = async () => {
    if (!type || !weight || !reps) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/workouts`, {
        userId: 'f0340356-9be8-4444-972f-5322797e0344', // Mocked user for now
        type,
        weight: parseFloat(weight),
        reps: parseInt(reps),
      });
      Alert.alert('Success', 'Workout logged! Shared streak updated.');
      setType('');
      setWeight('');
      setReps('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to log workout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Log Workout</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Exercise Type (e.g., Chest)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Push Day / Bench Press" 
          placeholderTextColor="#666"
          value={type}
          onChangeText={setType}
        />
      </View>

      <View style={{ flexDirection: 'row', gap: 20 }}>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric" 
            placeholder="80" 
            placeholderTextColor="#666"
            value={weight}
            onChangeText={setWeight}
          />
        </View>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={styles.label}>Reps</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric" 
            placeholder="12" 
            placeholderTextColor="#666"
            value={reps}
            onChangeText={setReps}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogWorkout}
        disabled={loading}
      >
        <Plus color="#000" size={20} />
        <Text style={styles.buttonText}>{loading ? 'Logging...' : 'Sync to Duo'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 20 },
  title: { ...Typography.h1, color: Colors.text, marginBottom: 30, marginTop: 40 },
  inputGroup: { marginBottom: 20 },
  label: { ...Typography.caption, color: Colors.primary as string, marginBottom: 8 },
  input: { 
    backgroundColor: Colors.surface, 
    borderRadius: 12, 
    padding: 15, 
    color: Colors.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333'
  },
  button: {
    backgroundColor: Colors.primary as string,
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20
  },
  buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 }
});
