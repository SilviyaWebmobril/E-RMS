import React ,{ Component } from 'react';
import { View,FlatList,Text,ScrollView, StyleSheet,TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Card } from 'react-native-elements';
import {formatDateTime} from '../Utility/Colors';
import {withNavigation} from 'react-navigation';
import  CustomHeaderDepartment  from '../CustomUI/CustomHeaderDepartment';
import { Table, TableWrapper, Row ,Cell} from 'react-native-table-component';
import EditCorrectiveActionLog from '../CorrectiveStack/EditCorrectiveActionLog';

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
        lot_no:"",
        log_date:"",
        preventive_measure:"",
        resolution:"",
        issue:"",
        log_title:"",
        message:"",
        tableData:[],
        tableHead: ['Form', 'Department', 'Location', 'Updated BY', 'Created On', 'Saved/Updated On', 'Saved/Submitted', 'Action'],
        widthArr: [200, 100, 100, 100, 180, 180, 140, 100],
        visibleCorrectiveLogModal:false
    }

    viewCorrectiveModal = async(item,type) => {

        this.setState({loading:true});
        let userid =  await AsyncStorage.getItem('id');
       
        let formdata  = new FormData();
        formdata.append("user_id",userid);
        formdata.append("role_id","2");
        formdata.append("loc_id",item.loc_id);
        formdata.append("reference",item.reference);
        formdata.append("type",type);
        formdata.append("form_id",item.form_id);
        console.log("form",formdata);
        Axios.post(ApiUrl.base_url + ApiUrl.view_hold_corrective_forms,formdata)
            .then(response => {
                this.setState({loading:false});
                    if(!response.data.error){

                        this.setState({preventive_measure:response.data.data[0].preventive_measure});
                        this.setState({lot_no:response.data.data[0].lot_no});
                        this.setState({issue:response.data.data[0].issue});
                        this.setState({resolution:response.data.data[0].resolution});
                        this.setState({log_date:response.data.data[0].date});
                        if(type == 1){
                            this.setState({log_title:"Corrective Release Log"})
                        }else{
                            this.setState({log_title:"Hold/Release Log"})
                        }
                        this.setState({visibleCorrectiveLogModal:true})

                    }

            }).catch(error => {
                this.setState({loading:false});

                console.log("error",error);
            })
    }

    element = (item, index) => {
    
        return (<TouchableOpacity  onPress={()=>{ this.props.navigation.navigate('EditDepartmentForm',{ 
            department_id : item.department_id,
            name :item.form_name,
            form_id:item.form_id,
            ref:item.reference,
            location_id:item.loc_id,onGoBack: () => this.onRefresh(),})}} style={{marginLeft:20}}>
            <Image source={require('../../assets/edit.png')} style={{width:20, height:20, }} />
        </TouchableOpacity>);
    };
    formNameAndIcon = (item) => {
       
        return (
             <View style={{flexDirection:"row",margin:5}}>
                 <Text style={{marginLeft:10}}>{item.form_name}</Text>
                 {item.correcitve_hold_check == 1
                 ?
                 <TouchableOpacity onPress={()=>{this.viewCorrectiveModal(item,1)}}>
                    <Image source={require('../../assets/corrective.png')} style={{width:15, height:15,marginLeft:5 }} />
                 </TouchableOpacity>
                 : 
                 (item.correcitve_hold_check == 2
                 ?
                 <TouchableOpacity onPress={()=>{this.viewCorrectiveModal(item,2)}}>
                    <Image source={require('../../assets/hold.png')} style={{width:15, height:15,marginLeft:5 }} />
                 </TouchableOpacity>
                 :
                (item.correcitve_hold_check == 3 
                    ?
                    
                    <View style={{flexDirection:"row",}}>
                         <TouchableOpacity onPress={()=>{this.viewCorrectiveModal(item,1)}}>
                            <Image source={require('../../assets/corrective.png')} style={{width:15, height:15,marginLeft:5 }} />
                         </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.viewCorrectiveModal(item,2)}}>
                            <Image source={require('../../assets/hold.png')} style={{width:15, height:15,marginLeft:5 }} />
                        </TouchableOpacity>
                    </View>
                    :
                    <View/>
                )
                 )}
                 
             </View>
        
        );
 
 
     }
    async renderI() {
        const state = this.state;
        const tableData = [];
        for (let i = 0; i < this.state.saved_form.length; i ++) {
          const rowData = [];
          for (let j = 0; j < 8; j += 1) {
            
           
            rowData.push(this.formNameAndIcon(this.state.saved_form[i]));
            rowData.push((this.state.saved_form[i].department_name));
            rowData.push(this.state.saved_form[i].location_name);
            if(this.state.saved_form[i].last_changed_by == 1){
                rowData.push("Admin");
            }else if(this.state.saved_form[i].last_changed_by == 2){
                let username  = await AsyncStorage.getItem("username");
                rowData.push(username);
            }else{
                rowData.push("QA");
            }
           
             rowData.push(formatDateTime(this.state.saved_form[i].created_at));
             rowData.push(formatDateTime(this.state.saved_form[i].updated_at));
           
            if(this.state.saved_form[i].form_status == 0){
                rowData.push("Saved");
            }else if(this.state.saved_form[i].form_status == 1){
                rowData.push("Submitted");
            }else if(this.state.saved_form[i].form_status == 2){
                rowData.push("Approved");
            }else {
                rowData.push("Rejected");
            }
            
           
            rowData.push(this.element(this.state.saved_form[i]));
          }
          tableData.push(rowData);
          
        }
        this.setState({tableData:tableData});
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

                this.setState({saved_form:response.data.data},()=>{
                   
                    this.renderI();
                });


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

   
    render() {

        
      

        return(
             <View style={{flex:1 ,alignItems:"center",justifyContent:"center"}}>
                <KeyboardAwareScrollView>
                    <View style={{flex:1}}>

                    <ScrollView horizontal={true}>
                        <View>
                            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                            <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={styles.header} textStyle={styles.text}/>
                            </Table>
                            <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                {
                                this.state.tableData.map((rowData, index) => (
                                  
                                    <Row
                                    key={index}
                                    data={rowData}
                                    widthArr={this.state.widthArr}
                                    style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                                    textStyle={styles.text}
                                    />
                                ))
                                }
                               
                            </Table>
                            </ScrollView>
                        </View>
                        </ScrollView>

                      
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

                {this.state.visibleCorrectiveLogModal && <View  style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center',flex:1 }
                    ]} >
                 
                    <EditCorrectiveActionLog log_title={this.state.log_title} 
                        dismissPopup={()=>{this.setState({visibleCorrectiveLogModal:false})}}
                        preventive_measure={this.state.preventive_measure}
                        lot_no={this.state.lot_no}
                        issue={this.state.issue}
                        resolution={this.state.resolution}
                        log_date={this.state.log_date}/>
                </View>
                }

                
                
            </View>
            
           
        )
    }

   
}

const styles =  StyleSheet.create({
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 ,},
    row: { height: 40, backgroundColor: '#E7E6E1' }
})
export default  withNavigation(SavedForm);