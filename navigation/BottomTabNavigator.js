import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import StocksScreen from "../screens/StocksScreen";
import SearchScreen from "../screens/SearchScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import Signup from "../screens/SignupScreen";
import { useStocks } from "../contexts/StocksContext";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";



export default function BottomTabNavigator({ navigation, route }) {
  const {loginToken} = useStocks();

  React.useLayoutEffect(() => {
    if (navigation != null) {
      navigation.setOptions({ headerTitle: "IFN666 Stock Application" });
    }
  }, [navigation, route]);

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "INF666 - Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-home" />
          ),
        }}
      />
          {(loginToken.token && loginToken.expires_in < Date.now()) && (

<BottomTab.Screen
name="Stocks"
component={StocksScreen}
options={{
  title: "Stocks",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="md-trending-up" />
  ),
}}
/>
 )}
    {(loginToken.token && loginToken.expires_in < Date.now()) && (
<BottomTab.Screen
name="Search"
component={SearchScreen}
options={{
  title: "Search",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="md-search" />
  ),
}}
/>
         
         )}
  
      
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  return getFocusedRouteNameFromRoute(route) ?? INITIAL_ROUTE_NAME;
}
