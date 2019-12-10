import React ,{Component} from 'react';
import {View ,Text,StyleSheet,Image,TextInput,TouchableOpacity,FlatList} from 'react-native';
import Colors from '../Utility/Colors';
import { CustomTextInput } from './CustomTextInput';
import { SearchBar } from 'react-native-elements';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';



export default class CustomHeader extends Component {

    constructor(props) {
        super(props);
        //setting default state
        this.state = { isLoading: true, search: '',dataSource:[] };
        this.arrayholder = [];
      }
     
      search = text => {
        console.log(text);
      };
      clear = () => {
        this.search.clear();
      };
      SearchFilterFunction(text) {
        //passing the inserted text in textinput
        // const newData = this.arrayholder.filter(function(item) {
        //   //applying filter for the inserted text in search bar
        //   const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        //   const textData = text.toUpperCase();
        //   return itemData.indexOf(textData) > -1;
        // });\
        this.setState({
             
          search:text,
        });


        Axios.post(ApiUrl.base_url+ApiUrl.search+text).then(response=>{

          if(response.data.error){

            this.setState({
             
              search:text,
            });


          }else{

            this.setState({
              //setting the filtered newData on datasource
              //After setting the data it will automatically re-render the view
              dataSource: response.data.data,
              search:text,
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
              height: 0.3,
              width: '90%',
              backgroundColor: '#080808',
            }}
          />
        );
      };

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
                {/* <View style={styles.viewStyle}>
                    <SearchBar
                    round
                    searchIcon={{ size: 24 }}
                    onChangeText={text => this.SearchFilterFunction(text)}
                    onClear={text => this.SearchFilterFunction('')}
                    placeholder="Type Here..."
                    lightTheme={true}
                    value={this.state.search}
                    />
                     {this.state.dataSource.length > 0 
                     ?
                     <FlatList
                      data={this.state.dataSource}
                    // ItemSeparatorComponent={this.ListViewItemSeparator}
                      //Item Separator View
                      renderItem={({ item }) => {
                          // Single Comes here which will be repeatative for the FlatListItems
                        
                          <Text style={styles.textStyle}>{item.title}</Text>
                        
                      }}
                      //contentContainerStyle={styles.searchStyle}
                      enableEmptySections={true}
                      style={{ marginTop: 0 ,position:"absolute",height:1000,top:50,left:0,right:0,bottom:0,backgroundColor:"white"}}
                      keyExtractor={(item, index) => index.toString()}
                      />
                     :
                     <View/>
                    }
                    
                </View> */}
                <View style={styles.searchStyle}> 
                  <Image source={require('../../assets/search.png')} style={styles.serachImage} />
                  <TextInput placeholder="Search Here" style={{marginTop:15}}/>

                </View>

            </View>
        )
    }
}


const styles  = StyleSheet.create({

    blueBoxes:{
        width:"100%",
        height:150,
        paddingLeft:20,
        paddingRight:20,
        alignItems:"center",
        backgroundColor:Colors.blue_btn,
        elevation:10
    },
    textStyle :{
        fontWeight:"normal",
        fontSize:15,
        color:"white"
    },
    headerStyle:{
        alignItems:"flex-start",
        alignSelf:"flex-start",
        flexDirection:'row',
        marginTop:30
    

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
        width:"100%",
        height:45,
        paddingLeft:20,
        paddingRight:20,
        alignItems:"flex-start",
        backgroundColor:"white",
        borderRadius:5,
        flexDirection:"row",
        marginTop:20
        
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
        padding: 10,
      },
})