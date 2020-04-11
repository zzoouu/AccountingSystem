/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json'
import storage from './src/utils/storage'

global.storage = storage

AppRegistry.registerComponent(appName, () => App);
