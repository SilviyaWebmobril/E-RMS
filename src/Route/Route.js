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
import HoldRelease from '../HoldReleaseStack/HoldRelease'
import EditDepartmentForm from '../HomeStack/EditDepartmentForm';


const homeStack = createStackNavigator({

    Home:{
        screen:Home
    },
    Department,
    DepartmentForm,
},
{
    initialRouteName: 'Home',
});


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
               headerTitleStyle: { color: 'white' ,fontSize:16, fontWeight:"bold",},

    }),
  
    },
   
}); 


const correctiveFormSatck = createStackNavigator({

    CorrectiveForm :{
        screen:CorrectiveAction,
   
  
       
    },
    DepartmentForm:{
        screen:DepartmentForm
    },
     
       
     
             
},{
    initialRouteName:'CorrectiveForm'
});

const holdReleaseLogSatck = createStackNavigator({

    HoldRelease :{
        screen:HoldRelease,
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
        screen:Report,
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
               headerTitleStyle: { color: 'white' ,fontSize:16, fontWeight:"bold",},

    }),
  
    }

},{
    initialRouteName:'Report'
})



// const approvedFormBottomNavigator = createBottomTabNavigator(  
//     {  
//         'Approved':{
//             screen:ApprovedForm,
//             navigationOptions:{
//                 header:null,
//                 headerMode:"none",
//                 tabBarLabel:'APPROVED FORMS',  
                
//                 tabBarOnPress: ({ navigation, defaultHandler }) => {
                
//                     navigation.navigate('ApprovedForm')
//                     const resetAction = StackActions.reset({
//                       index: 0,
//                       //key: 'HomeScreen',
//                       actions: [NavigationActions.navigate({ routeName: 'ApprovedForm',
//                       params: {
//                         //iseditable: 1   // this second parameter is for sending the params
//                     }  })],
//                     })
//                     navigation.dispatch(resetAction);
//                   }
            
                
//               }
//             },
        

//         'Rejected':{
//             screen:RejectedForm,
//             navigationOptions:{
//                 header:null,
//                 headerMode:"none",
//                 tabBarLabel:'REJECTED FORMS',  
                
//             }
            
//         } ,  
        
//     },  
//     {
//         initialRouteName: 'Approved',
//         tabBarOptions: {
//             showIcon:false,
//             labelStyle:{
//                 fontSize:12,
//                 fontWeight:"bold",
//                 textAlign:"center",
//                 justifyContent:"center"
//             },
//            activeTintColor:Colors.blue_btn ,
//            style: {
//             marginBottom:10,
//             height: 40,
//             borderTopWidth: 1,
            
//         },
       
//     }}
// )  


const approvedRejectedFormStack = createStackNavigator({

    ApprovedForm :{
        screen:ApprovedForm,
       
    }
    ,
    EditDepartmentForm:{
        screen:  EditDepartmentForm,
    }
  

})


const savedSubmittedStack = createStackNavigator({

    SavedForm:{
        screen:SavedForm,
        // navigationOptions: ({ navigation }) => ({  //navigation is used for setting custiom title from prev
        //     title: "Saved QF Forms",
    
        //     headerLeft: (
        //     <TouchableOpacity  onPress={() => {navigation.navigate('HomeScreen')}}>
        //     <Image style={{width: 25, height: 25,margin:10,alignSelf:"center"}}  source={require('../../assets/back.png')} />
        //     </TouchableOpacity>
    
        //     ),
          
        //       headerStyle:{
                
        //         backgroundColor:Colors.blue_btn,
        //       },
        //        headerTitleStyle: { color: 'white' ,fontSize:16, fontWeight:"bold",},
    
        // }),
    },
    EditDepartmentForm,

})

const submittedStack = createStackNavigator({

    SubmittedForm:{
        screen:SubmittedForm,
        // navigationOptions: ({ navigation }) => ({  //navigation is used for setting custiom title from prev
        //     title: "Saved QF Forms",
    
        //     headerLeft: (
        //     <TouchableOpacity  onPress={() => {navigation.navigate('HomeScreen')}}>
        //     <Image style={{width: 25, height: 25,margin:10,alignSelf:"center"}}  source={require('../../assets/back.png')} />
        //     </TouchableOpacity>
    
        //     ),
          
        //       headerStyle:{
                
        //         backgroundColor:Colors.blue_btn,
        //       },
        //        headerTitleStyle: { color: 'white' ,fontSize:16, fontWeight:"bold",},
    
        // }),
    },
    DepartmentForm,

})

// const savedFormNavigator  = createBottomTabNavigator({

//     'Saved':{
//         screen:savedStack,
//         navigationOptions:{
//             tabBarLabel:'SAVED FORMS',  
//             tabBarIcon:false,
//             tabBarOnPress: ({ navigation, defaultHandler }) => {
            
//             navigation.navigate('SavedForm')
//             const resetAction = StackActions.reset({
//                 index: 0,
//                 //key: 'HomeScreen',
//                 actions: [NavigationActions.navigate({ routeName: 'SavedForm',
//                 params: {
//                 //iseditable: 1   // this second parameter is for sending the params
//             }  })],
//             })
//             navigation.dispatch(resetAction);
//             }
//         }
//     },
//     'Submitted':{
//         screen:submittedStack,
//         navigationOptions:{
//             tabBarLabel:'SUBMITTED FORMS',  
//             tabBarIcon:false,
//             tabBarOnPress: ({ navigation, defaultHandler }) => {
            
//             navigation.navigate('SubmittedForm')
//             const resetAction = StackActions.reset({
//                 index: 0,
//                 //key: 'HomeScreen',
//                 actions: [NavigationActions.navigate({ routeName: 'SubmittedForm',
//                 params: {
//                 //iseditable: 1   // this second parameter is for sending the params
//             }  })],
//             })
//             navigation.dispatch(resetAction);
//             }
//         }
       
//     }
// },{
//     initialRouteName: 'Saved',
//     tabBarOptions: {
//         showIcon:false,
//         labelStyle:{
//             fontSize:12,
//             fontWeight:"bold",
//             textAlign:"center",
//             justifyContent:"center"
//         },
//        activeTintColor:Colors.blue_btn ,
//        style: {
//         marginBottom:10,
//         height: 40,
//         borderTopWidth: 1,
        
//     },
   
// }});





const drawerNavigator = createDrawerNavigator({

    HomeScreen:{
        screen:homeStack
    },
    SavedForm:{
        screen:savedSubmittedStack
    },
    ApprovedForm:{
        screen:approvedRejectedFormStack,
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

