import React ,{Component} from 'react';
import {View ,Text, StyleSheet, Dimensions,Modal,Image,TouchableOpacity} from 'react-native';
import { CustomTextInput } from '../CustomUI/CustomTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'

export default class EditCorrectiveActionLog extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentDate:new Date(),
        }
    }

    render() {
        return (
            
                  
            <KeyboardAwareScrollView>

                <View style={{flex:1,borderColor:'#808080',borderRadius:6,borderWidth:1,margin:20,backgroundColor:"white"}}>
                    <View style={{flexDirection:"row",margin:20,justifyContent:"space-between"}}>
                    <Text style={{fontSize:17, color:"grey",fontWeight:"bold",alignSelf:"center"}}>{this.props.log_title}</Text>
                    <TouchableOpacity onPress={()=>{this.props.dismissPopup()}}>
                        <Image source={require('../../assets/close.png')} style={{width:25,height:25}} />
                    </TouchableOpacity>
                    
                    </View>
                   
                        <View style={{width:"100%",height:1,backgroundColor:"grey",marginBottom:20}}></View>
                        <Text style={{fontSize:15, color:"grey",fontWeight:"bold",marginLeft:20,marginBottom:10}}>Date :</Text>
                        <DatePicker
                            style={{width: "80%",marginLeft:20,marginRight:20,marginBottom:20}}
                            date={this.props.log_date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={this.state.log_date}
                            disabled={true}
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
                            ref="lot"
                            field_text={{marginBottom:10}}
                            placeholder="Enter Lot No."
                            text="Lot No."
                            defaultValue={this.props.lot_no}
                            error_text="Please enter valid Lot No."
                            inputType="name"
                            editable={false}
                            
                            />

                                    
                        <CustomTextInput 
                        ref="issue"
                        field_text={{marginBottom:10}}
                        placeholder="Enter Issue"
                        text="Issue :"
                        defaultValue={this.props.issue}
                        error_text="Please enter valid Issue"
                        inputType="name"
                        editable={false}
                        />
                        <CustomTextInput 
                        ref="resolution"
                        field_text={{marginBottom:10}}
                        placeholder="Enter Resolution"
                        text="Resolution :"
                        defaultValue={this.props.resolution}
                        error_text="Please enter valid Resolution"
                        inputType="name"
                        editable={false}
                        />
                        <CustomTextInput 
                        ref="lot"
                        field_text={{marginBottom:10}}
                        placeholder="Enter Preventive Measure"
                        text="Preventive Measure : "
                        defaultValue={this.props.preventive_measure}
                        error_text="Please enter valid Preventive Measure"
                        inputType="name"
                        editable={false}
                        />


                </View>
                                        

            </KeyboardAwareScrollView>
            
                  
        )
    }
}


const styles = StyleSheet.create({
    
    container :{
        width:Dimensions.get('window').width * 0.8,
        height:Dimensions.get('window').height * 0.8,
        padding:10,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        

    }
})