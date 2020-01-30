import React,{Component} from 'react';
import {View ,Text, ScrolView,Image,StyleSheet,Dimensions,TouchableOpacity,Alert,ActivityIndicator} from 'react-native';
import { withNavigation } from 'react-navigation';
import Colors from '../Utility/Colors';
import { StackActions, NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import CustomAlert from '../CustomUI/CustomAlert';

const widthD = Dimensions.get("window").width;
const heightH = Dimensions.get("window").height;

export default class  SideBar extends Component  {

    constructor(props){
        super(props);
        this.state = {
            name:"",
            email:"",
            profile:"",
            isLoading:false,
            visible:false,
            errorDesp:"",
            errorHeading:""
        }
    }

    componentDidMount(){
       
      setInterval(()=>{

       
        this.getUserEmailAndProfile();
        this.getUserName();
      },2000)
     
    }

  
     getUserEmailAndProfile = async() =>{
        try {
            const email = await AsyncStorage.getItem('email');
            this.setState({email:email});

            const profile = await AsyncStorage.getItem("profile");
            this.setState({profile:profile},()=>{
            
            })
            
           
        } catch(e) {
       
        }
     }
     getUserName = async() =>{
        try {
            const name = await AsyncStorage.getItem('name');
            this.setState({name:name},()=>{
              
            });
            
          
        } catch(e) {
       
        }
     }
  
     showLogoutAlert = () =>{
        // Alert.alert(
        //     'Logout',
        //     "Are you sure that you want to logout ?",
        //     [
         
           
        //     {text: 'CANCEL', onPress: () =>  {console.log("ok")}},
        //     {text: 'OK', onPress: () =>  {this.removeData()}},
        //     ], 
        //     { cancelable: false }
        //     )

        this.setState({visible:true});
        this.setState({errorHeading:"Logout"});
        this.setState({errorDesp:"Are you sure  you want to logout ?"});

        
     }
  
      removeData = async()=>{
       
       console.log("on remove");
        const keys = ['id', 'roles_id',]
        try {
            AsyncStorage.clear();
            this.props.navigation.toggleDrawer()
       
        this.props.navigation.navigate('SignUpStack');
       
        } catch(e) {
        // remove error

        }
       
    }

    render(){

        return(

            <View style={styles.container}>
                <View>
                    <View style={{height:130,backgroundColor:"white",justifyContent:"center",paddingTop:20}}>
                        <Image source={require('../../assets/logo_small.png')} resizeMode="contain" style={styles.ermslogo} />
                    </View>
                    
                   
                    
                    <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.toggleDrawer()
                       
                        }}>
                        <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-start"}}>
                            <Image source={require('../../assets/sidebar/1.png')} resizeMode="contain" style={styles.imageStyle} />
                            <Text style={styles.headingStyle}> Home </Text>
                        </View>
                       
                    </TouchableOpacity>
                   
                    <TouchableOpacity
                     onPress={() => {
                        
                        this.props.navigation.navigate('SavedForm')
                        const resetAction = StackActions.reset({
                            index: 0,
                            //key: 'ChangePassword', // here there will be no key as 
                            actions: [
                                NavigationActions.navigate({ routeName: 'SavedForm' }),
                            
                            ],
                        })
                  
                        this.props.navigation.dispatch(resetAction);
                        
                        }}
                        >
                        <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-start"}}>
                            <Image source={require('../../assets/sidebar/2.png')} resizeMode="contain" style={styles.imageStyle} />
                            <Text style={styles.headingStyle}> Saved QF Forms </Text>
                        </View>
                       
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('ApprovedForm')
                        const resetAction = StackActions.reset({
                            index: 0,
                            //key: 'ChangePassword', // here there will be no key as 
                            actions: [
                                NavigationActions.navigate({ routeName: 'ApprovedForm' }),
                            
                            ],
                        })
                  
                        this.props.navigation.dispatch(resetAction);
                        
                        }}>
                        <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-start"}}>
                            <Image source={require('../../assets/sidebar/3.png')} resizeMode="contain" style={styles.imageStyle} />
                            <Text style={styles.headingStyle}> Approved QF Forms </Text>
                        </View>
                       
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('CorrectiveForm')
                        const resetAction = StackActions.reset({
                            index: 0,
                            //key: 'ChangePassword', // here there will be no key as 
                            actions: [
                                NavigationActions.navigate({ routeName: 'CorrectiveForm' }),
                            
                            ],
                        })
                  
                        this.props.navigation.dispatch(resetAction);
                       
                        }}>
                        <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-start"}}>
                            <Image source={require('../../assets/sidebar/4.png')} resizeMode="contain" style={styles.imageStyle} />
                            <Text style={styles.headingStyle}> Corrective Action Log </Text>
                        </View>
                       
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('HoldRelease')
                        const resetAction = StackActions.reset({
                            index: 0,
                            //key: 'ChangePassword', // here there will be no key as 
                            actions: [
                                NavigationActions.navigate({ routeName: 'HoldRelease' }),
                            
                            ],
                        })
                  
                        this.props.navigation.dispatch(resetAction);
                       
                       
                        }}>
                        <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-start"}}>
                            <Image source={require('../../assets/sidebar/4.png')} resizeMode="contain" style={styles.imageStyle} />
                            <Text style={styles.headingStyle}> Hold/Release Log </Text>
                        </View>
                       
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Report')
                        const resetAction = StackActions.reset({
                            index: 0,
                            //key: 'ChangePassword', // here there will be no key as 
                            actions: [
                                NavigationActions.navigate({ routeName: 'Report' }),
                            
                            ],
                        })
                  
                        this.props.navigation.dispatch(resetAction);
                       
                       
                        }}>
                        <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-start"}}>
                            <Image source={require('../../assets/sidebar/5.png')} resizeMode="contain" style={styles.imageStyle} />
                            <Text style={styles.headingStyle}> Reports </Text>
                        </View>
                       
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('ChangePasswordScreen')
                        const resetAction = StackActions.reset({
                            index: 0,
                            //key: 'ChangePassword', // here there will be no key as 
                            actions: [
                                NavigationActions.navigate({ routeName: 'ChangePassword' }),
                            
                            ],
                        })
                  
                        this.props.navigation.dispatch(resetAction);
                        
                        }}>
                        <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-start"}}>
                            <Image source={require('../../assets/sidebar/6.png')} resizeMode="contain" style={styles.imageStyle} />
                            <Text style={styles.headingStyle}> Change Password </Text>
                        </View>
                       
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => {
                        this.showLogoutAlert()
                       
                        }}>
                        <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-start"}}>
                            <Image source={require('../../assets/sidebar/7.png')} resizeMode="contain" style={styles.imageStyle} />
                            <Text style={styles.headingStyle}> Logout </Text>
                        </View>
                       
                    </TouchableOpacity>
                    {/* <TouchableOpacity 
                     onPress={() => {
                        this.props.navigation.navigate('ChangePasswordScreen')
                        const resetAction = StackActions.reset({
                            index: 0,
                            //key: 'ChangePassword', // here there will be no key as 
                            actions: [
                                NavigationActions.navigate({ routeName: 'ChangePassword' }),
                            
                            ],
                        })
                  
                        this.props.navigation.dispatch(resetAction);
                        
                        }}
                        >
                        <Text style={styles.headingStyle}> Change Password </Text>
                    </TouchableOpacity> */}
                    
                
               </View>
               {this.state.visible 
                ?
                    <CustomAlert isVisible={this.state.visible} 
                        errorHeading={this.state.errorHeading}
                        errorDescription={this.state.errorDesp}
                        cancelVisible={true} 
                        onCancelPress={()=>{this.setState({visible:false})}}
                        onOKPress={()=>{this.setState({visible:false});this.removeData()}} />
                    :
                    <View/>
                }
            </View>
           

        )
    }
        
   

}


