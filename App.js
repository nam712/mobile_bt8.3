import * as React from 'react';
import { Text, View, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: '1',
    title: 'Scan, Pay & Enjoy!',
    text: 'Scan products you want to buy and pay by your phone & enjoy happy, friendly Shopping!',
    image: require('./assets/intro1.png'), // Đường dẫn hình ảnh chính xác
    backgroundColor: '#febe29',
  },
  {
    key: '2',
    title: 'Easy and Secure',
    text: 'Experience the safest way to shop using our app.',
    image: require('./assets/intro2.png'), // Đường dẫn hình ảnh chính xác
    backgroundColor: '#22bcb5',
  },
  {
    key: '3',
    title: 'Track Orders',
    text: 'Track your order status and delivery in real-time.',
    image: require('./assets/intro3.png'), // Đường dẫn hình ảnh chính xác
    backgroundColor: '#3395ff',
  },
];

function IntroSlider({ navigation }) {
  const [showHome, setShowHome] = useState(false);

  const renderSlide = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Image source={item.image} style={styles.introImage} />
        <Text style={styles.introTitle}>{item.title}</Text>
        <Text style={styles.introText}>{item.text}</Text>
      </View>
    );
  };

  const onDone = () => {
    // Khi nút hoàn tất được nhấn, chuyển sang màn hình chính
    setShowHome(true);
    navigation.replace('HomeMain'); // Chuyển tới HomeMain
  };

  if (showHome) {
    return null; // Không hiển thị slider nữa khi đã hoàn thành
  } else {
    return <AppIntroSlider renderItem={renderSlide} data={slides} onDone={onDone} />;
  }
}

// Màn hình chính
function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header với thông tin người dùng */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello 👋</Text>
          <Text style={styles.username}>Christie Doe</Text>
        </View>
        <Image style={styles.avatar} source={require('./assets/avatar.jpg')} />
      </View>

      {/* Thông tin của bạn */}
      <Text style={styles.Title}>Your Insights</Text>

      {/* Phần thông tin */}
      <View style={styles.insightsContainer}>
        <View style={styles.insightBox}>
          <Ionicons name="scan" size={30} color="#5A67D8" />
          <Text style={styles.insightText}>Scan new</Text>
          <Text style={styles.insightSubText}>Scanned 483</Text>
        </View>
        <View style={styles.insightBox}>
          <Ionicons name="alert-circle" size={30} color="#E53E3E" />
          <Text style={styles.insightText}>Counterfeits</Text>
          <Text style={styles.insightSubText}>Counterfeited 32</Text>
        </View>
        <View style={styles.insightBox}>
          <Ionicons name="checkmark-circle" size={30} color="#48BB78" />
          <Text style={styles.insightText}>Success</Text>
          <Text style={styles.insightSubText}>Checkouts 8</Text>
        </View>
        <View style={styles.insightBox}>
          <Ionicons name="calendar" size={30} color="#38B2AC" />
          <Text style={styles.insightText}>Directory</Text>
          <Text style={styles.insightSubText}>History 26</Text>
        </View>
      </View>

      {/* Phần Khám Phá Thêm */}
      <View style={styles.exploreMoreContainer}>
        <Text style={styles.sectionTitle}>Explore More</Text>
        <Text style={styles.arrow}>→</Text>
      </View>
      <View style={styles.exploreMore}>
        {/* Bạn có thể thêm hình ảnh hoặc nội dung khác ở đây */}
      </View>
    </View>
  );
}

// Màn hình quét
function ScanScreen({ navigation }) {
  return (
    <View style={styles.scanContainer}>
      {/* Nút Quay lại */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Hình ảnh sản phẩm và khu vực quét */}
      <View style={styles.scanArea}>
        <Image
          style={styles.productImage}
          source={require('./assets/juice.jpg')}
        />
        <View style={styles.scanFrame} />
      </View>

      {/* Thông tin sản phẩm */}
      <View style={styles.productInfoContainer}>
        <View style={styles.productInfo}>
          <Image style={styles.avatar} source={require('./assets/juice.jpg')} />
          <Text style={styles.productName}>Lauren's Orange Juice</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Stack cho điều hướng chính
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

// Điều hướng chính của ứng dụng
export default function App() {
  const [showHome, setShowHome] = useState(false); // Quản lý trạng thái IntroSlider

  const handleDone = () => {
    setShowHome(true); // Khi IntroSlider hoàn tất, chuyển sang hiển thị Tab.Navigator
  };

  return (
    <NavigationContainer>
      {showHome ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Scan') {
                iconName = 'qr-code-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false, // Ẩn tiêu đề
          })}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Scan" component={ScanScreen} />
        </Tab.Navigator>
      ) : (
        // Hiển thị IntroSlider nếu showHome là false
        <IntroSlider navigation={{ replace: handleDone }} />
      )}
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f7',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introImage: {
    width: 320,
    height: 320,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  introText: {
    fontSize: 16,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 18,
    color: '#a0aec0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  Title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a5568',
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a5568',
  },
  insightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',  // Ensure spacing between the cards
  },
  insightBox: {
    backgroundColor: '#fff',
    width: '47%',   // Adjust width to fit two in a row with some margin
    padding: 20,
    borderRadius: 12,
    marginBottom: 20, // Space between rows
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  insightText: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  insightSubText: {
    marginTop: 5,
    color: '#a0aec0',
  },
  exploreMore: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  exploreMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This will space out the title and arrow
    alignItems: 'center', // Center them vertically
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  arrow: {
    fontSize: 24, // Adjust size if needed
    color: '#4A5568', // Match with your theme
  },
  scanContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f7',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  scanArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 120, // Adjusted width for a smaller image
    height: 240, // Adjusted height for a smaller image
  },
  scanFrame: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderColor: '#ff007f',
    borderWidth: 2,
    borderRadius: 10,
  },
  productInfoContainer: {
    backgroundColor: 'white', // Background color for the product info container
    padding: 10,
    borderRadius: 8,
    marginTop: 20, // Space above the container
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensure space between name and button
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#ff007f',
    padding: 10,
    borderRadius: 5,
  },
});

