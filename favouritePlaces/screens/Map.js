import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Alert } from 'react-native';
import {useState, useLayoutEffect, useCallback} from 'react';
import IconButton from '../components/UI/IconButton';

function Map({navigation}){

    const [selectedLocation, setSelectedLocation] = useState();

    const region = {
        latitude: 37.38,
        longitude: -222.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };
    
    function selectLocationHandler(event){
        // const lat: event.nativeEvent.coordinate.latitude;
        // const lng: event.nativeEvent.coordinate.longitude;
        setSelectedLocation({lat: lat, lng:lng});
    }

    const  savePickedLocation = useCallback( () => {
        if(!selectedLocation){
            Alert.alert('No location picked!', 'you have to pick a location (by tapping on the map) first!');
            return;
        };
        navigation.navigate('AddPlace',{
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng,
        });
    },[navigation,selectedLocation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight:({tintColor}) => <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocation} />
        })
    },[navigation,savePickedLocation]);

    return (
        <MapView style={styles.Map} initialRegion={region} onPress={selectLocationHandler} >
         { selectedLocation &&  <Marker title="Picked loction" coordinate={{latitude: selectedLocation.lat, longitude: selectedLocation.lng}} /> }
        </MapView>
    );

}
export default Map;

styles = StyleSheet.create({
    map:{
        flex:1,
    }
})