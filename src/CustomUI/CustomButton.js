import React ,{Component} from 'react';
import {View ,StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import Colors from '../Utility/Colors';

export default class CustomButton extends Component {

    render(){
        return(
           
               
                    <TouchableOpacity
                        onPress ={this.props.onPressHandler}
                        style={[styles.btnStyle, this.props.btn_style]}>
                        <View style={[styles.viewButon,this.props.view_button]}>
                            <Text style={[styles.btnText,this.props.btn_text]}>{this.props.text}</Text>
                        </View>
                    </TouchableOpacity>
            
        );
    }
}

const styles = StyleSheet.create({

  
    btnStyle:{
        width:Dimensions.get('window').width * 0.7,
        height:Dimensions.get('window').height * 0.1,
        alignSelf:"center",
        justifyContent:"center",
       
    },
    viewButon:{
        backgroundColor:Colors.yellow_theme,
        borderRadius:20,
        borderWidth:1,
        borderColor:Colors.yellow_theme,
        
       
    },
    btnText:{
        color:"white",
        padding:10,
        fontSize:15,
        fontWeight:"bold",
        alignSelf:"center",
        textAlign:"center"
    }
})