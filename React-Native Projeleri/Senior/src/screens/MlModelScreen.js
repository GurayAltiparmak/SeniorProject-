import { StyleSheet, Text, View, TouchableOpacity, Image, Modal } from 'react-native';
import React, { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const MlModelScreen = () => {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openCamera = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        setSelectedImage(response.assets[0].uri);
        setIsModalVisible(false);
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery picker');
      } else if (response.errorCode) {
        console.log('Gallery Error: ', response.errorMessage);
      } else {
        setSelectedImage(response.assets[0].uri);
        setIsModalVisible(false);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.camContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <Text>Welcome!</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.galleryTextContainer}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.galleryText}>Click here to pick an image!</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalButton} onPress={openGallery}>
            <Text style={styles.galleryText}>Open gallery!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={openCamera}>
            <Text style={styles.galleryText} >Take a photo!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.galleryText}>İptal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default MlModelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303642',
    position: 'relative', 
  },
  camContainer: {
    position: 'absolute',
    left: '3%',
    right: '3%',
    bottom: '13%',
    top: '2%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5, 
    padding: 10,
  },
  galleryTextContainer: {
    position: 'absolute',
    bottom: '8%', 
    left: '5%',
    zIndex: 1, 
  },
  galleryText: {
    color: '#b6d877', // Metin rengi
    fontSize: 17, // Metin boyutu
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalButton: {
    padding: 20,
    backgroundColor: '#303642',
    margin: 10,
    borderRadius: 5,
  },
});