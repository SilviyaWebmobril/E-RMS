import React ,{Component} from 'react';
import {View ,Text,StyleSheet, Image,ImageBackground,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class Splash extends Component {


    componentDidMount(){
        
     
        // this.interval = setInterval(() => {
    
        //     this.getMyValue();
          
        
        // }, 5000);
      
        setTimeout(()=>{
            this.getMyValue();
        },5000)
        
    
    }
    
    getMyValue = async() =>{
    
        // try {
        //    // this.props.navigation.navigate("SignUpStack");
        //     const value = await AsyncStorage.getItem('token');
           
        //     if(value !== null) {
               
        //       this.props.navigation.navigate("HomeDrawer");
        //     }else{
        //         console.log("hi signup")
        //         this.props.navigation.navigate("SignUpStack");
        //     }
        // } catch(e) {
       
        // }

        this.props.navigation.navigate("SignUpStack");
    }

    render(){
        return(
           
               
                  
            <ImageBackground style={styles.imageBck} source={require('../assets/splash3.png')}>
                <View >
                <Image source={require('../assets/login-logo.png')}  resizeMode="contain" style={styles.ermslogo}/>
                <View style={styles.bottom}>
                    <Text style={styles.textStyle}>Powered By ACS Bizconsulting</Text>
                </View>
            
                </View>
            </ImageBackground>
                   
        )
    }
}


const styles = StyleSheet.create({

    textStyle:{
        fontSize:14,
        fontWeight:'bold',
        //top:0,
        position:'absolute',
        bottom:0,
        alignSelf:'center',
        color:"white"
        

    },
    ermslogo:{
        width:width,
        height:height/2,
        alignSelf:"center",
        //position:'absolute',
        top:150,
        // left:0,
        // right:0,
        // bottom:0,
       // flex:1,
        //justifyContent:"center"
    },
    imageBck:{
        flex:1,
        position: 'absolute',
        resizeMode: 'contain',
        width:width,
        height:height,
        alignItems:'center',
        justifyContent:'center'
       
    },
    bottom: {
        flex: 1,
       justifyContent:"flex-end",
       marginBottom:60
       
      }
})