import React ,{ Component} from 'react';
import { View ,StyleSheet, Text ,Dimensions, ScrollView , FlatList ,Image,TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Axios from 'axios';
import CustomHeaderDepartment from '../CustomUI/CustomHeaderDepartment';
import CustomHeader from '../CustomUI/CustomHeader';
import ApiUrl from '../Utility/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';
import { Card } from 'react-native-elements';
import Colors from '../Utility/Colors';



export default class CorrectiveAction extends Component {


    static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
          return{
            header: () => <CustomHeaderDepartment name="Corrective Action" nav={navigation}/>,
          }
      
      };




    constructor(props) {
        super(props);
        this.state={
            correctiveLogs:[],
            message:""
        }
    }

     async componentDidMount(){

        let user_id = await AsyncStorage.getItem('id');
        let role_id = await AsyncStorage.getItem('roles_id');

        let formdata = new FormData();
        formdata.append("user_id",user_id);
        formdata.append("role_id",role_id)
        Axios.post(ApiUrl.base_url+ ApiUrl.corrective_form,formdata).then(response => {

           
            if(!response.data.error){
                console.log("response data",response.data.message);
                this.setState({correctiveLogs:response.data.data});
            }else{
                console.log("response data122",response.data.message);
                this.setState({correctiveLogs:[],message:response.data.message},()=>{
                    console.log("xchsnjf",this.state.message);
                })
               
            }


        }).catch(error => {


        })

    }

    onRefresh(){
        console.log("hellooooooo");
       // this.componentDidMount()
    }

    renderItem(data){
        let { item, index } = data;
       
        return(
            <TouchableOpacity  onPress={()=>{ this.props.navigation.navigate('DepartmentForm',{department_id : item.form.id,name :item.form.name,onGoBack:this.onRefresh.bind(this),})}}>
              <Card containerStyle={{width: Dimensions.get('window').width-20}}>
                  <View style={{flexDirection:"row",justifyContent:"space-between",alignContent:"center",alignItems:"center"}}>
                    <Text style={{justifyContent:"center",alignSelf:"center",color:Colors.blue_btn,fontWeight:"bold",fontSize:15}}>
                        {item.form.name}
                    </Text>
                    <TouchableOpacity style={{backgroundColor:'#F7F7F7',marginRight:5,
                        borderRadius:20,padding:9,justifyContent:'center',alignItems:'center'}}
                        onPress={() => {this.props.navigation.navigate('DepartmentForm',{department_id : item.form.id,name :item.form.name})}}>
                        <Image style={{width: 20, height: 20,}}
                        source={require('../../assets/edit.png')} />
                    </TouchableOpacity>
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
                    
                    <FlatList
                        numColumns={2}
                        data={this.state.correctiveLogs}
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