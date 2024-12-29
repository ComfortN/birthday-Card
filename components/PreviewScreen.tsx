import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, CardData } from '../app/index';

type PreviewScreenRouteProp = RouteProp<RootStackParamList, 'Preview'>;

type Props = {
  route: PreviewScreenRouteProp;
};

const PreviewScreen: React.FC<Props> = ({ route }) => {
  const { cardData } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: cardData.backgroundColor }]}>
      {cardData.image && (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: cardData.image }} 
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>
      )}
      <Text style={styles.recipientName}>{cardData.recipientName}</Text>
      <Text 
        style={[
          styles.message,
          {
            fontFamily: cardData.fontFamily,
            fontSize: cardData.fontSize,
            fontWeight: cardData.isBold ? 'bold' : 'normal',
            fontStyle: cardData.isItalic ? 'italic' : 'normal',
            textDecorationLine: cardData.isUnderline ? 'underline' : 'none',
          }
        ]}
      >
        {cardData.message}
      </Text>
      <View style={styles.decorations}>
        {cardData.decorations.map((decoration, index) => (
          <Text key={index} style={styles.decoration}>
            {decoration}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  recipientName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
  },
  decorations: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
  },
  decoration: {
    fontSize: 24,
    margin: 5,
  },
});

export default PreviewScreen;