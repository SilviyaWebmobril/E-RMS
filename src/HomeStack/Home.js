import React ,{Component} from 'react';
import {View ,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity,ActivityIndicator,RefreshControl} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CategoryItem from './CategoryItem';
import CustomHeader from '../CustomUI/CustomHeader';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';
import CustomAlert from '../CustomUI/CustomAlert';
import Colors from '../Utility/Colors';

export default class Home extends Component {

    static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
          return{
            header: () => <CustomHeader nav={navigation}/>,
          }
      
      };

  
    
    constructor(props){
        super(props);
        this.state ={
            isSec :true,
            loading:false,
            department:[],
            visible:false,
            errorDesp:"",
            errorHeading:"",
            
        }
    }

    onRefresh =() =>{

        this.componentDidMount();
    }


    componentDidMount = async() => {

        this.setState({loading:true})
        let userid =  await AsyncStorage.getItem('id');
        let rolesid =   await AsyncStorage.getItem('roles_id');
        console.log("get user",userid);
        let formdata =  new FormData();
        formdata.append("user_id",JSON.parse(userid));
        formdata.append("role_id",JSON.parse(rolesid));
        console.log("formdata",formdata);
        Axios.post(ApiUrl.base_url+ApiUrl.departments,formdata).then(response =>{
            this.setState({loading:false})

            console.log("response -->",response);
           
            if(response.data.error){

               // alert("Something went wrong please try again later!")
                this.setState({visible:true});
                this.setState({errorDesp:response.data.message});
                this.setState({errorHeading:'Error'});
            }else{

                this.setState({department:response.data.data});
            }
        }).catch(error=>{
            this.setState({loading:false})
            this.setState({visible:true});
            this.setState({errorDesp:'Something went wrong please try again later!'});
            this.setState({errorHeading:'Error'});
            console.log("error",error);
        })
    }
    
    next(item){
        let obj ={
            'name':item.name,
            'id':item.id
        }
        //alert("passing"+item.value)
        this.props.navigation.navigate('Department',{result:obj,onGoBack: () => this.onRefresh(),})
    }

    renderItem(data){
        let { item, index } = data;
       
        return(
            <TouchableOpacity onPress={()=>{this.next(item)}}>
                <CategoryItem data={item} />
            </TouchableOpacity>
           
        );
    }

    render(){
        return(
            <View style={{flex:1}}>

                <KeyboardAwareScrollView  refreshControl={
                <RefreshControl refreshing={this.state.loading} onRefresh={this.onRefresh}/>  } >
                    <View style={styles.container}>
                        <Text style={styles.departmentStyle}>Select Department</Text>

                        {this.state.department.length > 0
                        ?
                        <FlatList
                        numColumns={2}
                        data={this.state.department}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) =>this.renderItem(item)}
                        style={{paddingBottom:10}}
                        columnWrapperStyle={{flexGrow: 1, justifyContent: 'space-around',marginTop:15}}
                        />
                        :
                        <View style={{justifyContent:'center',flex:1}}>
                            <Text style={{alignSelf:"center",fontSize:15,fontWeight:"bold",color:Colors.blue_btn}}>{this.state.errorDesp}</Text>
                        </View>
                        }


                      
                    



                    </View>
                    
                </KeyboardAwareScrollView>
                { this.state.loading && <View
                    style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
                    ]}
                >
                    <ActivityIndicator size="large" />
                </View>}
                {this.state.visible 
                ?
                    <CustomAlert isVisible={this.state.visible} 
                        errorHeading={this.state.errorHeading}
                        errorDescription={this.state.errorDesp}
                        cancelVisible={false} 
                        onOKPress={()=>{this.setState({visible:false})}} />
                    :
                    <View/>
                }

                </View>
            
        )
    }
}

const styles  = StyleSheet.create({

    container :{
         flex:1,
         backgroundColor:"white"
    },
    departmentStyle:{
        fontSize:15,
        fontWeight:'bold',
        margin:20
    },
    
})