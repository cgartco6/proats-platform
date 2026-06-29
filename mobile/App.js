import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
  const [jobDesc, setJobDesc] = useState('');
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    setLoading(true);
    // In full app, use DocumentPicker for real upload
    Alert.alert("Demo", "Resume upload simulated. ATS Score calculated.");
    setScore(82);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProATS Mobile</Text>
      <TextInput
        style={styles.input}
        placeholder="Paste Job Description"
        multiline
        value={jobDesc}
        onChangeText={setJobDesc}
      />
      <Button title={loading ? "Processing..." : "Upload Resume & Score"} onPress={handleUpload} disabled={loading} />
      {score && <Text style={styles.score}>ATS Score: {score}/100</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#111' },
  title: { fontSize: 28, color: 'white', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#333', color: 'white', padding: 15, marginBottom: 20, borderRadius: 10, height: 150 },
  score: { marginTop: 30, fontSize: 24, color: '#22c55e', textAlign: 'center' }
});
