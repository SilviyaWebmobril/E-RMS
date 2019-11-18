import React ,{Component} from 'react';
import {View ,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CategoryItem from './CategoryItem';
import CustomHeader from '../CustomUI/CustomHeader';

export default class Home extends Component {

    static navigationOptions = {
        // headerTitle instead of title
        header: () => <CustomHeader nav={navigation}/>,
      };

    
    constructor(props){
        super(props);
        this.state ={
            isSec :true,
            department:[
                {
                    'id' : 1 , 'value' :"Outbound Truck"
                },
                {
                    'id' : 2 , 'value' :"Picking"
                },
                {
                    'id' : 3 , 'value' :"Preventaive Maintainence"
                },
                {
                    'id' : 4 , 'value' :"Processing"
                },
                {
                    'id' : 5 , 'value' :"Quality Assurance"
                },
                {
                    'id' : 6 , 'value' :"Receiving"
                },
                {
                    'id' : 7 , 'value' :"Shipping"
                },
                {
                    'id' : 8 , 'value' :"SSOP"
                },
                {
                    'id' : 9 , 'value' :"Storage"
                },
                {
                    'id' : 10 , 'value' :"Training"
                },
                

            ]
        }
    }
    next(item){
        let obj ={
            'name':item.value
        }
        //alert("passing"+item.value)
        this.props.navigation.navigate('Department',{result:obj})
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
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <Text style={styles.departmentStyle}>Select Department</Text>

                    <FlatList
                      numColumns={2}
                      data={this.state.department}
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