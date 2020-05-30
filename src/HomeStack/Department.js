import React ,{Component} from 'react';
import {View ,Text,Image, TocuhableOpacity,StyleSheet,FlatList,TouchableOpacity,Dimensions,ActivityIndicator} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomHeaderDepartment from '../CustomUI/CustomHeaderDepartment';
import CategoryItem from '../HomeStack/CategoryItem';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import { Card } from 'react-native-elements';
import Colors from '../Utility/Colors';
import AsyncStorage from '@react-native-community/async-storage';

export default class Department extends Component {


      static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
          return{
            header: () => <CustomHeaderDepartment name={navigation.getParam("result")['name']} nav={navigation}/>,
          }
      
      };

      constructor(props){
          super(props);
          
      }

      state= {
        forms:[],
        message:"",
        correctiveAction:false,
        holdAction:false,
        correctiveLogs:[],
        holdLogs:[],
        loading:false,
    }

        onRefresh =() =>{
            this.componentDidMount();
        }

      async componentDidMount(){

        this.setState({correctiveAction:false,forms:[],holdAction:false,message:"",loading:true},()=>{
            //
         });
         
         let userid =  await AsyncStorage.getItem('id');
        var formdata = new FormData();
        
        formdata.append("department_id",this.props.navigation.getParam('result')['department_id']);
        formdata.append("location_id",this.props.navigation.getParam('result')['location_id'])
        console.log("response formdata",formdata);
        Axios.post(ApiUrl.base_url+ApiUrl.view_department_form,formdata).then(response=>{

            console.log("response dept",response.data);
            this.setState({loading:false})
            if(response.data.error){
                this.setState({message:`${response.data.message}`})
               // alert("Something wenrt wrong please try again later!")                
            }else{

                this.setState({forms:response.data.data});
            }

        }).catch(error =>{
            this.setState({loading:false})
            console.log("error",error);
        })
      }

    

      renderItem(data){
        let { item, index } = data;

        if(this.state.correctiveAction|| this.state.holdAction){

           // this.renderLogsItem(item)
           return(
            <TouchableOpacity  onPress={()=>{ this.props.navigation.navigate('DepartmentForm',{department_id : item.form.id,name :item.form.name,onGoBack: () => this.onRefresh(),})}}>
              <Card containerStyle={{width: Dimensions.get('window').width-20}}>
                  <View style={{flexDirection:"row",justifyContent:"space-between",alignContent:"center",alignItems:"center"}}>
                    <Text style={{justifyContent:"center",alignSelf:"center",color:Colors.blue_btn,fontWeight:"bold",fontSize:15}}>
                        {item.form.name}
                    </Text>
                    {
                        item.form_status == 5
                        ?
                        <Text>Hold</Text>
                        :
                        (item.form_status == 4
                        ?
                        <Text>Allow - ReEdit</Text>
    
                        :
                        <Text>Release</Text>
    
                        )
                       
                    }
                
                  </View>
                </Card>
                </TouchableOpacity>
           
        );
    

        }else{

             
        return(

            <TouchableOpacity  onPress={()=>{ this.props.navigation.navigate('DepartmentForm',{ 
                department_id : item.department_id,
                name :item.name,
                form_id:item.id,
                location_id:this.props.navigation.getParam('result')['location_id'],onGoBack: () => this.onRefresh(),})}}>
                <CategoryItem data={item} />
            </TouchableOpacity>
           
        );

        }
      

      }


  onPressCorrectiveAction = async() =>{

    this.setState({correctiveAction:true,forms:[],holdAction:false,message:"",loading:true},()=>{
       //
    });
    
    let user_id = await AsyncStorage.getItem('id');
    let role_id = await AsyncStorage.getItem('roles_id');
    

    let formdata = new FormData();
    formdata.append("user_id",user_id);
    formdata.append("role_id",role_id)
    Axios.post(ApiUrl.base_url+ ApiUrl.corrective_form,formdata).then(response => {


        this.setState({loading:false})
       
        if(!response.data.error){
           
            this.setState({forms:response.data.data});
        }else{
           
            this.setState({forms:[]})
           this.setState({message:response.data.message},()=>{
              
           })
           
        }


    }).catch(error => {
        this.setState({loading:false})


    })

  }

  onHoldHandler = async() =>{

    this.setState({correctiveAction:false,forms:[],holdAction:true,message:"",loading:true},()=>{
        //
     });

   
     let user_id = await AsyncStorage.getItem('id');
     let role_id = await AsyncStorage.getItem('roles_id');

     let formdata = new FormData();
     formdata.append("user_id",user_id);
     formdata.append("role_id",role_id)
     Axios.post(ApiUrl.base_url+ ApiUrl.hold_release,formdata).then(response => {

        this.setState({loading:false})
         if(!response.data.error){
             this.setState({forms:response.data.data});
         }else{
             this.setState({message:response.data.message})
         }


     }).catch(error => {
        this.setState({loading:false})


     })

    


  }

  renderLogsItem(data){
    let { item, index } = data;
   
    return(
        <TouchableOpacity  onPress={()=>{ this.props.navigation.navigate('DepartmentForm',{department_id : item.form.id,name :item.form.name,onGoBack: () => this.onRefresh(),})}}>
          <Card containerStyle={{width: Dimensions.get('window').width-20}}>
              <View style={{flexDirection:"row",justifyContent:"space-between",alignContent:"center",alignItems:"center"}}>
                <Text style={{justifyContent:"center",alignSelf:"center",color:Colors.blue_btn,fontWeight:"bold",fontSize:15}}>
                    {item.form.name}
                </Text>
                {
                    item.form_status == 5
                    ?
                    <Text>Hold</Text>
                    :
                    (item.form_status == 1
                    ?
                    <Text>Submitted</Text>

                    :
                    <Text>Release</Text>

                    )
                   
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
                    {/* <View style={styles.btnView}>
                        <TouchableOpacity style={styles.correctiveBtn} onPress={()=>this.onPressCorrectiveAction()} >
                            <Text style={styles.textStyle}>Corrective Action Form</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.holdBtn}  onPress={()=>this.onHoldHandler()}  >
                            <Text style={styles.textStyle}>Hold</Text>
                        </TouchableOpacity>
                    </View> */}

                   
                        <FlatList
                        numColumns={2}
                        data={this.state.forms}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) =>this.renderItem(item)}
                        style={{paddingBottom:10}}
                        columnWrapperStyle={{flexGrow: 1, justifyContent: 'space-around',marginTop:15}}
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

const styles= StyleSheet.create({

    btnView:{
        flexDirection:"row",
        justifyContent:"flex-end",
        margin:20
    },
    correctiveBtn:{
        backgroundColor:"green",
        padding:10,
        alignItems:"center",
        borderColor:"#ececec",
        borderWidth:1,
        marginRight:10
    },
    textStyle:{
        fontSize:14,
        fontWeight:"bold",
        color:"white"
    },
    holdBtn:{
        backgroundColor:"red",
        padding:10,
        alignItems:"center",
        borderColor:"#ececec",
        borderWidth:1,
        marginRight:10
    },

})