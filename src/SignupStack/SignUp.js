import React ,{Component }  from 'react';
import {View ,Text, Image ,ScrollView,ActivityIndicator,ImageBackground,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../CustomUI/CustomButton';
import { CustomTextInput } from '../CustomUI/CustomTextInput';
import Colors from '../Utility/Colors';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';
import CustomAlert from '../CustomUI/CustomAlert';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



export default class SignUp extends Component{ 

    constructor(props){
        super(props);
        this.state ={
            isSec :true,
            loading:false,
            visible:false,
            errorDesp:"",
            errorHeading:""
        }
    }
    
    visitorHandler = () =>{

        this.props.navigation.navigate('Visitor');
    }

    signInHandler = () =>{

        if(this.refs.email.getInputTextValue('name') == "blank"){

            this.setState({visible:true});
            this.setState({errorDesp:'Please enter valid username.'});
            this.setState({errorHeading:'SignIn'});
            return;

        }

        if(this.refs.email.getInputTextValue('name') == "invalid"){

            this.setState({visible:true});
            this.setState({errorDesp:'Please enter valid username.'});
            this.setState({errorHeading:'SignIn'});
            return;

        }


        if(this.refs.password.getInputTextValue('password') == "blank"){

            this.setState({visible:true});
            this.setState({errorDesp:'Please enter password.'});
            this.setState({errorHeading:'SignIn'});
            return;
        }

        if(this.refs.password.getInputTextValue('password') == "invalid"){

            this.setState({visible:true});
            this.setState({errorDesp:'Please enter valid password.'});
            this.setState({errorHeading:'SignIn'});
            return;
        }

        if(this.refs.password.getInputTextValue('password') !== "invalid"){
            this.setState({loading:true})
            let formdata  = new FormData();
            formdata.append("username",this.refs.email.getInputTextValue('name'));
            formdata.append("password",this.refs.password.getInputTextValue('password'));
            Axios.post(ApiUrl.base_url+ ApiUrl.login,formdata).then(response => {

              console.log("response....",response.data.result);

                this.setState({loading:false})

                if(response.data.error){
                   
                    this.setState({visible:true});
                    this.setState({errorDesp:`${response.data.message}`});
                    this.setState({errorHeading:'SignIn'});
                }else{

                    
                    AsyncStorage.setItem('id',response.data.result.id.toString());
                    AsyncStorage.setItem('roles_id',response.data.result.roles_id.toString());
                    AsyncStorage.setItem('email',response.data.result.email)
                    AsyncStorage.setItem('username',response.data.result.username);

                    this.props.navigation.navigate('HomeDrawer')
                }
               

            }).catch(error => {
                this.setState({loading:false})
                this.setState({visible:true});
                this.setState({errorDesp:'Something went wrong! Please try again later'});
                this.setState({errorHeading:'SignIn'});
                
               
            })
        }else{  
            
            this.setState({visible:true});
            this.setState({errorDesp:'Please enter email and password'});
            this.setState({errorHeading:'SignIn'});
            
        }
        
       
    }

    forgetPassword = async() => {


        this.props.navigation.navigate('ForgetPassword');
      
    
    }


    render(){
       
        return(
                      
            <ImageBackground style={styles.imageBck} source={require('../../assets/splash3.png')}>
                {/* <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>  */}
                    <View style={styles.box}>
                        <View style={{flex:1}}>
                        <Image source={require('../../assets/logo_small.png')} resizeMode="contain" style={styles.ermslogo} />
                        <Text style={styles.signInText}>Sign In</Text>

                        <CustomTextInput 
                            ref="email"   
                            field_text={{marginBottom:5}}
                            placeholder="Enter Username"
                            text="Username"
                            inputType="name"
                            error_text="Please enter valid username."
                            />
                            <CustomTextInput 
                            ref="password"
                           
                            placeholder="Enter Password"
                            text="Password"
                            inputType="password"
                            isPassword={true}
                            changeSecureText={()=> this.changeSecureText} // calling child function directly without ref in component
                            error_text="Password must be of minimum 6 characters"
                            />
                            <TouchableOpacity onPress={()=>this.forgetPassword()}>
                                <Text style={{alignSelf:'flex-end',marginRight:20,fontWeight:"bold",color:"red",marginBottom:20}}>Forgot Password ?</Text>
                            </TouchableOpacity>
                           
                        
                            <CustomButton text=" Sign In " onPressHandler={()=>{this.signInHandler()}} view_button={{backgroundColor:Colors.blue_btn,borderColor:Colors.blue_btn,}} />
                            <CustomButton text=" Visitor / Contractor Sign In " onPressHandler={()=>{ this.visitorHandler()}} view_button={{backgroundColor:Colors.black_btn,borderColor:Colors.black_btn,}} />
               
               
                     
                        </View>
                        
                    </View>
                {/* </KeyboardAwareScrollView> */}
                { this.state.loading && <View
                     style={[
                       StyleSheet.absoluteFill,
                       { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
                     ]}
                    >
                     <ActivityIndicator size="large" />
                   </View>}

                   {this.state.visible 
                    ?
                    <CustomAlert isVisible={this.state.visible} 
                        errorHeading={this.state.errorHeading}
                        errorDescription={this.state.errorDesp}
                        cancelVisible={false} 
                        onOKPress={()=>{this.setState({visible:false})}} />
                    :
                    <View/>
                }
     
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
        height:height*0.75,
        width:width * 0.9, 
        marginTop:height*0.12,
        marginBottom:40,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"white",
        borderRadius:3,
        shadowColor:"black",
        elevation:10,
        shadowRadius:3,
        shadowOpacity:3,
        alignSelf:'center'
   }
})