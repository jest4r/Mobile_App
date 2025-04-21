import React from "react";
import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import {
  createStaticNavigation
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from '@react-native-vector-icons/fontawesome';
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import CartScreen from "../screens/CartScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

// Tạo các màn hình đơn giản
// Login, Signup stck
const AuthStack = createNativeStackNavigator();
function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="Register" component={SignupScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}
// Tạo Tab Navigator
const Tab = createBottomTabNavigator();
function HomeTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Profile") {
          iconName = "user";
        } else if (route.name === "Category") {
          iconName = "th-large";
        } else if (route.name === "Cart") {
          iconName = "shopping-cart";
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "cyan",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Category" component={CategoryScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
  </Tab.Navigator>
  );
}

// Main Stack (HomeTabs + Detail + Cart)
const MainStack = createNativeStackNavigator();
function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
      <MainStack.Screen name="Details" component={DetailScreen} />
      <MainStack.Screen name="Cart" component={CartScreen} />
    </MainStack.Navigator>
  );
}

// App Navigator
export default function App() {
  const [isLogin, setIsLogin] = React.useState(false);
  useEffect(() => {
      const checkLogin = async () => {
          const token = await AsyncStorage.getItem('token');
          if (token) {
              setIsLogin(true);
          } else {
              setIsLogin(false);
          }
      };
      checkLogin();
  }, []);

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="Auth" component={AuthStackScreen} options={{headerShown: false}} />
        <AuthStack.Screen name="Main" component={MainStackScreen} options={{headerShown: false}} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}