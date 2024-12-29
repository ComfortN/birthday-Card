import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../app/index';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(false);

  const handleCreateCard = () => {
    setLoading(true); // Show loader
    setTimeout(() => {
      setLoading(false); // Hide loader after a delay
      navigation.navigate('CardMaker');
    }, 2000); // Simulate a 2-second delay
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/CardCraft.png')}
        resizeMode="contain"
      />
      <Text style={styles.title}>Birthday Card Maker</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#FF69B4" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleCreateCard}>
          <Text style={styles.buttonText}>Create New Card</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FF69B4',
  },
  button: {
    backgroundColor: '#FF69B4',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
