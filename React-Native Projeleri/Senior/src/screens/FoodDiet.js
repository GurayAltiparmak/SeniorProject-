import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity, ImageBackground, Animated } from 'react-native';

const FoodDiet = () => {
  const screenWidth = Dimensions.get("window").width;
  const flatlistRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchText, setSearchText] = useState('');

  const carouselData = [
    {
      id: "01",
      image: require("../assets/images/kuruyemis.png"),
    },
    {
      id: "02",
      image: require("../assets/images/mutfakKadin.png"),
    },
    {
      id: "03",
      image: require("../assets/images/saglikliYemek.png"),
    },
  ];

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1));
      if (flatlistRef.current) {
        flatlistRef.current.scrollToIndex({
          index: activeIndex === carouselData.length - 1 ? 0 : activeIndex + 1,
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, carouselData.length]);

  const renderItem = ({ item, index }) => {
    let marginLeft = 0;
    let marginRight = 0;

    if (index === 0) {
      marginLeft = (screenWidth - screenWidth * 1) / 2;
    } else if (index === carouselData.length - 1) {
      marginRight = (screenWidth - screenWidth * 1) / 2;
    }

    return (
      <View style={{ width: screenWidth, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ marginLeft, marginRight }}>
          <Image
            source={item.image}
            style={{ height: 200, width: screenWidth * 0.9, borderRadius: 20 }}
            resizeMode="cover" 
          />
        </View>
      </View>
    );
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    scrollX.setValue(offsetX);
    const index = Math.round(offsetX / screenWidth);
    setActiveIndex(index);
  };

  const goCategory = (category) => {
    console.log(`${category} clicked`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <FlatList
          data={carouselData}
          ref={flatlistRef}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          getItemLayout={(data, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Looking for a recipe..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryBox} onPress={() => goCategory('Breakfast')}>
          <ImageBackground
            source={require('../assets/images/FoodList/breakfastAlternative.jpg')}
            style={styles.categoryImage}
          >
            <Text style={styles.categoryText}>Breakfast</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryBox} onPress={() => goCategory('Lunch')}>
          <ImageBackground
            source={require('../assets/images/FoodList/lunch.jpg')}
            style={styles.categoryImage}
          >
            <Text style={styles.categoryText}>Lunch</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryBox} onPress={() => goCategory('Dinner')}>
          <ImageBackground
            source={require('../assets/images/FoodList/dinnerOriginal.jpg')}
            style={styles.categoryImage}
          >
            <Text style={styles.categoryText}>Dinner</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryBox} onPress={() => goCategory('Snack')}>
          <ImageBackground
            source={require('../assets/images/FoodList/healthySnacks.jpg')}
            style={styles.categoryImage}
          >
            <Text style={styles.categoryText}>Snack</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FoodDiet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 20,
  },
  carouselContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  searchContainer: {
    width: '90%',
    backgroundColor: '#b6d877',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    color: '#303642',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '90%',
  },
  categoryBox: {
    width: '48%',
    height: 200,
    marginBottom: 18,
    borderRadius: 15,
    overflow: 'hidden',
  },
  categoryImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
});
