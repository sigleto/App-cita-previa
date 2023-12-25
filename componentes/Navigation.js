import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './Home';
import Ayuntamientos from './Enlaces/Ayuntamientos';
import ComunidadesAutonomas from './Enlaces/ComunidadesAutonomas';
import Organismos from './Organismos';
import Contacto from './Contacto';
import AEAT from './Enlaces/AEAT';
import SEPE from './Enlaces/SEPE';
import MUFACE from './Enlaces/MUFACE';
import CitaMedica from './Enlaces/CitaMedica';
import Bancos from './Enlaces/Bancos';
import ClasesPasivas from './Enlaces/ClasesPasivas'
import DNI from  './Enlaces/DNI'
import CitaITV from './Enlaces/ITV';
import PermisoConducir from './Enlaces/PermisoConducir'
import Presentacion1 from './Presentacion/Presentacion1';
import Presentacion2 from './Presentacion/Presentacion2';
import Presentacion3 from './Presentacion/Presentacion3';
import PaginasMedicas from './paginas/PaginasMedicas';
import PaginasBancos from './paginas/PaginasBancos';
import PaginasITV from './paginas/PaginasITV';
import PaginasAyuntamientos from './paginas/PaginasAyuntamientos';
import PaginasComunidades from './paginas/PaginasComunidades';
import { AvisoDNI } from './Avisos/AvisoDNI';
import SeguridadSocial from './Enlaces/SeguridadSocial';
import Extranjeria from './Enlaces/Extranjeria';
import RegistrosCiviles from './Enlaces/RegistrosCiviles';
import RegistrosPropiedad from './Enlaces/Registrosdelapropiedad';
import GuardiaCivil from './Enlaces/GuardiaCivil';
import AvisoCitaMedica from './Avisos/AvisoCitaMedica';
import Autentication from './GestionCitas/Autenticacion';
import ConsultarCitas from './GestionCitas/ConsultarCitas';
import EventCalendar from './GestionCitas/EventCalendar';
import { AvisoGestion } from './GestionCitas/AvisoGestion';
import DescargoResponsabilidad from './DescargoResponsabilidad';
import SeguridadDatos from './SeguridadDatos';


const Stack = createStackNavigator();


export function OrganismosStack() {
  return (
    <Stack.Navigator>

      
      <Stack.Screen name="OrganismosStack" component={Organismos}options={{ headerShown: false }} />
      <Stack.Screen name="GestionCitasStack" component={GestionCitasStack}options={{ headerShown: false }} />
      <Stack.Screen name="AEAT" component={AEAT} options={{ headerShown: false }} />
      <Stack.Screen name="Ayuntamientos" component={Ayuntamientos} options={{ headerShown: false }} />
      <Stack.Screen name="ComunidadesAutonomas" component={ComunidadesAutonomas} options={{ headerShown: false }} />
      <Stack.Screen name="SEPE" component={SEPE} options={{ headerShown: false }} />
      <Stack.Screen name="MUFACE" component={MUFACE} options={{ headerShown: false }} />
      <Stack.Screen name="CitaMedica" component={CitaMedica} options={{ headerShown: false }} />
      <Stack.Screen name="Bancos" component={Bancos} options={{ headerShown: false }} />
      <Stack.Screen name="ClasesPasivas" component={ClasesPasivas} options={{ headerShown: false }} />
      <Stack.Screen name="DNI" component={DNI} options={{ headerShown: false }} />
      <Stack.Screen name="CitaITV" component={CitaITV} options={{ headerShown: false }} />
      <Stack.Screen name="PermisoConducir" component={PermisoConducir}options={{ headerShown: false }} />
      <Stack.Screen name="PaginasMedicas" component={PaginasMedicas} options={{ headerShown: false }} />
      <Stack.Screen name="PaginasBancos" component={PaginasBancos} options={{ headerShown: false }} />
      <Stack.Screen name="PaginasITV" component={PaginasITV} options={{ headerShown: false }} />
      <Stack.Screen name="PaginasAyuntamientos" component={PaginasAyuntamientos} options={{ headerShown: false }} />
      <Stack.Screen name="PaginasComunidades" component={PaginasComunidades} options={{ headerShown: false }} />
      <Stack.Screen name="AvisoDNI" component={AvisoDNI} options={{ headerShown: false }} />
       <Stack.Screen name="AvisoCitaMedica" component={AvisoCitaMedica} options={{ headerShown: false }} />
      <Stack.Screen name="SeguridadSocial" component={SeguridadSocial} options={{ headerShown: false }} />
      <Stack.Screen name="Extranjeria" component={Extranjeria} options={{ headerShown: false }} />
      <Stack.Screen name="RegistrosCiviles" component={RegistrosCiviles} options={{ headerShown: false }} />
      <Stack.Screen name="RegistrosPropiedad" component={RegistrosPropiedad} options={{ headerShown: false }} />
      <Stack.Screen name="GuardiaCivil" component={GuardiaCivil} options={{ headerShown: false }} />
      
    </Stack.Navigator>
  );
}

