import React ,{Component} from 'react';
import {View ,Text,Image, TocuhableOpacity,StyleSheet,FlatList,TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomHeaderDepartment from '../CustomUI/CustomHeaderDepartment';
import CategoryItem from '../HomeStack/CategoryItem';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
export default class Department extends Component {


      static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
          return{
            header: () => <CustomHeaderDepartment name={navigation.getParam("result")['name']} nav={navigation}/>,
          }
      
      };

      state= {
        forms:[],
        message:""
    }

      componentDidMount(){

        var formdata = new FormData();
        formdata.append("department_id",this.props.navigation.getParam('result')['id']);
        Axios.post(ApiUrl.base_url+ApiUrl.view_department_form,formdata).then(response=>{


            if(response.data.error){
                this.setState({message:`${response.data.message}`})
               // alert("Something wenrt wrong please try again later!")                
            }else{

                this.setState({forms:response.data.data});
            }

        }).catch(error =>{
            console.log("error",error);
        })
      }

    

      renderItem(data){
        let { item, index } = data;
       
        return(
            <TouchableOpacity  onPress={()=>{ this.props.navigation.navigate('DepartmentForm',{department_id : item.id,name :item.name})}}>
                <CategoryItem data={item} />
            </TouchableOpacity>
           
        );

      }
    


    render(){
        return(
            <View style={{flex:1}}>
                <KeyboardAwareScrollView>
                    <View style={{flex:1}}>
                    <View style={styles.btnView}>
                        <TouchableOpacity style={styles.correctiveBtn}>
                            <Text style={styles.textStyle}>Corrective Action Form</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.holdBtn}>
                            <Text style={styles.textStyle}>Hold</Text>
                        </TouchableOpacity>
                    </View>

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