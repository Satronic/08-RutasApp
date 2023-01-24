import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/router/StackNavigator';
import { PermissionsProvider } from './src/context/permissionsContext';

const AppState = ({ children }: any) => {
  return (
    <PermissionsProvider>
      {children}
    </PermissionsProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer>
  )
};

export default App;