const styles =  StyleSheet.create({

    container:{
       
        backgroundColor:Colors.blue_btn,
        height:"100%"

    },
    ermslogo:{
       
        alignSelf:"center",
        backgroundColor:"white"
    },

    
    crossButton:{
        width:20,
        height:20,
        marginTop:20,
        marginRight:20,
        alignSelf:"flex-end"
    },
    nameStyle:{
        fontSize:15,
        fontWeight:"bold",
        marginTop:20,
        alignSelf:"center",
        color:"white"

    },
    emailStyle:{
        fontSize:15,
       
        marginTop:10,
        alignSelf:"center",
        color:"white"

    },
    viewStyle:{
        width:"100%",
        height:0.6,
        backgroundColor:"white",
         marginTop:10
    },
    headingStyle:{
        fontSize:15,
        marginLeft:10,
        fontWeight:"700",
        marginTop:20,
        alignSelf:"center",
        textAlign:"left",
        color:"white"
    },
    imageStyle:{
        width:30,
        height:30,
        marginLeft:20,
        marginTop:20,
        alignSelf:"flex-start",
        color:"white"


    },


    backgroundContainer: {
        position: 'absolute',
        top: 12,
        bottom: 0,
        left: 0,
        right: 50,
      },
      container1: {
        flex: 1,
        alignItems: 'center',
      },
   
      
})