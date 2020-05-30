import React, {Component} from 'react';
import {View,Text,StyleSheet,ActivityIndicator,} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ApiUrl from '../Utility/ApiUrl';
import { WebView } from 'react-native-webview';
import CustomHeaderDepartment from '../CustomUI/CustomHeaderDepartment';
import AsyncStorage from '@react-native-community/async-storage'

export default class EditDepartmentForm extends Component {

    static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
       
          return{
            header: () => <CustomHeaderDepartment name={navigation.getParam("name")} nav={navigation} />,
          }
      
      };

    state={
        loading:true,
        user_id:""
    }

    async componentDidMount (){


        const value = await AsyncStorage.getItem('id');
         this.setState({user_id:value})

    }

    hideSpinner() {
        
        this.setState({ loading: false });
      }

     

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <WebView 
                     onLoad={() => this.hideSpinner()}
                    // style={{width:'auto',height:'auto'}}
                     //originWhitelist={['*']}

                     javaScriptEnabled={true}
                        domStorageEnabled={true}
                    source={{ uri: ApiUrl.base_url+ApiUrl.edit_form+`${this.props.navigation.getParam('form_id')}&user_id=${this.state.user_id}&dep_id=${this.props.navigation.getParam('department_id')}&loc_id=${this.props.navigation.getParam('location_id')}&ref=${this.props.navigation.getParam('ref')}`}} 
                    onMessage={m => this.onMessage(m)} 
                   />


                </View>

                { this.state.loading && <View
                    style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
                    ]}
                >
                    <ActivityIndicator size="large" />
                </View>
                }

            </View>
        )
    }
}