export function GestionCitasStack() {
  return (
    <Stack.Navigator initialRouteName="Autentication">
      <Stack.Screen name="Autentication" component={Autentication} options={{ headerShown: false }} />
      <Stack.Screen name="ConsultarCitas" component={ConsultarCitas} options={{ headerShown: false }} />
      <Stack.Screen name="EventCalendar" component={EventCalendar} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
export function PresentacionStack() {
  return (
    <Stack.Navigator
      initialRouteName="Presentacion1"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        transitionSpec: {
          open: { animation: "timing", config: { duration: 500 } },
          close: { animation: "timing", config: { duration: 500 } },
        },
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress,
            },
          };
        },
      }}
    >
      <Stack.Screen
        name="Presentacion1"
        component={Presentacion1}
        options={() => ({headerShown: false,cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />
      <Stack.Screen
        name="Presentacion2"
        component={Presentacion2}
        options={() => ({headerShown: false,cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />
      <Stack.Screen
        name="Presentacion3"
        component={Presentacion3}
        options={() => ({headerShown: false,cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />
    </Stack.Navigator>
  );
}




export function PrincipalStack(){
  return (
   
      <Stack.Navigator>
        
        <Stack.Screen
          name="Home"
          component={Home}
          options={{  headerShown: false}}
        />
        <Stack.Screen
          name="Organismos"
          component={OrganismosStack}
          options={{  headerShown: false }}
        />
        <Stack.Screen
          name="GestionCitas"
          component={GestionCitasStack}
          options={{  headerShown: false }}
        />
        <Stack.Screen
          name="AvisoGestion"
          component={AvisoGestion}
          options={{  headerShown: false }}
        />

        <Stack.Screen
          name="Contacto"
          component={Contacto}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Seguridad"
          component={SeguridadDatos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Descargo"
          component={DescargoResponsabilidad}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
   
  );
};

const Drawer=createDrawerNavigator()
export function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Contacto" component={Contacto} />
      <Drawer.Screen name="PresentacionStack" component={PresentacionStack} />
      <Drawer.Screen name="SeguridadDatos" component={SeguridadDatos} />
      <Drawer.Screen name="DescargoResponsabilidad" component={DescargoResponsabilidad} />
      <Drawer.Screen
        name="PoliticaPrivacidad"
        component={() => {
          Linking.openURL(
            'https://docs.google.com/document/d/1WeAEvL7FxXA_O4_zxrsrNYAwIotUXOKZeOv_mMZOV-c/edit'
          );
          return null;
        }}
      />
    </Drawer.Navigator>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Color de fondo del contenedor
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  tabBar: {
    backgroundColor: 'lightgray', // Color de fondo de la barra de pestañas
    borderTopWidth: 1, // Grosor de la línea superior
    borderColor: 'gray', // Color de la línea superior
    height: 75,
    backgroundColor:'#d1fa95'
  },
});

