import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, CardData } from '../app/index';
import { MaterialIcons } from '@expo/vector-icons'; 

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CardMaker'>;
};

const COLORS = ['#FFB6C1', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C'];
const FONT_FAMILIES = ['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'];
const FONT_SIZES = [12, 14, 16, 18, 20, 24, 28];
const DECORATIONS = ['🎉', '🎂', '🎈', '🎁', '✨'];

const CARD_ASPECT_RATIO = 1.4; // Standard greeting card ratio
const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH - 40; // 20px padding on each side
const CARD_HEIGHT = CARD_WIDTH * CARD_ASPECT_RATIO;

export default function BirthdayCard({ navigation }: Props) {
  const [cardData, setCardData] = useState<CardData>({
    recipientName: '',
    message: '',
    backgroundColor: '#FFFFFF', // Start with white background
    fontFamily: FONT_FAMILIES[0],
    fontSize: FONT_SIZES[2],
    isBold: false,
    isItalic: false,
    isUnderline: false,
    image: null,
    decorations: [],
  });
  const [loading, setLoading] = useState(false);


  const toggleBold = () => setCardData({ ...cardData, isBold: !cardData.isBold });
  const toggleItalic = () => setCardData({ ...cardData, isItalic: !cardData.isItalic });
  const toggleUnderline = () => setCardData({ ...cardData, isUnderline: !cardData.isUnderline });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCardData({ ...cardData, image: result.assets[0].uri });
    }
  };

  const addDecoration = (decoration: string) => {
    setCardData({ ...cardData, decorations: [...cardData.decorations, decoration] });
  };

  const handlePreview = () => {
    setLoading(true); // Show loader
    setTimeout(() => {
      setLoading(false); // Hide loader
      navigation.navigate('Preview', { cardData });
    }, 2000); // Simulate 2 seconds delay
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FF69B4" />
        </View>
      )}
      <ScrollView>
        <View style={styles.form}>
          {/* Card Preview */}
          <View style={styles.cardPreviewContainer}>
            <View style={[
              styles.cardPreview,
              { backgroundColor: cardData.backgroundColor }
            ]}>
              {cardData.image && (
                <Image source={{ uri: cardData.image }} style={styles.cardImage} />
              )}
              <Text
                style={[
                  styles.previewText,
                  {
                    fontFamily: cardData.fontFamily,
                    fontSize: cardData.fontSize,
                    fontWeight: cardData.isBold ? 'bold' : 'normal',
                    fontStyle: cardData.isItalic ? 'italic' : 'normal',
                    textDecorationLine: cardData.isUnderline ? 'underline' : 'none',
                  },
                ]}
              >
                {cardData.message || 'Your message will appear here'}
              </Text>
              <View style={styles.decorationsContainer}>
                {cardData.decorations.map((decoration, index) => (
                  <Text key={index} style={styles.decorationPreview}>{decoration}</Text>
                ))}
              </View>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Recipient's Name"
            value={cardData.recipientName}
            onChangeText={(text) => setCardData({ ...cardData, recipientName: text })}
          />
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Write your message..."
            value={cardData.message}
            onChangeText={(text) => setCardData({ ...cardData, message: text })}
            multiline
          />
          
          <Picker
            selectedValue={cardData.fontFamily}
            onValueChange={(itemValue) => setCardData({ ...cardData, fontFamily: itemValue })}
            style={styles.picker}
          >
            {FONT_FAMILIES.map((font) => (
              <Picker.Item label={font} value={font} key={font} />
            ))}
          </Picker>
          
          <Picker
            selectedValue={cardData.fontSize}
            onValueChange={(itemValue) => setCardData({ ...cardData, fontSize: itemValue })}
            style={styles.picker}
          >
            {FONT_SIZES.map((size) => (
              <Picker.Item label={`${size}`} value={size} key={size} />
            ))}
          </Picker>

          <View style={styles.formattingOptions}>
            <TouchableOpacity 
              style={[styles.formatButton, cardData.isBold && styles.formatButtonActive]} 
              onPress={toggleBold}
            >
              <Text style={styles.formatButtonText}>B</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.formatButton, cardData.isItalic && styles.formatButtonActive]} 
              onPress={toggleItalic}
            >
              <Text style={styles.formatButtonText}>I</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.formatButton, cardData.isUnderline && styles.formatButtonActive]} 
              onPress={toggleUnderline}
            >
              <Text style={styles.formatButtonText}>U</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.colorPicker}>
            {COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  cardData.backgroundColor === color && styles.colorOptionSelected
                ]}
                onPress={() => setCardData({ ...cardData, backgroundColor: color })}
              />
            ))}
          </View>

          <View style={styles.decorations}>
            {DECORATIONS.map((decoration, index) => (
              <TouchableOpacity
                key={index}
                style={styles.decorationButton}
                onPress={() => addDecoration(decoration)}
              >
                <Text style={styles.decorationText}>{decoration}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
            <Text style={styles.previewButtonText}>Preview Card</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Add Image Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={pickImage}>
      <MaterialIcons name="add-photo-alternate" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  form: {
    padding: 20,
    paddingBottom: 100, // Add padding for floating button
  },
  cardPreviewContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  cardPreview: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewText: {
    textAlign: 'center',
    color: '#333',
  },
  cardImage: {
    width: CARD_WIDTH - 40,
    height: (CARD_WIDTH - 40) * 0.75,
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  formattingOptions: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    gap: 10,
    marginBottom: 20,
  },
  formatButton: {
    padding: 10,
    // backgroundColor: '#ddd',
    borderRadius: 5,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formatButtonActive: {
    backgroundColor: '#FF69B4',
  },
  formatButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  colorOptionSelected: {
    borderWidth: 3,
    borderColor: '#333',
  },
  decorations: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  decorationButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    margin: 5,
  },
  decorationText: {
    fontSize: 24,
  },
  decorationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
  },
  decorationPreview: {
    fontSize: 24,
    margin: 5,
  },
  previewButton: {
    backgroundColor: '#FF69B4',
    padding: 15,
    borderRadius: 10,
  },
  previewButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF69B4',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
  },
});