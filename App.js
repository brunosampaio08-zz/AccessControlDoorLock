//Required to be first beacuse of navigation
import 'react-native-gesture-handler';

//React imports
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,} from 'react-native';

//Google Signin import
import {GoogleSignin} from '@react-native-community/google-signin'

//Navigation import
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem} from '@react-navigation/drawer'

//Firebase import
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

//Components import
import SigninPage from './components/SigninPage';
import HomePageStackScreen from './routes/HomePageStackScreen';
import UserSchedStackScreen from './routes/UserSchedStackScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [userInfo, setUserInfo] = useState();

  function configureGoogleSignin() {
    GoogleSignin.configure({
      webClientId: '959658651855-pfj1va0r7gglohl7ti4kef7t7an7um7l.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }
  
  useEffect(() => {
    configureGoogleSignin();

    const subscribe = firebase.auth().onAuthStateChanged(user => {
      setUserInfo(user);
      console.log(user);
    });
    
    return subscribe;
    
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      firebase.auth().signOut();
    } catch (error) {
      ToastAndroid.show(error.toString(), 15);
    }
  }
  
  return (
      <NavigationContainer>
          {
            userInfo == null ? (
              <Stack.Navigator>
<<<<<<< HEAD
                <Stack.Screen name = "SigninPage" component = {SigninPage} options={{
                    title:'',
                    headerShown: false,
                }} />
=======
                <Stack.Screen name = "SigninPage" component = {SigninPage}/>
>>>>>>> master
              </Stack.Navigator>
            ) : (
              <Drawer.Navigator initialRouteName="Home" drawerContent={props => {
                return (
                  <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem label="Logout" onPress={signOut} />
                  </DrawerContentScrollView>
                )
              }}>
                <Drawer.Screen name= "HomePage" component={HomePageStackScreen}/>
                <Drawer.Screen name= "MySchedule" component={UserSchedStackScreen}/>
              </Drawer.Navigator>
            )
          }
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
  
});

export default App;
