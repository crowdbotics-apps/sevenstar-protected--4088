import React, {Component} from 'react';
import {StatusBar, AsyncStorage} from 'react-native';
import {Provider} from 'react-redux';

import {AppNavigator} from './src/navigators/AppNavigator';
import store from './src/redux/store';
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'

persistor = persistStore(store);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <StatusBar barStyle="dark-content"/>
                    <AppNavigator/>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
