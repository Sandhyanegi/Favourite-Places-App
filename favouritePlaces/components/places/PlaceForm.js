import { View , Text, ScrollView, TextInput, StyleSheet} from "react-native";
import {useState} from 'react';
import {Colors} from '../../constants/colors';
import ImagePicker from "./ImagePicker";
import LoacationPicker from "./LocationPicker";

function PLaceForm(){

    const [enteredTitle, setEnteredTitle] = useState();

    function changeTextHandler(enteredText){
        setEnteredTitle(enteredText);
    }

    return(
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput  style={styles.input} onChangeText={changeTextHandler} value={enteredTitle}  ></TextInput>
            </View>
            <ImagePicker/>
            <LoacationPicker/>
        </ScrollView>
    );
}
export default PLaceForm;

const styles = StyleSheet.create({
    form:{
        flex:1,
        padding:24,
    },
    label:{
        fontWeight:'bold',
        marginBottom:4,
        color:Colors.primary500,

    },
    input:{
        marginVertical:8,
        paddingHorizontal:4,
        paddingVertical:8,
        fontSize:16,
        borderBottomColor:Colors.primary700,
        borderBottomWidth:2,
        backgroundColor:Colors.primary100,
    },
})