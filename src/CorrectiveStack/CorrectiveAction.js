import React ,{ Component} from 'react';
import { View ,StyleSheet, Text ,Dimensions, ScrollView , FlatList ,Image,TouchableOpacity,ActivityIndicator} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Axios from 'axios';
import CustomHeaderDepartment from '../CustomUI/CustomHeaderDepartment';
import CustomHeader from '../CustomUI/CustomHeader';
import ApiUrl from '../Utility/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';
import { Card } from 'react-native-elements';
import { Table, TableWrapper, Row ,Cell} from 'react-native-table-component';
import {formatDateTime} from '../Utility/Colors';
import EditCorrectiveActionLog from './EditCorrectiveActionLog';



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
            message:"",
            loading:false,
            tableData:[],
            tableHead: ['QF No','Form', 'Department', 'Location', 'Created On', 'Action'],
            widthArr: [100, 160, 100, 100, 180, 100],
            lot_no:"",
            log_date:"",
            preventive_measure:"",
            resolution:"",
            issue:"",
            log_title:"",
            visibleCorrectiveLogModal:false
        }
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
                <Text>{item.form_name}</Text>
                <TouchableOpacity onPress={()=>{this.viewCorrectiveModal(item,1)}}>
                <Image source={require('../../assets/corrective.png')} style={{width:15, height:15,marginLeft:5 }} />
                </TouchableOpacity>
            </View>
       
       );


    }

    renderI() {
        const state = this.state;
        const tableData = [];
        for (let i = 0; i < this.state.correctiveLogs.length; i ++) {
          const rowData = [];
          for (let j = 0; j < 6; j += 1) {
            rowData.push(this.state.correctiveLogs[i].form_prefix);  
            rowData.push(this.formNameAndIcon(this.state.correctiveLogs[i]));
            rowData.push(this.state.correctiveLogs[i].department_name);
            rowData.push(this.state.correctiveLogs[i].location_name);
          
            rowData.push(formatDateTime(this.state.correctiveLogs[i].created_on));
          
           
            rowData.push(this.element(this.state.correctiveLogs[i]));
          }
          tableData.push(rowData);
          
        }
        this.setState({tableData:tableData});
    }
    

     async componentDidMount(){

        let user_id = await AsyncStorage.getItem('id');
        let role_id = await AsyncStorage.getItem('roles_id');
        this.setState({loading:true})

        let formdata = new FormData();
        formdata.append("user_id",user_id);
        formdata.append("role_id",role_id)
        Axios.post(ApiUrl.base_url+ ApiUrl.corrective_form,formdata).then(response => {
            this.setState({loading:false})
           
            if(!response.data.error){
                
                this.setState({correctiveLogs:response.data.data},()=>{
                    this.renderI()
                });
            }else{
              
                this.setState({correctiveLogs:[],message:response.data.message},()=>{
                   
                })
               
            }


        }).catch(error => {

            this.setState({loading:false})

        })

    }

    onRefresh(){
       
        this.componentDidMount()
    }


    render(){
        return(
            <View style={{flex:1}}>
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