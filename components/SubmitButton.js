
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native-web";


export default function SubmitButton(props){
    return (
        <TouchableOpacity style={styles.button}>
        <Text>Submit</Text>
        </TouchableOpacity>
    ) 
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 20, 
        height: 40,
        width:200,
        marginHorizontal: 10,
        backgroundColor: "#FFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        padding: 10
    
      },
})