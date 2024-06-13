import { FlatList, StyleSheet, Text, View, Dimensions, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState, } from 'react'
import { ImageBackground } from 'react-native';




const FoodDiet = () => {

  const window = useWindowDimensions();

  const flatlistRef = useRef();
  // Get Dimesnions
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto Scroll

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === carouselData.length - 1) {
        flatlistRef.current.scrollToIndex({
          index: 0,
          animation: true,
        });
      } else {
        flatlistRef.current.scrollToIndex({
          index: activeIndex + 1,
          animation: true,
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  });

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
    index: index,
  });
  // Data for carousel
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

  //  Display Images // UI
  const renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{ height: 200, width: screenWidth }}
        />
      </View>
    );
  };

  // Handle Scroll
  const handleScroll = (event) => {

    // Get the scroll position
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = scrollPosition / screenWidth;

    // Update the index
    setActiveIndex(index);
  };

  const goBreakfast = () => {
    console.log("Kahvalti tiklandi");
  }


  return (
    <View style={styles.topContainer}>
      <View>
        <FlatList
          data={carouselData}
          ref={flatlistRef}
          getItemLayout={getItemLayout}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          pagingEnabled={true}
          onScroll={handleScroll}
        />
      </View>

      <View style={styles.midContainer}>
        <View style={styles.leftSide}>
          <View style={styles.ögünlisteContainer}>
            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={goBreakfast}
            >

              <ImageBackground
                source={require('../assets/images/FoodList/breakfastAlternative.jpg')}
                style={styles.backGroundPhoto}
                resizeMode='cover'
              >
                <Text style={styles.LabelFood}>Breakfast</Text>
              </ImageBackground>

            </TouchableOpacity>
          </View>


          <View style={styles.ögünlisteContainer}>

            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={goBreakfast}
            >

              <ImageBackground
                source={require('../assets/images/FoodList/lunch.jpg')}
                style={styles.backGroundPhoto}
                resizeMode='strech'
              >
                <Text style={styles.LabelFood}>Lunch</Text>
              </ImageBackground>

            </TouchableOpacity>
          </View>

        </View>


        <View style={styles.rightContainer}>

          <View style={styles.ögünlisteContainer} >
            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={goBreakfast}
            >

              <ImageBackground
                source={require('../assets/images/FoodList/dinnerOriginal.jpg')}
                style={styles.backGroundPhoto}
                resizeMode='strech'
              >
                <Text style={styles.LabelFood}>Dinner</Text>
              </ImageBackground>

            </TouchableOpacity>
          </View>

          <View style={styles.ögünlisteContainer} >
            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={goBreakfast}
            >

              <ImageBackground
                source={require('../assets/images/FoodList/healthySnacks.jpg')}
                style={styles.backGroundPhoto}
                resizeMode='strech'
              >
                <Text style={styles.LabelFood}>Snack</Text>
              </ImageBackground>

            </TouchableOpacity>
          </View>

        </View>

      </View>

    </View>
  );
};

export default FoodDiet

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: '#d2d2d2',

  },
  midContainer: {
    flex: 1,
  },
  leftSide: {
    flexDirection: 'row',
    height: 288.5,
  },
  rightContainer: {
    flexDirection: 'row',
    height: 288.5,
    bottom: 0,
    justifyContent: 'space-between'
  },
  ögünlisteContainer: {
    width: 183.5,
    height: 238.5,
    marginTop: 25,
    marginHorizontal: 10,
    borderRadius: 60,
    justifyContent: 'center',
    overflow: 'hidden',

  },
  touchableStyle: {
    flex: 1,
    borderRadius: 60,

  },
  backGroundPhoto: {
    flex: 1,
    borderRadius: 60,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    opacity: 0.93,

  },
  LabelFood: {
    color: '#e01c1c',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 10,
  },

})