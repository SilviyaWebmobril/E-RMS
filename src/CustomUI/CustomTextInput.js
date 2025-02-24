import React ,{Component} from 'react';
import {StyleSheet, View ,TextInput, Image, Text,TouchableOpacity} from 'react-native';
import validate from '../validation/validation';

export class CustomTextInput extends Component {


    constructor(props){
        super(props);
        this.state = {
            isFocused:false,
            isSecure:this.props.isPassword,
            inputTextValue:"",
            errorState:true,
            errorMsg:"",
            controls:{
                name:{
                    value: "",
                    valid:false,
                    validationRules:{
                        isText:true,
                    }
                },
                email:{
                    value: "",
                    valid:false,
                    validationRules:{
                        isEmail:true,
                    }
                },
                password:{
                    value: "",
                    valid:false,
                    validationRules:{
                        minLength:6,
                    }
                },
                confirm_password:{
                    value: "",
                    valid:false,
                    validationRules:{
                        minLength:6,
                    }
                },
                subject:{
                    value:"",
                    valid:false,
                    validationRules:{
                        isText:true
                    }
                },
                message:{
                    value:"",
                    valid:false,
                    validationRules:{
                        isText:true
                    }
                },
                mobile:{
                    value: "",
                    valid:false,
                    validationRules:{
                        isMobile:10,
                    }
                },
            }
        }
    }


    setTextInputValue = (value,type) => {

        
        this.setState({inputTextValue : value})   // saving the input value to some text
     
        this.setState(prevState => ({
                ...prevState, // get all the prevstate
                controls:{
                    ...prevState.controls, // since conytrols is object so  get all prevState contols
                    [type] : {
                        ...prevState.controls[type],   //  controls having key so get all controls key
                        value:value ,
                        valid: validate(value , prevState.controls[type].validationRules)
                    }
                
                }
            
        }), () => {

            if(type == "name"){

                if(this.state.controls.name.value == ""){

                    this.setState({errorState:true})

                }else if(!this.state.controls.name.valid){
                  
                    this.setState({errorState:false})
                   
                }else{
                    this.setState({errorState:true})
                }
                
            }else if(type == "email"){

                if(this.state.controls.email.value == ""){
                   
                    this.setState({errorState:true});
                }
                else if(!this.state.controls.email.valid){

                    this.setState({errorState:false});
                    
                }else {
                    this.setState({errorState:true});
                }

            }else if(type == 'password'){

                if(this.state.controls.password.value  == ""){

                    this.setState({errorState:true});

                }else if(!this.state.controls.password.valid){

                    this.setState({errorState:false});
                   
                }else{
                    this.setState({errorState:true});
                }
            }else if(type == 'confirm_password'){

                if(this.state.controls.confirm_password.value == ""){

                    this.setState({errorState:true});

                }else if(!this.state.controls.confirm_password.valid){

                    this.setState({errorState:false});
                   
                }else{
                    this.setState({errorState:true});
                }

            }else if(type == 'mobile'){

                if(this.state.controls.mobile.value == ""){

                    this.setState({errorState:true});

                }else if(!this.state.controls.mobile.valid){

                    this.setState({errorState:false});
                   
                }else{
                    this.setState({errorState:true});
                }

            }


        });


     
        

    }

   
    // this function reurns the final value  after validation to Parent component
    getInputTextValue = (type)=> {

     
            if(type == "name"){

                if(this.state.controls.name.value == ""){
                    return "blank";
                }else if( this.state.controls.name.valid){
                    return this.state.controls.name.value;
                }else{
                    return "invalid";
                }
            
            }else if(type == "email"){

                if(this.state.controls.email.value == ""){
                    return "blank";
                }else if(this.state.controls.email.valid){
                    return this.state.controls.email.value;
                }else{
                    return "invalid";
                }
               
    
            }else if(type == "password"){

                if(this.state.controls.password.value == ""){
                    
                    return "blank";
                }else if(this.state.controls.password.valid){


                    return this.state.controls.password.value;
                }else{
                    return "invalid";
                }
               
               
    
            }else if(type == "confirm_password"){

                if(this.state.controls.confirm_password.value == ""){
                    
                    return "blank";
                }else if(this.state.controls.confirm_password.valid){
                    return this.state.controls.confirm_password.value;
                }else{
                    return "invalid";
                }
               
    
            }else if(type == "subject"){

                if(this.state.controls.subject.valid){
                    return this.state.controls.subject.value;
                }else{
                    return "invalid";
                }
               
    
            }else if(type == "message"){

                if(this.state.controls.message.valid){
                    return this.state.controls.message.value;
                }else{
                    return "invalid";
                }
               
    
            }else if(type == "mobile"){

                if(this.state.controls.mobile.value == ""){
                    return "blank";
                }else if(this.state.controls.mobile.valid){
                    return this.state.controls.mobile.value;
                }else{
                    return "invalid";
                }
               
    
            }

        

        
      
    }

