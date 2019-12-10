import React ,{Component} from 'react';
import {View ,Text,StyleSheet,Image,TextInput} from 'react-native';
import Colors from '../Utility/Colors';
import { CustomTextInput } from './CustomTextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class CustomHeaderDepartment extends Component {


    render(){
        console.log("NAME",this.props.nav)
        return(
            <View style={styles.blueBoxes}>
                <View style={styles.headerStyle}>
                    <TouchableOpacity onPress={()=>{this.props.nav.goBack()}}>
                        <Image  source= {require('../../assets/back.png')} style={styles.menyuStyle} />
                    </TouchableOpacity>
                    
                <Text style={styles.headerText}>{this.props.name}</Text>
                </View>
                {/* <View style={styles.searchStyle}> 
                <Image source={require('../../assets/eye-cross.png')} style={styles.serachImage} />
                <TextInput placeholder="Search Here"/>

                </View> */}
            </View>
        )
    }
}


const styles  = StyleSheet.create({

    blueBoxes:{
        width:"100%",
        height:100,
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
        marginTop:30,

    

    },
    menyuStyle:{
        width:30,
        height:30,
        marginTop:4
        
    },
    headerText:{
        fontWeight:"bold",
        fontSize:20,
        color:"white",
        marginTop:5,
        marginLeft:30
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