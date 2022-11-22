import * as React from "react";
import { Platform, StyleSheet, View, StatusBar } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { StocksProvider } from "./contexts/StocksContext";
import "react-native-gesture-handler";
import Login from "./screens/LoginScreen";
import Signup from "./screens/SignupScreen";
import StockDetail from "./screens/DetailScreen";

const Stack = createStackNavigator();

export default function App(props) {
  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="default" />}
      <NavigationContainer theme={DarkTheme}>
        <StocksProvider>
          <Stack.Navigator>

            <Stack.Screen
              name="Root"
              component={BottomTabNavigator}
              options={{ headerShown: false }} //this comment is the one hiddening header
            />
          <Stack.Screen name="Detail" component={StockDetail}></Stack.Screen>
            <Stack.Screen name="LogIn" component={Login}></Stack.Screen>
            <Stack.Screen name="SignUp" component={Signup}></Stack.Screen>
          </Stack.Navigator>
        </StocksProvider>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/*

<LineChart
data={{
  labels: label,
  datasets: [{
    data: datahis,
  }]
}}
width={Dimensions.get("window").width} // from react-native
height={220}
yAxisLabel="$"
yAxisInterval={1} // optional, defaults to 1
chartConfig={{
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726"
  }
}}
bezier
style={{
  marginVertical: 8,
  borderRadius: 16
}}
/>

    return(
      <View style={styles.container}>
      <Text style={styles.word}>Loading...</Text>

      </View>
    )



     <View style={styles.container}>
          <Text style={{ color: "white" }}>{query} Price Chart</Text>
          <View style={styles.buttons}>
          <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setDaynum(7);
        }}
      >
        <Text>W</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setDaynum(30);

        }}
      >
        <Text>M</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setDaynum(90);

        }}
      >
        <Text>3M</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setDaynum(365);
        }}
      >
        <Text>1Yr</Text>
      </TouchableOpacity>
          </View>
         
          <LineChart
            data={chartdata}
            width={Dimensions.get("window").width} // from react-native
            height={300}
            yAxisLabel="$"
            yAxisInterval={20} // optional, defaults to 1
            xAxisInterval={1} // optional, defaults to 1
            verticalLabelRotation={-45}
            chartConfig={{
              backgroundColor: "#303030",
              backgroundGradientFrom: "#303030",
              backgroundGradientTo: "#303030",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#202020",
              },
            }}
            bezier
            style={{
              borderRadius: 16,
            }}
          />
        </View>

*/