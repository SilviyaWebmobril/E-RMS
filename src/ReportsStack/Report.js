import React ,{ Component} from 'react';
import { View ,StyleSheet, Text , ScrollView , FlatList ,Image,TouchableOpacity,Dimensions,ActivityIndicator} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';
import {Card} from 'react-native-elements';
import { formatDateTime } from '../Utility/Colors'
import { Table, TableWrapper, Row ,Cell} from 'react-native-table-component';

export default class Report extends Component {

    constructor(props) {
        super(props);
        this.state={
            reports:[],
            message:"",
            loading:false,
            tableData:[],
            tableHead: ['Form', 'Department', 'Location', 'Updated By', 'Created On', 'Updated On', 'Form Status'],
            widthArr: [160, 140, 100, 100, 180, 180, 140]
        }
    }

    async renderI() {
        const state = this.state;
        const tableData = [];
        for (let i = 0; i < this.state.reports.length; i ++) {
          const rowData = [];
          for (let j = 0; j < 8; j += 1) {
            
            rowData.push(this.state.reports[i].form.name);
            rowData.push(this.state.reports[i].form.department.name);
            rowData.push(this.state.reports[i].location.location);
            if(this.state.reports[i].last_changed_by == 1){
                rowData.push("Admin");
            }else if(this.state.reports[i].last_changed_by == 2){
                let username = await AsyncStorage.getItem("username");
                rowData.push(username);
            }else{
                rowData.push("QA");
            }
           
            rowData.push(formatDateTime(this.state.reports[i].created_at));
            rowData.push(formatDateTime(this.state.reports[i].updated_at));
            if(this.state.reports[i].form_status == 0){
                rowData.push("Saved");
            }else if(this.state.reports[i].form_status == 1){
                rowData.push("Submitted");
            }else if(this.state.reports[i].form_status == 2){
                rowData.push("Approved");
            }else {
                rowData.push("Rejected");
            }
            
           
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
        Axios.post(ApiUrl.base_url+ ApiUrl.reports,formdata).then(response => {
            this.setState({loading:false})

            if(!response.data.error){
                this.setState({reports:response.data.data},()=>{
                    this.renderI();
                },);
            }else{
                this.setState({message:response.data.message})
            }


        }).catch(error => {
            this.setState({loading:false})


        })


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