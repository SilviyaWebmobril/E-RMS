import React ,{ Component } from 'react';
import { View,FlatList,Text,ScrollView, StyleSheet,TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Card } from 'react-native-elements';
import Colors from '../Utility/Colors';
import {withNavigation} from 'react-navigation';
import  CustomHeaderDepartment  from '../CustomUI/CustomHeaderDepartment';


class SavedForm extends Component {

    static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
        
          return{
            header: () => <CustomHeaderDepartment name="Saved QF Forms" nav={navigation}/>,
          }
      
      };

    constructor(props){
        super(props);

    }
    state={
        saved_form:[],
        loading:false,
        message:""
    }

    

      fetch =async() =>{


        this.setState({loading:true});
        let user_id = await AsyncStorage.getItem('id');
        let role_id = await AsyncStorage.getItem('roles_id');
        let formdata  = new FormData();
        formdata.append("user_id",JSON.parse(user_id));
        formdata.append("role_id",JSON.parse(role_id));
        Axios.post(ApiUrl.base_url+ApiUrl.saved_form,formdata).then(response =>{
          
            this.setState({loading:false});
            if(!response.data.error){

                this.setState({saved_form:response.data.data});


            }else{
               
                this.setState({saved_form:[]});
                this.setState({message:response.data.message},()=>{

                });
            }



        }).catch(error => {


        })
      }

  

    async componentDidMount(){

        this.fetch();
    }

    onRefresh = () =>{
        console.log("hello");
        this.fetch();
    }

    renderItem(data){
        let { item, index } = data;

       
        return(
            <TouchableOpacity  onPress={()=>{ this.props.navigation.navigate('DepartmentForm',{department_id : item.form.id,name :item.form.name, onGoBack:this.onRefresh,})}}>
              <Card containerStyle={{width: Dimensions.get('window').width-30,justifyContent:"center",flex:1}}>
                  <View style={{flexDirection:"row",justifyContent:"space-between",alignContent:"center",alignItems:"center"}}>
                  <Text style={{justifyContent:"center",alignSelf:"center",color:Colors.blue_btn,fontWeight:"bold",fontSize:15,flex:1,textAlign:"left"}}>
                        {item.form.department.name}
                    </Text>
                    <Text style={{justifyContent:"center",alignSelf:"center",color:Colors.blue_btn,fontWeight:"bold",fontSize:15.,flex:1,textAlign:"center"}}>
                        {item.form.name}
                    </Text>
                    {item.form_status == 0 
                    ?
                    // <TouchableOpacity style={{backgroundColor:'#F7F7F7',marginRight:5,
                    //     borderRadius:20,padding:9,justifyContent:'center',alignItems:'center'}}
                    //     onPress={() => {this.props.navigation.navigate('DepartmentForm',{department_id : item.form.id,name :item.form.name,onGoBack:this.onRefresh,})}}>
                    //     <Image style={{width: 20, height: 20,}}
                    //     source={require('../../assets/edit.png')} />
                    // </TouchableOpacity>
                    <Text style={{justifyContent:"flex-end",alignSelf:"flex-end",color:Colors.blue_btn,fontWeight:"bold",fontSize:15,flex:1,textAlign:"right"}}>
                        Saved
                    </Text>
                    :
                    <Text style={{justifyContent:"flex-end",alignSelf:"flex-end",color:Colors.blue_btn,fontWeight:"bold",fontSize:15,flex:1,textAlign:"right"}}>
                       Submitted
                    </Text>
                    }
                    
                  </View>
                </Card>
            </TouchableOpacity>
           
        );

      }
    


    render() {

        return(
             <View style={{flex:1}}>
                <KeyboardAwareScrollView>
                    <View style={{flex:1}}>

                    {this.state.saved_form.length > 0 
                        ?
                        <View style={{justifyContent:"space-between",flexDirection:"row",marginTop:10,marginLeft:10,marginRight:5}}>
                           <Text style={{fontSize:15,color:"black",flex:2,textAlign:"center",fontWeight:"bold",alignSelf:"center"}}>Department name</Text>
                            <Text style={{fontSize:15,color:"black",flex:2,textAlign:"center",fontWeight:"bold",alignSelf:"center"}}>Form Name</Text>
                            <Text style={{fontSize:15,color:"black",flex:2,textAlign:"center",fontWeight:"bold",alignSelf:"center"}}>Form Status</Text>

                        </View>
                        :
                            <View/>
                        }
                      
                  
                    
                    <FlatList
                       
                        data={this.state.saved_form}
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
export default  withNavigation(SavedForm);