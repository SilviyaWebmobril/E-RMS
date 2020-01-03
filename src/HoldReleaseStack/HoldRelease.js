import React ,{ Component} from 'react';
import { View ,StyleSheet, Text , ScrollView , FlatList ,Image,TouchableOpacity,Dimensions,ActivityIndicator} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';
import { Card } from 'react-native-elements';
import Colors from '../Utility/Colors';


export default class CorrectiveAction extends Component {

    constructor(props) {
        super(props);
        this.state={
            correctiveLogs:[],
            message:"",
            loading:false
        }
    }

     async componentDidMount(){

        let user_id = await AsyncStorage.getItem('id');
        let role_id = await AsyncStorage.getItem('roles_id');
        this.setState({loading:true})

        let formdata = new FormData();
        formdata.append("user_id",user_id);
        formdata.append("role_id",role_id)
        Axios.post(ApiUrl.base_url+ ApiUrl.hold_release,formdata).then(response => {

            this.setState({loading:false})
            if(!response.data.error){
                this.setState({correctiveLogs:response.data.data});
            }else{
                this.setState({message:response.data.message,correctiveLogs:[]})
            }


        }).catch(error => {
            this.setState({loading:false})


        })


    }

    onRefresh =() =>{

    }

    renderItem(data){
        let { item, index } = data;
       
        return(
            <TouchableOpacity  onPress={()=>{ this.props.navigation.navigate('DepartmentForm',{department_id : item.form.id,name :item.form.name,onGoBack: () => this.onRefresh(),})}}>
              <Card containerStyle={{width: Dimensions.get('window').width-20}}>
                  <View style={{flexDirection:"row",justifyContent:"space-between",alignContent:"center",alignItems:"center"}}>
                  <Text style={{justifyContent:"center",alignSelf:"center",color:Colors.blue_btn,fontWeight:"bold",fontSize:15}}>
                        {item.form.department.name}
                    </Text>
                    <Text style={{justifyContent:"center",alignSelf:"center",color:Colors.blue_btn,fontWeight:"bold",fontSize:15}}>
                        {item.form.name}
                    </Text>
                    {
                        item.form_status == 5
                        ?
                        <Text>Hold</Text>
                        :
                        <Text>Release</Text>

                    }
                
                  </View>
                </Card>
            </TouchableOpacity>
           
        );

      }

    render(){
        return(
            <View style={{flex:1}}>
                <KeyboardAwareScrollView>
                    <View style={{flex:1}}>

                    {this.state.correctiveLogs.length > 0 
                        ?
                        <View style={{justifyContent:"space-between",flexDirection:"row",marginTop:10,marginLeft:5,marginRight:5}}>
                            <Text style={{fontSize:15,color:"black",flex:2,textAlign:"center",fontWeight:"bold",alignSelf:"flex-start"}}>Department name</Text>
                            <Text style={{fontSize:15,color:"black",flex:2,textAlign:"center",fontWeight:"bold",}}>Form Name</Text>
                            <Text style={{fontSize:15,color:"black",flex:2,textAlign:"center",fontWeight:"bold",}}>Form Status</Text>

                        </View>
                        :
                            <View/>
                    }
                      
                    
                    <FlatList
                        
                        data={this.state.correctiveLogs}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) =>this.renderItem(item)}
                        style={{paddingBottom:10}}
                        //columnWrapperStyle={{flexGrow: 1, justifyContent: 'space-around',marginTop:15}}
                        />
                    </View>
                
                </KeyboardAwareScrollView>
                {this.state.message
                ?
                    <Text style={{alignSelf:"center",flex:1,justifyContent:"center" ,fontWeight:"bold",fontSize:15,color:"#808080"}}>{this.state.message}</Text>
                :
                    <View/>
                }
                 { this.state.loading && <View
                    style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
                    ]}
                >
                    <ActivityIndicator size="large" />
                </View>}
            </View>
            
        )
    }



    
}