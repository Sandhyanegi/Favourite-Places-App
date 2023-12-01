import {View, StyleSheet, Alert, Image, Text} from 'react-native';
import {getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from 'expo-location';
import{useState} from 'react';


import OutlinedButton from '../UI/OutlinedButton';
import {Colors} from '../../constants/colors';
import {getMapPreview} from '../../util/location';

function LoacationPicker(){

    const [pickedLocation, setPickedLocation] = useState();

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    async function verifyPermissions(){
        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if(locationPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Insuffient Persmission!','You need to grant location permissions to use this app.');
            return false;
        };
        return true;
    }

    async function getLocationHandler(){
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }

       const location = await  getCurrentPositionAsync();
       setPickedLocation({
           lat:location.coords.latitude,
           lng:location.coords.longitude
       });
       console.log(location);
    }
    function pickOnMapHandler(){

    }

    let locationPreview = <Text>No location picked yet.</Text>;

    if(pickedLocation){
        locationPreview = ( <Image style={styles.image} source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}} /> )
    }

    return(
        <View>
            <View style={styles.mapPreview}>
              {locationPreview}  
            </View>
            <View style={styles.action}>
                <OutlinedButton icon="location" onPress={getLocationHandler} >Locate User</OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>
        </View>
    );
}
export default LoacationPicker;

styles = StyleSheet.create({
    mapPreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: Colors.primary100,
        borderRadius:4,
        overflow:'hidden',
    },
    action:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    image:{
        width:'100%',
        height:'100%',
        // borderRadius:4,
    },
})