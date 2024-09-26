import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Contacto from './componentes/Contacto';
import { PrincipalStack, PresentacionStack } from './componentes/Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DescargoResponsabilidad from './componentes/DescargoResponsabilidad';
import SeguridadDatos from './componentes/SeguridadDatos';
import PoliticaPrivacidad from './componentes/PoliticaPrivacidad';

enableScreens();

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator 
          initialRouteName="Principal"
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              backgroundColor: '#f7f7f7', // Cambia el color de fondo del drawer
            },
            drawerLabelStyle: {
              fontSize: 18, // Tamaño de la fuente del label
              marginLeft: -10, // Mover el texto un poco a la izquierda
            },
            drawerActiveTintColor: '#007AFF', // Color cuando se selecciona un ítem
            drawerInactiveTintColor: '#333', // Color de ítems no seleccionados
          }}
        >
          <Drawer.Screen
            name="Inicio"
            component={PrincipalStack}
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" size={size} color={color} />
              ),
              drawerLabel: 'Inicio',
            }}
          />
          
          <Drawer.Screen
            name="Contacto"
            component={Contacto}
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="email" size={size} color={color} />
              ),
              drawerLabel: 'Contacto',
            }}
          />
          
          <Drawer.Screen
            name="Cómo funciona"
            component={PresentacionStack}
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="information-outline" size={size} color={color} />
              ),
              drawerLabel: 'Cómo funciona',
            }}
          />
          
          <Drawer.Screen
            name="Datos seguros"
            component={SeguridadDatos}
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="lock-outline" size={size} color={color} />
              ),
              drawerLabel: 'Datos seguros',
            }}
          />

          <Drawer.Screen
            name="Responsabilidad"
            component={DescargoResponsabilidad}
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="shield-alert-outline" size={size} color={color} />
              ),
              drawerLabel: 'Descargo de responsabilidad',
            }}
          />
          
          <Drawer.Screen
            name="Política de Privacidad"
            component={PoliticaPrivacidad}
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="file-document-outline" size={size} color={color} />
              ),
              drawerLabel: 'Política de Privacidad',
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
});

export default App;
