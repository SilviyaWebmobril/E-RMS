import React ,{ Component } from 'react';
import {View ,Text, TouchableOpacity,StyleSheet,Image,Dimensions} from 'react-native';
import Modal from "react-native-modal";
import Colors from '../Utility/Colors';

const width = Dimensions.get('window').width;
const windowheight  = Dimensions.get('window').height;

export default class CustomAlert extends Component {


    render(){

        return(

            <View style={styles.container}>
                  
                <Modal isVisible={this.props.isVisible}>
               
                <View style={styles.modalContainer}>
                <Image source={require('../../assets/app-icon.png')} style={styles.imageStyle}
                 />
                     <Text style={styles.modalHeading}>{this.props.errorHeading}</Text>
                     <Text style={styles.modalDescription}>{this.props.errorDescription}</Text>
                    <View style={styles.buttonView}>
                        {this.props.cancelVisible
                        ?
                            <TouchableOpacity onPress={this.props.onCancelPress}>
                                <Text style={styles.cancelButton}>Cancel</Text>
                            </TouchableOpacity>
                        :
                            <View/>
                        }

                        <TouchableOpacity onPress={this.props.onOKPress}>
                            <Text style={styles.okButton}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </Modal>

            </View>
        )
    }
}

const styles = StyleSheet.create({


    container:{

        flex:1,
        margin:20,
        justifyContent:"center",


    },
    modalContainer:{

        width:"90%",
        height:160,
        alignSelf:"center",
        backgroundColor:"white",
        elevation:10,
        
    },
    modalHeading:{
        fontSize:15,
        fontWeight:'bold',
        textAlign:"left",
        margin:5,
        alignSelf:"center"

    },
    modalDescription:{

        textAlign:"center",
        marginLeft:10,
        marginTop:5,
        fontSize:14,

    },
    buttonView:{
        flexDirection:"row",
        justifyContent:"flex-end",
        marginTop:20,
        marginBottom:30
    },
    cancelButton:{
        color:"grey",
        fontSize:14,
        marginRight:20,
        marginLeft:10,
        fontWeight:"bold",
    },
    okButton:{
        color:Colors.blue_btn,
        fontSize:14,
        marginRight:20,
        marginLeft:10,
        fontWeight:"bold",
    },
    imageStyle:{
        width:width/5,
        height:windowheight/10,
        alignSelf:"center", 
        marginTop: windowheight ==  896 ? (windowheight/8 - 150) : (windowheight/8 - 120)
    }


})
