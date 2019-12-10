import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,ActivityIndicator} from 'react-native';

import { WebView } from 'react-native-webview';

export default  class GmpPolicies extends Component {

    static navigationOptions = ({ navigation }) => ({
        
        title:" GMP and Allgerian Policies  ",
        headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 15,
            fontWeight:"bold",

           
        },
      
    });

    state = {
        visible:true
    }

    hideSpinner() {
        this.setState({ visible: false });
      }


    render(){
        return(
           <View style={{flex:1}}>
                <WebView
                    onLoad={() => this.hideSpinner()}
                    source={{ uri: "https://webmobril.org/dev/drillsub/api/Mobileapi/terms" }}
                    style={{ marginTop: 10 }}
                   
                />
                {this.state.visible && (
                   <View
                    style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
                    ]}
                    >
                        <ActivityIndicator size="large" />
                    </View>
                )}
           </View>
           
            
        )
    }
}

