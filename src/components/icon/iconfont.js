import createIconSet from 'react-native-vector-icons/lib/create-icon-set'
import glyphMap from './iconfont.json'

const MyIconFont = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf')

export default MyIconFont

export const Button = MyIconFont.Button;
export const TabBarItem = MyIconFont.TabBarItem;
export const TabBarItemIOS = MyIconFont.TabBarItemIOS;
export const ToolbarAndroid = MyIconFont.ToolbarAndroid;
export const getImageSource = MyIconFont.getImageSource;