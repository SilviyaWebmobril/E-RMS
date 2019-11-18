import React from 'react';
import SignUp from '../SignupStack/SignUp'
import {createAppContainer, createSwitchNavigator    } from 'react-navigation';
import Visitor from '../SignupStack/Visitor';

import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack';

import Splash from '../Splash';
import Home from '../HomeStack/Home';
import SideBar from './Sidebar';
import Department from '../HomeStack/Department';


const homeStack = createStackNavigator({

    Home,
    Department
},
{
    initialRouteName: 'Home',
})

const drawerNavigator  = createDrawerNavigator({

    HomeScreen:{
         screen :homeStack
    } ,
     
  
 
 
     
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
   }

},
{
    initialRouteName:"SignUp",
        //headerMode: 'none',
    });



const AppContainer = createSwitchNavigator({

    Splash:Splash,
    SignUpStack:signUpStack,
    HomeDrawer:drawerNavigator      ,

})

export default createAppContainer(AppContainer);

