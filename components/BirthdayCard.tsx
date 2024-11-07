import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

interface BirthdayCardProps {
  // Add any props you want to pass to the component
}

const BirthdayCard: React.FC<BirthdayCardProps> = () => {
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF');
  const [imageSource, setImageSource] = useState<string | null>(null);

  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  const handleMessageChange = (text: string) => {
    setMessage(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <TextInput
            style={styles.title}
            value={title}
            onChangeText={handleTitleChange}
            placeholder="Enter title"
          />
        </View>
        <View style={styles.messageContainer}>
          <TextInput
            style={styles.message}
            value={message}
            onChangeText={handleMessageChange}
            placeholder="Enter message"
            multiline
          />
        </View>
        {imageSource && (
          <Image source={{ uri: imageSource }} style={styles.image} />
        )}
        <TouchableOpacity style={styles.addImage}>
          <Text>Add Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '80%'
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
  addImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});

export default BirthdayCard;