import React ,{ Component } from 'react';
import { View ,Text , StyleSheet ,ActivityIndicator} from 'react-native';
import {CustomTextInput}  from '../CustomUI/CustomTextInput';
import  CustomButton  from '../CustomUI/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../Utility/Colors';
import CustomHeaderDepartment from '../CustomUI/CustomHeaderDepartment';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import CustomAlert  from '../CustomUI/CustomAlert';
import AsyncStorage from '@react-native-community/async-storage';


export default class ChangePassword  extends Component {

    // static navigationOptions = ({ navigation, screenProps }) => {
    //     const { params = {} } = navigation.state;
    //       return{
    //         header: () => <CustomHeaderDepartment name="Change Password" nav={navigation} />
    //       }
      
    //   };



    state ={
        loading:false,
        visible:false,
        errorHeading:"",
        errorDesp:""
    }


    submitHandler = async() =>{

        if(this.refs.old_password.getInputTextValue('password') == "blank"){

            this.setState({visible:true});
            this.setState({errorDesp:'Please enter old password.'});
            this.setState({errorHeading:'SignUp'});
            return;
        }


        if(this.refs.old_password.getInputTextValue('password') == 'invalid'){

            this.setState({visible:true});
            this.setState({errorHeading:"Change Password"});
            this.setState({errorDesp:"Old Password must be of minimum 6 characters."});

            return;
        }

        if(this.refs.new_password.getInputTextValue('password') == 'blank'){

            this.setState({visible:true});
            this.setState({errorHeading:"Change Password"});
            this.setState({errorDesp:"New password must not be blank."});

            return;
        }


        if(this.refs.new_password.getInputTextValue('password') == 'invalid'){

            this.setState({visible:true});
            this.setState({errorHeading:"Change Password"});
            this.setState({errorDesp:"New Password must be of minimum 6 characters."});

            return;
        }

        if(this.refs.confirm_password.getInputTextValue('password') == 'blank'){

            this.setState({visible:true});
            this.setState({errorHeading:"Change Password"});
            this.setState({errorDesp:"Confirm Password must not be blank."});

            return;
        }

        if(this.refs.confirm_password.getInputTextValue('password') == 'invalid'){

            this.setState({visible:true});
            this.setState({errorHeading:"Change Password"});
            this.setState({errorDesp:"Confirm Password must be of minimum 6 characters."});

            return;
        }

        this.setState({loading:true})
        let user_id  = await AsyncStorage.getItem('id');
        let formdata  = new FormData();
        formdata.append("id",JSON.parse(user_id));
        formdata.append("old_password",this.refs.old_password.getInputTextValue('password'));
        formdata.append("new_password",this.refs.new_password.getInputTextValue('password'));
        formdata.append("confirm_password",this.refs.confirm_password.getInputTextValue('password'))

        Axios.post(ApiUrl.base_url + ApiUrl.change_password,formdata).then(response =>{
            this.setState({loading:false})
           
            if(!response.data.status){

                this.refs.old_password.resetTextInput('password');
                this.refs.new_password.resetTextInput('password');
                this.refs.confirm_password.resetTextInput('password');

            }
                this.setState({visible:true});
                this.setState({errorHeading:"Change Password"});
                this.setState({errorDesp:`${response.data.message}`});
           

        }).catch(error =>{
            this.setState({loading:true})
            this.setState({visible:true});
            this.setState({errorHeading:"Change Password"});
            this.setState({errorDesp:"Something went wrong .Please try again later!"});


        })

    }




    render(){
        return(
            <View style ={{ flex:1 }}>
                <KeyboardAwareScrollView>
                    <View style={{flex:1}}>

                        <CustomTextInput 
                            ref="old_password"
                            placeholder="Enter Old Password"
                            text="OLD PASSWORD"
                            inputType="password"
                            isPassword={true}
                            changeSecureText={()=> this.changeSecureText} // calling child function directly without ref in component
                            error_text="Old Password must be of minimum 6 characters"
                            />

                        <CustomTextInput 
                            ref="new_password"
                            placeholder="Enter New Password"
                            text="NEW PASSWORD"
                            inputType="password"
                            isPassword={true}
                            changeSecureText={()=> this.changeSecureText} // calling child function directly without ref in component
                            error_text="New Password must be of minimum 6 characters"
                            />

                        <CustomTextInput 
                            ref="confirm_password"
                            placeholder="Enter Confirm Password"
                            text="CONFIRM PASSWORD"
                            inputType="password"
                            isPassword={true}
                            changeSecureText={()=> this.changeSecureText} // calling child function directly without ref in component
                            error_text="Confirm Password must be of minimum 6 characters"
                            />
                           
                            <CustomButton text=" Submit " onPressHandler={()=>{this.submitHandler()}} view_button={{backgroundColor:Colors.blue_btn,borderColor:Colors.blue_btn}} btn_style={{height:40}}/>

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
                        onOKPress={()=>{this.setState({visible:false})}} />
                    :
                    <View/>
                }

            </View>
        )
    }
}