    resetTextInput =  (type) => {

        console.log("reset text input",type);
    
        this.setState({inputTextValue : ""})   // saving the input value to some text
    
        this.setState({errorState:true});
        this.setState(prevState => ({
            ...prevState, // get all the prevstate
            controls:{
                ...prevState.controls, // since conytrols is object so  get all prevState contols
                [type] : {
                    ...prevState.controls[type],   //  controls having key so get all controls key
                    value:"" ,
                    valid: false
                }
            
            }
        
        })); 
    
    
      }

    setText = (value)=>{
        
        this.setState({inputTextValue : value})
    } 

    changeSecureText = () => {
       
        this.setState({isSecure:!this.state.isSecure})
    }

    render(){

        console.log("def",this.props.defaultValue == "" ? this.state.inputTextValue : this.props.defaultValue); 
      
        return(
            <View style={styles.container}>
                <View style={{flexDirection:"column"}}>
                    <Text style={[styles.fieldText,this.props.field_text]}>{this.props.text}</Text>
                    <View style={styles.viewRow}>
                       
                        <TextInput 
                            style={[styles.textInputWidth,this.props.text_input_width]}
                            secureTextEntry={this.props.isPassword ? this.state.isSecure : false}
                            placeholder={this.props.placeholder}
                            onChangeText={(value)=> this.setTextInputValue(value,this.props.inputType )}
                            value={this.props.defaultValue == "" || this.props.defaultValue  == undefined  ? this.state.inputTextValue : this.props.defaultValue}
                            returnKeyType={this.props.returnKeyType}
                            multiline={this.props.multiline}
                            editable={this.props.editable}
                            numberOfLines={this.props.numberOfLines}
                            />
                        {this.state.isSecure
                        ?
                        <TouchableOpacity
                            onPress={this.changeSecureText}>
                              <Image source={require('../../assets/eye-cross.png')} style={styles.image_secure} />
                        </TouchableOpacity>
                      
                        :
                        (this.props.isPassword
                            ?
                            <TouchableOpacity
                            onPress={this.changeSecureText}>
                              <Image source={require('../../assets/view.png')} style={styles.image_secure} />
                            </TouchableOpacity>
                            :

                            <View/>
                        )
                       
                  
                        }
                        
                    </View>
                    {
                        !this.state.errorState 
                        ?
                        <Text style={[styles.errorTextStyle,this.props.errorStyle]}>{this.props.error_text}</Text>
                        :
                        <View/>
                    }
                    <View style={[styles.viewLine,this.props.view_line]}></View>

                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container:{
       
        margin:20
        
    },
    fieldText :{
        fontSize:15,
        color:"grey",
        marginLeft:0,
        fontWeight:"bold"

    },
    viewRow:{
        flexDirection:"row",

    },
  
    image_secure:{
        marginTop:10,
        width:20,
        height:20
    },
    errorTextStyle:{
        fontSize:10,
        color:"red",
       
    },
    textInputWidth:{
        width:"90%"
    },
    viewLine:{
        width:"100%",backgroundColor:"grey",height:1,marginTop:5
    }

})