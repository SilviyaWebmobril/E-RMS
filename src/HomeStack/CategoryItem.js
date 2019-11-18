import React ,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Colors from '../Utility/Colors';


export default class CategoryItem extends Component {

    render(){
        return(
            <View style={styles.blueBoxes}>
                <Text style={styles.textStyle}>{this.props.data.value}</Text>
                
            </View>
        )
    }
}

const styles  = StyleSheet.create({

    blueBoxes:{
        width:160,
        height:80,
        justifyContent:"center",
        paddingLeft:20,
        paddingRight:20,
        marginLeft:20,
        marginRight:20,
        alignItems:"center",
        backgroundColor:Colors.blue_btn,
        borderColor:"#ececec",
        borderWidth:1,
        borderRadius:0
    },
    textStyle :{
        fontWeight:"normal",
       
        fontSize:15,
        color:"white",
        alignSelf:"center",
        textAlign:'center'
    }
})