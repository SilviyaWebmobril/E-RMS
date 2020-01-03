import React ,{Component} from 'react';
import {View ,Text,StyleSheet,Image,TextInput,TouchableOpacity,FlatList, Alert} from 'react-native';
import Colors from '../Utility/Colors';
import { CustomTextInput } from './CustomTextInput';
import { SearchBar } from 'react-native-elements';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';
import CustomAlert from '../CustomUI/CustomAlert';


export default class CustomHeader extends Component {

    constructor(props) {
        super(props);
        //setting default state
        this.state = { isLoading: false, search: '',dataSource:[],visible:false };
        this.arrayholder = [];
      }
     
      search = text => {
        console.log(text);
      };
      clear = () => {
        this.search.clear();
      };
      async SearchFilterFunction(text) {
        //passing the inserted text in textinput
        // const newData = this.arrayholder.filter(function(item) {
        //   //applying filter for the inserted text in search bar
        //   const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        //   const textData = text.toUpperCase();
        //   return itemData.indexOf(textData) > -1;
        // });\
        this.setState({
             
          search:text,
          isLoading:true,
        });

        let user_id = await AsyncStorage.getItem('id');
        Axios.post(ApiUrl.base_url+ApiUrl.search+text+"&user_id="+user_id).then(response=>{
          this.setState({isLoading:false})

          if(response.data.error){

            this.setState({
             dataSource:[]
             // search:text,
            });

            if(text === ""){
              return;
            }
            this.setState({visible:true});
            this.setState({errorDesp:'Search not found!'});
            this.setState({errorHeading:'Error'});


          }else{

            this.setState({
              //setting the filtered newData on datasource
              //After setting the data it will automatically re-render the view
              dataSource: response.data.data,
              visible:false,
              errorDesp:"",
              errorHeading:""
              
            });
          }


        }).catch(error =>{

          console.log("error",error);

        })

        
       
      }
      ListViewItemSeparator = () => {
        //Item sparator view
        return (
          <View
            style={{
              height: 1,
              flex:1,
              width: '100%',
              backgroundColor: 'grey',
            }}
          />
        );
      };

      next(item){
        let obj ={
            'name':item.name,
            'id':item.id
        }
        //alert("passing"+item.value)
        this.props.nav.navigate('Department',{result:obj,onGoBack: () => this.onRefresh(),})
    }

    onRefresh= () =>{

    }


    render(){
        const { search } = this.state;
        return(
            <View style={styles.blueBoxes}>
                <View style={styles.headerStyle}>
                    <TouchableOpacity  onPress={this.props.nav.toggleDrawer}>
                        <Image  source= {require('../../assets/menu.png')} style={styles.menyuStyle} />
                    </TouchableOpacity>
                    
                    <Text style={styles.headerText}>Dashboard</Text>
                </View>
                <View style={styles.viewStyle}>
                    <SearchBar
                    round
                    containerStyle={{backgroundColor:"white",borderRadius:10,height:50}}
                    inputContainerStyle={{backgroundColor:"white",height:30}}
                    searchIcon={{ size: 24 }}
                    onChangeText={text => this.SearchFilterFunction(text)}
                    onClear={text => {this.SearchFilterFunction('')}}
                    placeholder="Search Here..."
                    lightTheme={true}
                    showLoading={this.state.isLoading}
                    value={this.state.search}
                    />
                     {this.state.dataSource.length > 0 
                     ?
                     <FlatList
                      data={this.state.dataSource}
                      horizontal={false}
                      ItemSeparatorComponent={this.ListViewItemSeparator}
                      //Item Separator View
                      renderItem={({ item }) => {
                          // Single Comes here which will be repeatative for the FlatListItems
                         return (
                          <TouchableOpacity onPress={()=>{this.next(item)}} style={{padding:10,backgroundColor:"#ececec"}}>
                            <Text style={styles.textStyle}>{item.name}</Text>
                          </TouchableOpacity>
                         ) 
                      }}
                       // contentContainerStyle={styles.searchStyle}
                       enableEmptySections={true}
                      style={{ marginTop:0,position:"absolute",height:"auto",zIndex:100,top:70,width:"100%",backgroundColor:"white",borderColor:"grey",borderWidth:1}}
                      keyExtractor={(item, index) => index.toString()}
                      />
                     :
                     <View/>
                    }
                    
                </View> 
                {/* <View style={styles.searchStyle}> 
                  <Image source={require('../../assets/search.png')} style={styles.serachImage} />
                  <TextInput placeholder="Search Here" style={{marginTop:15}}/>

                </View> */}
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

    blueBoxes:{
        width:"100%",
        height:170,
        paddingLeft:20,
        paddingRight:20,
        alignItems:"center",
        backgroundColor:Colors.blue_btn,
        elevation:10
    },
    headerStyle:{
        alignItems:"flex-start",
        alignSelf:"flex-start",
        flexDirection:'row',
        marginTop:50,
        justifyContent:"center",
        alignContent:"center"
    

    },
    menyuStyle:{
        width:30,
        height:30,
        marginTop:0
        
    },
    headerText:{
        fontWeight:"bold",
        fontSize:20,
        color:"white",
        marginTop:0,
        marginLeft:20
    },
    searchStyle:{
        flexDirection:"column",
        width:"100%",
         height:45,
        paddingLeft:20,
        paddingRight:20,
        alignItems:"flex-start",
        backgroundColor:"blue",
        borderRadius:5,
        flexDirection:"row",
        marginTop:15
        
    },
    serachImage:{
        width:30,
        height:30,
        alignSelf:"center"
    },

    viewStyle: {
        width:"100%",
        justifyContent: 'center',
        flex: 1,
        
        backgroundColor:Colors.blue_btn,
        marginTop: Platform.OS == 'ios'? 10 : 0
      },
      textStyle: {
        //padding: 10,
        
        width:"100%",
        color:"black",
        fontSize:15,
      },
})