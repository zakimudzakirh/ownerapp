import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const persistConfig = {
    key: 'ownerapp-v1',
    storage: AsyncStorage,
    timeout: null,
    whitelist: ['master']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
)

let persistor = persistStore(store);

export { store, persistor }