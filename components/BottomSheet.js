import { Animated, Dimensions, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useRef , useEffect, useState } from "react";
import { Portal, IconButton } from "react-native-paper";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";

const bottomsheetheight = Dimensions.get("window").height *0.70;
const devicewidth = Dimensions.get("window").width;

const BottomSheet = ({show, onDismiss, children}) => {
  const bottom = useRef(new Animated.Value(-bottomsheetheight)).current;
  const [open, setOpen] = useState(true);

  const onGesture = (event) => {
    if(event.nativeEvent.translationY > 0) {
      console.log(event.nativeEvent.translationY )
      bottom.setValue(-event.nativeEvent.translationY)
    }
  }
  const onGestureEnd = (event) => {
    if(event.nativeEvent.translationY > (bottomsheetheight / 2)){
      onDismiss();
    }else {
      bottom.setValue(0);
    }
  }

useEffect(() =>{
    if(show){
      setOpen(show);
      Animated.timing(bottom, {
        toValue: 0, 
        duration: 500,
        useNativeDriver: false,
      }).start();
    }else {
      Animated.timing(bottom, {
        toValue: -bottomsheetheight, 
        duration: 500,
        useNativeDriver: false,
      }).start(() =>{
        setOpen(false)
      });
    }
}, [show])


  if(!open){
    return null;
  }else {
    
  return (
    <Portal>
      <Animated.View
        style={[
          styles.root,
          {
            height: bottomsheetheight,
            bottom: bottom,
            shadowOffset: { height: -3 },
          },
        ]}
      >
        <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
        <View style={styles.header}>
          <IconButton color="white" icon="close" style={styles.icon} onPress={onDismiss}/>
          <View style={styles.littlebar} />
        </View>
        </PanGestureHandler>
        {children}
      </Animated.View>
    </Portal>
  );

  }
};
export default BottomSheet;

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "#303030",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      height: -3,
      width: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    overflow: "visible",
  },

  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    marginVertical: 10,
    borderRadius: 2,
    elevation: 3,
  },
  header: {
    height: 39,
    backgroundColor: "#303030",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'relative',
  },
  common: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
  },
  littlebar: {
    width: 60,
    height: 3,
    borderRadius: 2,
    position: "absolute",
    top: 8,
    left: (devicewidth - 60) / 2,
    zIndex: 10,
    backgroundColor: "#ddd",
    shadowColor: "#999999",
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
  },
  icon: {
    position: "relative",
  },
});
