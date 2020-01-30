import React , { Component} from 'react';
import {View ,Text, ScrollView, Image, StyleSheet,Dimensions,ActivityIndicator,Alert} from 'react-native';
import {CustomTextInput} from '../CustomUI/CustomTextInput';
import CustomButton from '../CustomUI/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../Utility/Colors'
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import CustomAlert from '../CustomUI/CustomAlert';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export  default class Vistor extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Forgot Password",
       
      });


    constructor(props){
        super(props);
        this.state ={
            isSec :true,
            loading:false,
            responseError:true,
            visible:false,
            errorDesp:"",
            errorHeading:""
        }
    }

    forgotPassword = () =>{

        if(this.refs.email.getInputTextValue('name') == 'blank'){

            this.setState({visible:true});
            this.setState({errorDesp:"Please enter username."});
            this.setState({errorHeading:'Forgot Password'});

            return;
        }

        if(this.refs.email.getInputTextValue('name') == 'invalid'){

            this.setState({visible:true});
            this.setState({errorDesp:"Please enter valid name"});
            this.setState({errorHeading:'Forgot Password'});

            return;
        }

        let  formdata = new FormData();
        this.setState({loading:true});
        formdata.append("username",this.refs.email.getInputTextValue('name'))

        if(this.refs.email.getInputTextValue('name') !== "invalid"){

            Axios.post(ApiUrl.base_url+ApiUrl.forget_password,formdata).then(response=>{
                this.setState({loading:false});
                console.log("response",response.data);
                
                if(!response.data.error){

                        this.setState({responseError:false})
                        this.setState({visible:true});
                        this.setState({errorDesp:`${response.data.message}`});
                        this.setState({errorHeading:'Forgot Password'});

                        
                }else{
                    this.setState({responseError:true})
                    this.setState({visible:true});
                    this.setState({errorDesp:'Something went wrong ! Please try again later.'});
                    this.setState({errorHeading:'Forgot Password'});

                }
    
    
            }).catch(error =>{
                this.setState({responseError:true})
                this.setState({loading:false});
                this.setState({visible:true});
                this.setState({errorDesp:"Check your network connection and try again later!"});
                this.setState({errorHeading:'Forgot Password'});
            
            })

        }else{
            this.setState({loading:false});
            this.setState({responseError:true})
            this.setState({visible:true});
            this.setState({errorDesp:"Please enter valid email"});
            this.setState({errorHeading:'Forgot Password'});
        
        }
     

    }

    render(){

        return(
            <View style={styles.container1}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Image source={require('../../assets/logo_small.png')} resizeMode="contain" style={styles.ermslogo} />
                    <Text style={styles.textStyle}>Forgot Password</Text>


                      
                    <CustomTextInput 
                            ref="email"   
                            field_text={{marginBottom:5}}
                            placeholder="Enter Username"
                            text="Username"
                            inputType="name"
                            error_text="Please enter valid username."
                            />
                    
                        <CustomButton text="Submit" onPressHandler={()=> this.forgotPassword()} btn_style={{height:40}} view_button={{backgroundColor:Colors.blue_btn,borderColor:Colors.blue_btn,}}/>

                </View>
               
                </KeyboardAwareScrollView>
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
                        onOKPress={()=>{this.setState({visible:false}); 
                        if(!this.state.responseError) 
                         this.props.navigation.goBack() 
                        }} />
                    :
                    <View/>
                }

            </View>
           
        )
    }
}

const styles = StyleSheet.create({

    container1:{
        flex:1,
        backgroundColor:"white",
       
    },

    container:{
        flex:1,
        backgroundColor:"white",
       margin:20
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