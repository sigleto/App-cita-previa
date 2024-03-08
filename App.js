import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Contacto from './componentes/Contacto';
import { PrincipalStack, PresentacionStack } from './componentes/Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import DescargoResponsabilidad from './componentes/DescargoResponsabilidad';
import SeguridadDatos from './componentes/SeguridadDatos';
import PoliticaPrivacidad from './componentes/PoliticaPrivacidad';

enableScreens();

const Drawer = createDrawerNavigator();

const App = ({ navigation }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer >
        <Drawer.Navigator  initialRouteName="Principal"screenOptions={{ headerShown: false }}  >
          
          <Drawer.Screen name="Inicio" component={PrincipalStack}
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" size={size} color={color} />
              ), drawerLabelStyle: {
                fontSize: 20,
              }
            }}
            />
          <Drawer.Screen name="Contacto" component={Contacto}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="email" size={size} color={color} />
            ),drawerLabelStyle: {
              fontSize: 20,
             
            }
          }}
           />
          <Drawer.Screen name="Cómo funciona" component={PresentacionStack} 
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="information" size={size} color={color} />
            ),drawerLabelStyle: {
              fontSize: 20,
            }
          }}
          />
          <Drawer.Screen name="Datos seguros" component={SeguridadDatos} 
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="security" size={size} color={color} />
            ),drawerLabelStyle: {
              fontSize: 20,
            }
          }}
          />
          <Drawer.Screen name="Responsabilidad" component={DescargoResponsabilidad} 
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-details" size={size} color={color} />
            ),drawerLabelStyle: {
              fontSize: 20,
            }
          }}
          />
          <Drawer.Screen name="Politica" component={PoliticaPrivacidad} 
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-details" size={size} color={color} />
            ),drawerLabelStyle: {
              fontSize: 20,
            }
          }}
          />
         
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  datos:{
    backgroundColor:"red",
  },
});

export default App;
