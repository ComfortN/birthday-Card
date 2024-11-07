import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const BirthdayCard = () => {
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const [imageSource, setImageSource] = useState<string | null>(null);
  const [textColor, setTextColor] = useState<string>('black');
  const [titleSize, setTitleSize] = useState<number>(24);
  const [messageSize, setMessageSize] = useState<number>(16);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  const handleMessageChange = (text: string) => {
    setMessage(text);
  };

  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
  };

  const handleTextColorChange = (color: string) => {
    setTextColor(color);
  };

  const handleTitleSizeChange = (text: string) => {
    const size = parseInt(text);
    setTitleSize(isNaN(size) ? 24 : size);
  };

  const handleMessageSizeChange = (text: string) => {
    const size = parseInt(text);
    setMessageSize(isNaN(size) ? 16 : size);
  };

  const handleAddImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageSource(result.uri);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <TextInput
            style={[styles.title, { color: textColor, fontSize: titleSize }]}
            value={title}
            onChangeText={handleTitleChange}
            placeholder="Enter title"
          />
        </View>
        <View style={styles.messageContainer}>
          <TextInput
            style={[styles.message, { color: textColor, fontSize: messageSize }]}
            value={message}
            onChangeText={handleMessageChange}
            placeholder="Enter message"
            multiline
          />
        </View>
        {imageSource && (
          <Image source={{ uri: '../assets/images/emoji1.png' }} style={styles.image} />
        )}
        <View style={styles.controlsContainer}>
          <View style={styles.colorPicker}>
            <Text style={styles.label}>Background Color:</Text>
            <TextInput
              style={[styles.colorInput]}
              value={backgroundColor}
              onChangeText={handleBackgroundColorChange}
              placeholder="white"
            />
          </View>
          <View style={styles.colorPicker}>
            <Text style={styles.label}>Text Color:</Text>
            <TextInput
              style={[styles.colorInput]}
              value={textColor}
              onChangeText={handleTextColorChange}
              placeholder="black"
            />
          </View>
          <View style={styles.sizeControl}>
            <Text style={styles.label}>Title Size:</Text>
            <TextInput
              style={styles.sizeInput}
              value={titleSize.toString()}
              onChangeText={(text) => handleTitleSizeChange(parseInt(text))}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.sizeControl}>
            <Text style={styles.label}>Message Size:</Text>
            <TextInput
              style={styles.sizeInput}
              value={messageSize.toString()}
              onChangeText={(text) => handleMessageSizeChange(parseInt(text))}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity style={styles.addImage} onPress={handleAddImage}>
            <Text>Add Image</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: 'pink',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  message: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 12,
  },
  controlsContainer: {
    marginTop: 12,
  },
  colorPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  label: {
    marginRight: 12,
    fontSize: 16,
  },
  colorInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    padding: 4,
  },
  sizeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  sizeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    padding: 4,
    width: 60,
  },
  addImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 12,
  },
});

export default BirthdayCard;