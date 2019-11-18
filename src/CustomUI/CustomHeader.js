import React ,{Component} from 'react';
import {View ,Text,StyleSheet,Image,TextInput} from 'react-native';
import Colors from '../Utility/Colors';
import { CustomTextInput } from './CustomTextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class CustomHeader extends Component {


    render(){
        return(
            <View style={styles.blueBoxes}>
                <View style={styles.headerStyle}>
                    <TouchableOpacity  onPress={this.props.nav.toggleDrawer()}>
                        <Image  source= {require('../../assets/menu.png')} style={styles.menyuStyle} />
                    </TouchableOpacity>
                    
                    <Text style={styles.headerText}>Dashboard</Text>
                </View>
                <View style={styles.searchStyle}> 
                <Image source={require('../../assets/search.png')} style={styles.serachImage} />
                <TextInput placeholder="Search Here" style={{marginTop:15}}/>

                </View>
            </View>
        )
    }
}


const styles  = StyleSheet.create({

    blueBoxes:{
        width:"100%",
        height:150,
        paddingLeft:20,
        paddingRight:20,
        alignItems:"center",
        backgroundColor:Colors.blue_btn,
        elevation:10
    },
    textStyle :{
        fontWeight:"normal",
        fontSize:15,
        color:"white"
    },
    headerStyle:{
        alignItems:"flex-start",
        alignSelf:"flex-start",
        flexDirection:'row',
        marginTop:20
    

    },
    menyuStyle:{
        width:30,
        height:30,
        marginTop:0
        
    },
    headerText:{
        fontWeight:"bold",
        fontSize:20,
        color:"white",
        marginTop:0,
        marginLeft:20
    },
    searchStyle:{
        width:"100%",
        height:45,
        paddingLeft:20,
        paddingRight:20,
        alignItems:"flex-start",
        backgroundColor:"white",
        borderRadius:5,
        flexDirection:"row",
        marginTop:20
        
    },
    serachImage:{
        width:30,
        height:30,
        alignSelf:"center"
    }
})