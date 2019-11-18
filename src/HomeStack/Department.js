import React ,{Component} from 'react';
import {View ,Text,Image, TocuhableOpacity,StyleSheet,FlatList,TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomHeaderDepartment from '../CustomUI/CustomHeaderDepartment';
import CategoryItem from '../HomeStack/CategoryItem';
export default class Department extends Component {


      static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
          return{
            header: () => <CustomHeaderDepartment name={navigation.getParam("result")['name']} nav={navigation}/>,
          }
      
      };

      state= {
          forms:[
              {'id':1,'value':'QF001 Form'},
              {'id':2,'value':'QF002 Receiving'},
              {'id':3,'value':'QF003 Shipping'},
              {'id':4,'value':'QF003 Sreddy'}
          ]
      }

      renderItem(data){
        let { item, index } = data;
       
        return(
            <TouchableOpacity >
                <CategoryItem data={item} />
            </TouchableOpacity>
           
        );

      }
    


    render(){
        return(
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