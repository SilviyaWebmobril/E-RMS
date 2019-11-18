import React ,{Component }  from 'react';
import {View ,Text, Image ,ScrollView,ActivityIndicator,ImageBackground,StyleSheet,Dimensions} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../CustomUI/CustomButton';
import { CustomTextInput } from '../CustomUI/CustomTextInput';
import Colors from '../Utility/Colors';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



export default class SignUp extends Component{ 

    constructor(props){
        super(props);
        this.state ={
            isSec :true,
            loading:false
        }
    }
    componentDidMount(){
        console.log("hbkjkm");
    }


    visitorHandler = () =>{

        this.props.navigation.navigate('Visitor');
    }

    signInHandler = () =>{
        this.props.navigation.navigate('HomeDrawer')
    }


    render(){
        console.log("on renser")
        return(
                      
            <ImageBackground style={styles.imageBck} source={require('../../assets/splash3.png')}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}> 
                    <View style={styles.box}>
                        <View style={{flex:1}}>
                        <Image source={require('../../assets/logo_small.png')} resizeMode="contain" style={styles.ermslogo} />
                        <Text style={styles.signInText}>Sign In</Text>

                        <CustomTextInput 
                            ref="name"   
                            image_style={{width:30,height:30,marginTop:10,marginRight:5}} 
                            placeholder="Enter Username"
                            text="Username"
                            inputType="name"
                            error_text="Please Enter Valid Username"
                            />
                            <CustomTextInput 
                            ref="password"
                            placeholder="Enter Password"
                            text="PASSWORD"
                            inputType="password"
                            isPassword={true}
                            changeSecureText={()=> this.changeSecureText} // calling child function directly without ref in component
                            error_text="Password must be greater than 6"
                            />

                            <Text style={{alignSelf:'flex-end',marginRight:20,fontWeight:"bold",color:"red",marginBottom:20}}>Forgot Password ?</Text>
                        
                            <CustomButton text=" Sign In " onPressHandler={()=>{this.signInHandler()}} view_button={{backgroundColor:Colors.blue_btn,borderColor:Colors.blue_btn}} btn_style={{height:40}}/>
                            <CustomButton text=" Visitor/ Contractor Sign In " onPressHandler={()=>{ this.visitorHandler()}} view_button={{backgroundColor:Colors.black_btn,borderColor:Colors.black_btn,marginTop:0, height:40}} btn_style={{height:40}}/>
               
               
                     
                        </View>
                        
                    </View>
                </KeyboardAwareScrollView>
        </ImageBackground>

        )
    }
}

const styles = StyleSheet.create({

    imageBck:{
       // flex:1,
        position: 'absolute',
        resizeMode: 'contain',
        width:width,
        height:height,
        alignItems:'center',
        justifyContent:'center'
       
    },
    ermslogo:{
        margin:20  ,
        alignSelf:"center"
    },
    signInText:{
        alignSelf:"center",
        fontSize:20,
        fontWeight:"bold",
       
    },
    box:{
       // flex:1,
        height:height-100,
        width:width * 0.9, 
        marginTop:60,
        marginBottom:40,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"white",
        borderRadius:3,
        shadowColor:"black",
        elevation:10,
        shadowRadius:3,
        shadowOpacity:3
   }
})