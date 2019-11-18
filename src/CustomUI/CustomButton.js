import React ,{Component} from 'react';
import {View ,StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../Utility/Colors';

export default class CustomButton extends Component {

    render(){
        return(
           
                <View style={{flex:1}}>
                    <TouchableOpacity
                        onPress ={this.props.onPressHandler}
                        style={[styles.btnStyle, this.props.btn_style]}>
                        <View style={[styles.viewButon,this.props.view_button]}>
                            <Text style={[styles.btnText,this.props.btn_text]}>{this.props.text}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
             

        );
    }
}

const styles = StyleSheet.create({

  
    btnStyle:{
        width:"80%",
        height:"30%",
        alignSelf:"center",
        marginBottom:10,
        marginTop:10,
        justifyContent:"center"
    },
    viewButon:{
        backgroundColor:Colors.yellow_theme,
        borderRadius:20,
        borderWidth:1,
        borderColor:Colors.yellow_theme,
        padding:10

    },
    btnText:{
        color:"white",
        fontSize:15,
        fontWeight:"bold",
        alignSelf:"center"
    }
})