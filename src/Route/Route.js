import React from 'react';
import { TouchableOpacity,Image } from 'react-native';
import SignUp from '../SignupStack/SignUp'
import {createAppContainer, createSwitchNavigator    } from 'react-navigation';
import Visitor from '../SignupStack/Visitor';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
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
        screen:ChangePassword
    },
   
},
)




const savedOfFormTopNavigator = createMaterialTopTabNavigator(  
    {  
        Saved:SavedForm,
        Submitted: SubmittedForm,  
        //Settings: SettingScreen,  
    },  
    {  
        tabBarOptions: {  
            activeTintColor: Colors.blue_btn,  
            inactiveTintColor: Colors.black,
            //showIcon: true,  
            pressColor:'#808080',
            indicatorStyle:{
                backgroundColor:Colors.blue_btn
            },
            //showLabel:true,  
            style: {  
                backgroundColor:'#ECECEC'  ,
               

            }  
        },  
    }  
)  


const savedFormTopStack = createStackNavigator({

    SavedForm :{
        screen:savedOfFormTopNavigator,
        navigationOptions: ({ navigation }) => ({  //navigation is used for setting custiom title from prev
           

            headerLeft: (
            <TouchableOpacity onPress={() => {navigation.navigate('HomeScreen')}}>
            <Image style={{width: 25, height: 25,margin:10}}  source={require('../../assets/back.png')} />
            </TouchableOpacity>

            ),
          
              headerStyle:{
                backgroundColor:Colors.blue_btn,
                elevation:10,paddingTop:Platform.OS === 'ios' ? 0 :  30,
                //paddingBottom:Header.HEIGHT / 2,
                paddingBottom:25,
              },
               headerTitleStyle: { color: 'white' ,fontSize:16},

    }),
  
       
    }

})

const savedFormStack = createStackNavigator({

    SavedForm :{
        screen:savedFormTopStack,
        navigationOptions:{
            header:null
        }
        
       
    },
    DepartmentForm,
     
       
     
             
},{
    initialRouteName:'SavedForm'
});

const approvedFormTopNavigator = createMaterialTopTabNavigator(  
    {  
        Saved:SavedForm,
        Submitted: SubmittedForm,  
        //Settings: SettingScreen,  
    },  
    {  
        tabBarOptions: {  
            activeTintColor: Colors.blue_btn,  
            inactiveTintColor: Colors.black,
            //showIcon: true,  
            pressColor:'#808080',
            indicatorStyle:{
                backgroundColor:Colors.blue_btn
            },
            //showLabel:true,  
            style: {  
                backgroundColor:'#ECECEC'  ,
               

            }  
        },  
    }  
)  


const approvedFormTopStack = createStackNavigator({

    ApprovedForm :{
        screen:approvedFormTopNavigator,
        navigationOptions: ({ navigation }) => ({  //navigation is used for setting custiom title from prev
           

            headerLeft: (
            <TouchableOpacity onPress={() => {navigation.navigate('HomeScreen')}}>
            <Image style={{width: 25, height: 25,margin:10}}  source={require('../../assets/back.png')} />
            </TouchableOpacity>

            ),
          
              headerStyle:{
                backgroundColor:Colors.blue_btn,
                elevation:10,paddingTop:Platform.OS === 'ios' ? 0 :  30,
                //paddingBottom:Header.HEIGHT / 2,
                paddingBottom:25,
              },
               headerTitleStyle: { color: 'white' ,fontSize:16},

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
})

const drawerNavigator  = createDrawerNavigator({

    HomeScreen:{
         screen :homeStack
    } ,

    SavedForm :{
        screen : savedFormStack,
        
    },
    ApprovedForm:{
        screen:approvedFormStack
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

