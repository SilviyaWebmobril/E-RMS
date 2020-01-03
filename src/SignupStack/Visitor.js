import React , { Component} from 'react';
import {View ,Text, ScrollView, Image, StyleSheet,Dimensions,ActivityIndicator} from 'react-native';
import {CustomTextInput} from '../CustomUI/CustomTextInput';
import CustomButton from '../CustomUI/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../Utility/Colors'
import DatePicker from 'react-native-datepicker'
import {CheckBox} from 'react-native-elements';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import CustomAlert from '../CustomUI/CustomAlert';
import { TouchableOpacity } from 'react-native-gesture-handler';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export  default class Vistor extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Visitor",
       
      });


    constructor(props){
        super(props);
        this.state ={
            isSec :true,
            date: new Date(),
            checked:false,
            loadingvisible:false,
            visible:false,
            errorDesp:"",
            errorHeading:"",
            currentDate:new Date(),
            errorStatus:false
        }
    }

    formatDate =(date)=>{

        var newmonth;
        console.log("month",date);
        var new_date =  new Date(date);
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
       
        if(month <10){
            newmonth = "0"+month;
        }else{
            newmonth = month;
        }
        console.log("date",year+"-"+newmonth+"-"+day);
        return year+"-"+newmonth+"-"+day;

    }

    submitHandler = () =>{

        if(this.refs.name.getInputTextValue('name') == "blank"){

            this.setState({visible:true});
            this.setState({errorDesp:'Please enter name.'});
            this.setState({errorHeading:'Visitor'});

            return;

        }

        if(this.refs.name.getInputTextValue('name') == "invalid"){

            this.setState({visible:true});
            this.setState({errorDesp:'Please enter valid name.'});
            this.setState({errorHeading:'Visitor'});

            return;

        }

        if(this.refs.company.getInputTextValue('name') == "blank"){

            this.setState({visible:true});
            this.setState({errorDesp:'Please enter company name.'});
            this.setState({errorHeading:'Visitor'});

            return;

        }

        if(this.refs.company.getInputTextValue('name') == "invalid"){

            this.setState({visible:true});
            this.setState({errorDesp:'Please enter company name.'});
            this.setState({errorHeading:'Visitor'});

            return;

        }


        if(this.refs.email.getInputTextValue('email') == "blank" ){

            this.setState({visible:true});
            this.setState({errorDesp:'Please enter email.'});
            this.setState({errorHeading:'Visitor'});

            return;

        }


        if(this.refs.email.getInputTextValue('email') == "invalid" ){

            this.setState({visible:true});
            this.setState({errorDesp:'Please enter valid email.'});
            this.setState({errorHeading:'Visitor'});

            return;

        }

      
        if( this.refs.mobile.getInputTextValue('mobile') == "invalid"){

            this.setState({visible:true});
            this.setState({errorDesp:'Please enter valid mobile number.'});
            this.setState({errorHeading:'Visitor'});

            return;
        }

        if(this.state.checked){

            if(this.refs.email.getInputTextValue('email') !== "invalid" 
            || this.refs.name.getInputTextValue('name') !== "invalid"
            || this.refs.company.getInputTextValue('name') !== "invalid"
            || this.refs.mobile.getInputTextValue('mobile') !== "invalid"){
   
               this.setState({loadingvisible:true});
   
               let formdata = new FormData();
               formdata.append("name",this.refs.name.getInputTextValue('name'));
               formdata.append("company",this.refs.company.getInputTextValue('name'));
               formdata.append("date",this.state.date);
               formdata.append("email",this.refs.email.getInputTextValue('email'));
               formdata.append("phone",this.refs.mobile.getInputTextValue('mobile'));
               console.log("formdata",formdata);
   
   
               Axios.post(ApiUrl.base_url+ApiUrl.visitor_request, formdata).then(response => {
   
                   console.log("response ", response);
                   this.setState({loadingvisible:false});
   
   
                   if(response.data.status){
   
                        this.setState({visible:true});
                        this.setState({errorStatus:true})
                        this.setState({errorDesp:'Something went wrong please try again later!'});
                        this.setState({errorHeading:'Visitor'});
   
                   }else{
   
                    
                       this.setState({visible:true});
                       this.setState({errorStatus:false})
                       this.setState({errorDesp:`${response.data.message}`});
                       this.setState({errorHeading:'Visitor Sign In'});
                       
                   }
   
   
               }).catch(error => {
                this.setState({errorStatus:false})
                   this.setState({loadingvisible:false});
                   this.setState({visible:true});
                   this.setState({errorDesp:"Check your network connection"});
                   this.setState({errorHeading:'Network Connection'});
                  
   
   
               })
   
   
   
   
   
   
   
   
           }else{
   
                this.setState({visible:true});
                this.setState({errorDesp:'All fields are mandatory!'});
                this.setState({errorHeading:'Visitor'});
              
           }

        }else{

          
            this.setState({visible:true});
            this.setState({errorDesp:'Please accept Gmp And Allgerian Policies.'});
            this.setState({errorHeading:'Visitor'});
          

        }

       

    }






    render(){
        return(
            <View style={{flex:1}}>

            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Image source={require('../../assets/logo_small.png')} resizeMode="contain" style={styles.ermslogo} />
                    <Text style={styles.textStyle}>Visitor / Contractor</Text>


                        <CustomTextInput 
                        ref="name"   
                       
                        field_text={{marginBottom:10}}
                        placeholder="Enter Name"
                        text="Name"
                        inputType="name"
                        error_text="Please enter valid name"
                        />  
                        <CustomTextInput 
                        ref="company"
                        placeholder="Enter Company"
                        text="Company"
                        field_text={{marginBottom:10}}
                        inputType="name"
                        error_text="Please enter company name"
                        />

                        {/* <CustomTextInput 
                        ref="name"   
                        placeholder="Enter Date"
                        text="Date"
                        inputType="name"
                        error_text="Please Enter Valid Date"
                        /> */}

                        <DatePicker
                            style={{width: "90%",marginLeft:20,marginRight:20}}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={this.state.currentDate}
                            //maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                               
                                marginLeft: 0,
                                marginTop:40,
                                marginBottom:40,
                            },
                            dateInput: {
                                marginLeft: 36,
                                marginTop:20,
                                marginBottom:20,
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                        <CustomTextInput 
                        ref="email"
                        field_text={{marginBottom:10}}
                        placeholder="Enter Email"
                        text="E-Mail Address"
                        error_text="Please enter valid email"
                        inputType="email"
                        
                        />

                        <CustomTextInput 
                        ref="mobile"   
                        field_text={{marginBottom:10}}
                        placeholder="Enter Phone"
                        text="Telephone"
                       
                        inputType="mobile"
                        error_text="Please enter valid phone"
                        />

                        <View style={{flexDirection:"row", flex:1,}}>
                            <CheckBox
                                checked={this.state.checked}
                                onPress={()=>{this.setState({checked:!this.state.checked})}}
                                containerStyle={{backgroundColor:'transparent',borderColor:"transparent",margin:0,flex:0.2}} 
                                />
                                <View style={{flexDirection:"row",marginTop:12,}}>
                                    <Text style={{fontSize:13, color:"grey",fontWeight:"bold",}}> I have read the </Text>
                                    <TouchableOpacity 
                                    //onPress={()=>{this.props.navigation.navigate("GmpPolicies")}}
                                    >
                                        <Text numberOfLines={2} style={{color:Colors.blue_btn,fontSize:13, fontWeight:"bold",}}>{` GMP and Allgerian Policies`} </Text>
                                    </TouchableOpacity>
                                </View>
                               
                        </View>
                         

                    
                        <CustomButton text="Submit" onPressHandler={()=>{this.submitHandler()}} btn_style={{height:40}} view_button={{backgroundColor:Colors.blue_btn,borderColor:Colors.blue_btn,}}/>

                </View>
            </KeyboardAwareScrollView>
            {this.state.loadingvisible && (
                   <View
                    style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
                    ]}
                    >
                        <ActivityIndicator size="large" />
                    </View>
                )}

                {this.state.visible 
                ?
                    <CustomAlert isVisible={this.state.visible} 
                        errorHeading={this.state.errorHeading}
                        errorDescription={this.state.errorDesp}
                        cancelVisible={false} 
                        onOKPress={()=>{
                            this.setState({visible:false});
                            if(this.state.errorStatus){
                                return;
                            }
                            this.props.navigation.goBack();
                        }} />
                    :
                    <View/>
                }


            </View>
           
        )
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"white",
        marginBottom:40


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