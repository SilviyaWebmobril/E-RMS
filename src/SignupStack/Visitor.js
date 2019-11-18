import React , { Component} from 'react';
import {View ,Text, ScrollView, Image, StyleSheet,Dimensions} from 'react-native';
import {CustomTextInput} from '../CustomUI/CustomTextInput';
import CustomButton from '../CustomUI/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../Utility/Colors'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export  default class Vistor extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Visitor",
       
      });


    constructor(props){
        super(props);
        this.state ={
            isSec :true
        }
    }

    render(){
        return(
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Image source={require('../../assets/logo_small.png')} resizeMode="contain" style={styles.ermslogo} />
                    <Text style={styles.textStyle}>Visitor / Contractor</Text>


                        <CustomTextInput 
                        ref="name"   
                        image_style={{width:30,height:30,marginTop:10,marginRight:5}} 
                        placeholder="Enter Name"
                        text="Name"
                        inputType="name"
                        error_text="Please Enter Valid Email"
                        />
                        <CustomTextInput 
                        ref="company"
                        placeholder="Enter Company"
                        text="Company"
                        inputType="name"
                        error_text="Please Enter Company Name"
                        />

                        <CustomTextInput 
                        ref="name"   
                        placeholder="Enter Date"
                        text="Date"
                        inputType="name"
                        error_text="Please Enter Valid Date"
                        />
                        <CustomTextInput 
                        ref="email"
                        placeholder="Enter Email"
                        text="E-Mail Address"
                        error_text="Please Enter Valid Email"
                        inputType="email"
                        
                        />

                        <CustomTextInput 
                        ref="phone"   
                        image_style={{width:30,height:30,marginTop:10,marginRight:5}} 
                        placeholder="Enter Phone"
                        text="Telephone"
                        inputType="name"
                        error_text="Please Enter Valid Phone"
                        />
                        
                    
                        <CustomButton text="Sign In" onPressHandler={()=>{ this.submitEmail()}} btn_style={{height:40}} view_button={{backgroundColor:Colors.blue_btn,borderColor:Colors.blue_btn}}/>

                </View>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"white",


    },
    ermslogo:{
       marginTop:40,
       marginBottom:20,
       alignSelf:"center"

    },
    textStyle:{
        fontWeight:"bold",
        fontSize:25,
        alignSelf:"center"
    }
})