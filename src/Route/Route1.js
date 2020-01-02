import React from 'react';
import { TouchableOpacity,Image } from 'react-native';
import SignUp from '../SignupStack/SignUp'
import {createAppContainer, createSwitchNavigator ,StackActions,NavigationActions   } from 'react-navigation';
import Visitor from '../SignupStack/Visitor';
import { createBottomTabNavigator ,createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack';

import Splash from '../Splash';
import Home from '../HomeStack/Home';
import SideBar from './Sidebar';
import Department from '../HomeStack/Department';
import DepartmentForm from '../HomeStack/DepartmentForm';
import ForgetPassword from '../SignupStack/ForgetPassword';
import GmpPolicies from '../SignupStack/GmpPolicies';
import SavedForm from '../SavedFormStack/SavedForm';
import Colors from '../Utility/Colors';
import CustomHeader from '../CustomUI/CustomHeader';
import SubmittedForm from '../SavedFormStack/SubmittedForm';
import ChangePassword from '../ChangePasswordStack/ChangePassword';
import ApprovedForm from '../ApprovedFormStack/ApprovedForm';
import RejectedForm from '../ApprovedFormStack/RejectedForm';
import CorrectiveAction from '../CorrectiveStack/CorrectiveAction';
import Report from '../ReportsStack/Report';


const homeStack = createStackNavigator({

    Home:{
        screen:Home
    },
    Department,
    DepartmentForm,
},
{
    initialRouteName: 'Home',
})


const changePasswordStack = createStackNavigator({

    ChangePassword:{
        screen:ChangePassword,
        navigationOptions: ({ navigation }) => ({  //navigation is used for setting custiom title from prev
            title: "Change Password",

            headerLeft: (
            <TouchableOpacity  onPress={() => {navigation.navigate('HomeScreen')}}>
            <Image style={{width: 25, height: 25,margin:10,alignSelf:"center"}}  source={require('../../assets/back.png')} />
            </TouchableOpacity>

            ),
          
              headerStyle:{
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:Colors.blue_btn,
              },
               headerTitleStyle: { color: 'white' ,fontSize:16, fontWeight:"bold",alignSelf:"center"},

    }),
  
    },
   
},
);



const departmentStack = createStackNavigator({

    SavedForm:{
        screen:SavedForm,
        navigationOptions: ({ navigation }) => ({  //navigation is used for setting custiom title from prev
            title: "Saved QF Forms",
    
            headerLeft: (
            <TouchableOpacity  onPress={() => {navigation.navigate('HomeScreen')}}>
            <Image style={{width: 25, height: 25,margin:10,alignSelf:"center"}}  source={require('../../assets/back.png')} />
            </TouchableOpacity>
    
            ),
          
              headerStyle:{
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:Colors.blue_btn,
              },
               headerTitleStyle: { color: 'white' ,fontSize:16, fontWeight:"bold",alignSelf:"center"},
    
        }),
    },

    DepartmentForm

},{
    initialRouteName:"SavedForm"
})



const savedFormStack = createStackNavigator({

    SavedForm :{
        screen:departmentStack,
        
       
    },

    // DepartmentForm: {
    //     screen: DepartmentForm,
    //     navigationOptions:()=>{
    //         return {
    //           tabBarVisible:false,
    //         };
    //    }
    // },

   
       
});


const submiitedFormStack = createStackNavigator({

    SubmittedForm :{
        screen:SubmittedForm,
        navigationOptions: ({ navigation }) => ({  //navigation is used for setting custiom title from prev
            title: "Submitted QF Forms",

            headerLeft: (
            <TouchableOpacity  onPress={() => {navigation.navigate('HomeScreen')}}>
            <Image style={{width: 25, height: 25,margin:10,alignSelf:"center"}}  source={require('../../assets/back.png')} />
            </TouchableOpacity>

            ),
          
              headerStyle:{
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:Colors.blue_btn,
              },
               headerTitleStyle: { color: 'white' ,fontSize:16, fontWeight:"bold",alignSelf:"center"},

    }),
    
    },
    
             
},{
    initialRouteName:'SubmittedForm'
});





const savedOfFormBottomNavigator = createBottomTabNavigator(  
    {  
        'Saved':{
            screen:savedFormStack,
            navigationOptions:{
                header:null,
                headerMode:"none",
                tabBarLabel:'SAVED FORMS',  
                   tabBarOnPress: ({ navigation, defaultHandler }) => {
                
                navigation.navigate('SavedForm')
                const resetAction = StackActions.reset({
                  index: 0,
                  //key: 'HomeScreen',
                  actions: [NavigationActions.navigate({ routeName: 'SavedForm',
                  params: {
                    //iseditable: 1   // this second parameter is for sending the params
                }  })],
                })
                navigation.dispatch(resetAction);
              }
            
                
              },
           
            
            },
        

        'Submitted':{
            screen:submiitedFormStack,
            navigationOptions:{
                header:null,
                headerMode:"none",
                tabBarLabel:'SUBMITTED FORMS',  
                 tabBarOnPress: ({ navigation, defaultHandler }) => {
                
                navigation.navigate('SubmittedForm')
                const resetAction = StackActions.reset({
                  index: 0,
                  //key: 'HomeScreen',
                  actions: [NavigationActions.navigate({ routeName: 'SubmittedForm',
                  params: {
                    //iseditable: 1   // this second parameter is for sending the params
                }  })],
                })
                navigation.dispatch(resetAction);
              }
                
            },
           
            
            
        } ,  
        
             
    },  
    {
        initialRouteName: 'Saved',
        tabBarOptions: {
           activeTintColor:"#FD8D45",
           style: {
            marginBottom:5,
            height: 60,
            borderTopWidth: 1,
            
        },
       
    }}
)  ;



const approvedFormBottomNavigator = createBottomTabNavigator(  
    {  
        'Approved':{
            screen:ApprovedForm,
            navigationOptions:{
                header:null,
                headerMode:"none",
                tabBarLabel:'APPROVED FORMS',  
            
                
              }
            },
        

        'Rejected':{
            screen:RejectedForm,
            navigationOptions:{
                header:null,
                headerMode:"none",
                tabBarLabel:'REJECTED FORMS',  
                
            }
            
        } ,  
        
    },  
    {
        initialRouteName: 'Approved',
        tabBarOptions: {
           activeTintColor:"#FD8D45",
           style: {
            marginBottom:5,
            height: 60,
            borderTopWidth: 1,
            
        },
       
    }}
)  


const approvedFormTopStack = createStackNavigator({

    ApprovedForm :{
        screen:approvedFormBottomNavigator,
        navigationOptions: ({ navigation }) => ({  //navigation is used for setting custiom title from prev
            title: "Approved QF Forms",

            headerLeft: (
            <TouchableOpacity  onPress={() => {navigation.navigate('HomeScreen')}}>
            <Image style={{width: 25, height: 25,margin:10,alignSelf:"center"}}  source={require('../../assets/back.png')} />
            </TouchableOpacity>

            ),
          
              headerStyle:{
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:Colors.blue_btn,
              },
               headerTitleStyle: { color: 'white' ,fontSize:16, fontWeight:"bold",alignSelf:"center"},

    }),
  
       
    }

})

const approvedFormStack = createStackNavigator({

    ApprovedForm :{
        screen:approvedFormTopStack,
        navigationOptions:{
            header:null
        }
        
       
    },
    DepartmentForm,
     
       
     
             
},{
    initialRouteName:'ApprovedForm'
});

const correctiveFormSatck = createStackNavigator({

    CorrectiveForm :{
        screen:CorrectiveAction,
        navigationOptions: ({ navigation }) => ({  //navigation is used for setting custiom title from prev
            title: "Corrective QF Forms",

            headerLeft: (
            <TouchableOpacity  onPress={() => {navigation.navigate('HomeScreen')}}>
            <Image style={{width: 25, height: 25,margin:10,alignSelf:"center"}}  source={require('../../assets/back.png')} />
            </TouchableOpacity>

            ),
          
              headerStyle:{
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:Colors.blue_btn,
              },
               headerTitleStyle: { color: 'white' ,fontSize:16, fontWeight:"bold",alignSelf:"center"},

    }),
  
       
    },
    DepartmentForm,
     
       
     
             
},{
    initialRouteName:'CorrectiveForm'
});

const holdReleaseLogSatck = createStackNavigator({

    HoldRelease :{
        screen:CorrectiveAction,
        navigationOptions: ({ navigation }) => ({  //navigation is used for setting custiom title from prev
            title: "Hold Release Forms",

            headerLeft: (
            <TouchableOpacity  onPress={() => {navigation.navigate('HomeScreen')}}>
            <Image style={{width: 25, height: 25,margin:10,alignSelf:"center"}}  source={require('../../assets/back.png')} />
            </TouchableOpacity>

            ),
          
              headerStyle:{
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:Colors.blue_btn,
              },
               headerTitleStyle: { color: 'white' ,fontSize:16, fontWeight:"bold",alignSelf:"center"},

    }),
  
       
    },
    DepartmentForm,
     
       
     


},{
    initialRouteName:'HoldRelease'

});

const reportStack =  createStackNavigator({

    Report :{
        screen:CorrectiveAction,
        navigationOptions: ({ navigation }) => ({  //navigation is used for setting custiom title from prev
            title: "Reports",

            headerLeft: (
            <TouchableOpacity  onPress={() => {navigation.navigate('HomeScreen')}}>
            <Image style={{width: 25, height: 25,margin:10,alignSelf:"center"}}  source={require('../../assets/back.png')} />
            </TouchableOpacity>

            ),
          
              headerStyle:{
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:Colors.blue_btn,
              },
               headerTitleStyle: { color: 'white' ,fontSize:16, fontWeight:"bold",alignSelf:"center"},

    }),
  
    }

},{
    initialRouteName:'Report'
})

const drawerNavigator  = createDrawerNavigator({

    HomeScreen:{
         screen :homeStack
    } ,

    SavedForm :{
        screen : savedOfFormBottomNavigator,
        
    },
    ApprovedForm:{
        screen:approvedFormStack
    },
    CorrectiveForm:{
        screen:correctiveFormSatck
    },
    HoldRelease:{
        screen:holdReleaseLogSatck
    },
    Report:{
        screen:reportStack
    },
    ChangePasswordScreen:{
        screen:changePasswordStack
    }
   
     
 },{
     initialRouteName:"HomeScreen",
     contentComponent:  SideBar  ,
 })

const signUpStack = createStackNavigator({

   SignUp:{
       screen:SignUp,
       navigationOptions:{
           header:null
       }
   },
   Visitor:{
       screen:Visitor
   },
   ForgetPassword:{
       screen:ForgetPassword
   },
   GmpPolicies:{
       screen:GmpPolicies
   }

},
{
    initialRouteName:"SignUp",
        //headerMode: 'none',
});




const AppContainer = createSwitchNavigator({

    Splash:Splash,
    SignUpStack:signUpStack,
    HomeDrawer:drawerNavigator,

})

export default createAppContainer(AppContainer);

