
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler'
import React from 'react'
import { Text } from 'react-native'
import RootsBar from './components/Tab/TabNavigate'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import ScanScreen from './routes/ProfileScreen/ScanScreen'
import RecommendScreen from './routes/ProfileScreen/RecommendScreen'
import SettingScreen from './routes/ProfileScreen/SettingScreen'
import SuggestScreen from './routes/ProfileScreen/SuggestScreen'
import WarnScreen from './routes/ProfileScreen/WarnScreen'
import RegistScreen from './routes/ProfileScreen/component/RegistScreen'
import BudgetSetting from './routes/BudgetScreen/component/BudgetSetting'
import BudgetItem from './routes/BudgetScreen/component/BudgetItem'
import BudgetType from './routes/BudgetScreen/component/BudgetType'
import BillsScreen from './routes/EditBillScreen/component/BillsScreen'
import AddBill from './routes/EditBillScreen/component/AddBill'
import ChartsScreen from './routes/EditBillScreen/component/ChartsScreen'
import BillInfo from './routes/EditBillScreen/component/BillInfo'
import Share from './routes/EditBillScreen/component/Share'
import BillMembers from './routes/EditBillScreen/component/BillMembers'
import RecordInfo from './routes/EditBillScreen/component/RecordInfo'
import LoginRegist from './routes/ProfileScreen/component/LoginRegist'
import SettingAvatar from './routes/ProfileScreen/component/SettingAvatar'

import { inject, observer } from 'mobx-react'
import { billColors } from './utils/const'
import billStore from '../store/BillStore'
import { observe } from 'mobx'
import storage from './utils/storage'
const Stack = createStackNavigator()


@inject(["budgetStore"])
@observer
class StackContainer extends React.Component {
  async componentDidMount() {
  }
  render() {
    return (
      <Stack.Navigator
        initialRouteName="StackHome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fcaf17',
            height: 60
          },
          headerBackTitleVisible: false,
          headerBackImage: () => <Ionicons name="ios-arrow-round-back" size={30} />,
          headerLeftContainerStyle: {
            paddingLeft: 8,
            width: 50
          }
        }}>
        <Stack.Screen
          name="StackHome"
          component={RootsBar}
          options={{
            headerStyle: {
              // height: 
            },
            headerShown: false
          }}
        />
        <Stack.Screen
          name="BillContainer"
          component={BillContainer}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="BudgetContainer"
          component={BudgetContainer}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ProfileContainer"
          component={ProfileContainer}
          options={{
            headerShown: false
          }}
        // options={{
        // 	headerShown: false
        // }}
        />
      </Stack.Navigator>
    )
  }
}
export default StackContainer

@inject(["budgetStore"])
@observer
class BudgetContainer extends React.Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fcaf17',
            height: 60
          },
          headerBackTitleVisible: false,
          // headerBackImage: () => <Ionicons name="ios-arrow-round-back" size={30} />,
          // headerLeftContainerStyle: {
          //   paddingLeft: 8,
          //   width: 50
          // }
          headerLeft: () => <Ionicons onPress={() => { this.props.navigation.goBack() }} name="ios-arrow-round-back" size={30} />,
            headerLeftContainerStyle: {
              paddingLeft: 8,
              width: 50
            }
        }}
      >
        <Stack.Screen
          name="BudgetSetting"
          component={BudgetSetting}
          options={{
            title: '预算设置',
            headerRight: () => <Text onPress={() => this.props.budgetStore.setHandleConfirm(true)}>确定</Text>,
            headerRightContainerStyle: {
              marginRight: 8,
              fontSize: 16
            },
          }}
        />
        <Stack.Screen
          name="BudgetItem"
          component={BudgetItem}
          options={{
            title: '预算设置',
          }}
        />
        <Stack.Screen
          name="BudgetType"
          component={BudgetType}
          options={{
            title: '预算类型',
          }}
        />
      </Stack.Navigator>
    )
  }
}

@inject(["profileStore"])
@observer
class ProfileContainer extends React.Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fcaf17',
            height: 60
          },
          headerBackTitleVisible: true,
          headerBackImage: () => <Ionicons name="ios-arrow-round-back" size={30} />,
          headerLeftContainerStyle: {
            paddingLeft: 8,
            width: 50
          }
        }}
      >
        <Stack.Screen
          name="LoginRegist"
          component={LoginRegist}
          options={{
            // headerShown: false
            title: '注册 | 登录',
            headerLeft: () => <Ionicons onPress={() => { this.props.navigation.goBack() }} name="ios-arrow-round-back" size={30} />,
            headerLeftContainerStyle: {
              paddingLeft: 8,
              width: 50
            }
          }}
        />
        <Stack.Screen
          name="Recommend"
          component={RecommendScreen}
          options={{
            title: '推荐给朋友',
            headerLeft: () => <Ionicons onPress={() => { this.props.navigation.goBack() }} name="ios-arrow-round-back" size={30} />,
            headerLeftContainerStyle: {
              paddingLeft: 8,
              width: 50
            }
          }}
        />
        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            title: '设置',
            headerLeft: () => <Ionicons onPress={() => { this.props.navigation.goBack() }} name="ios-arrow-round-back" size={30} />,
            headerLeftContainerStyle: {
              paddingLeft: 8,
              width: 50
            }
          }}
        />
        <Stack.Screen
          name="SettingAvatar"
          component={SettingAvatar}
          options={{
            title: '设置头像',
            headerLeft: () => <Ionicons onPress={() => { this.props.navigation.goBack() }} name="ios-arrow-round-back" size={30} />,
            headerLeftContainerStyle: {
              paddingLeft: 8,
              width: 50
            }
          }}
        />
        <Stack.Screen
          name="Suggest"
          component={SuggestScreen}
          options={{
            title: '意见反馈',
            headerLeft: () => <Ionicons onPress={() => { this.props.navigation.goBack() }} name="ios-arrow-round-back" size={30} />,
            headerLeftContainerStyle: {
              paddingLeft: 8,
              width: 50
            }
          }}
        />
        <Stack.Screen
          name="Warn"
          component={WarnScreen}
          options={{
            title: '标签管理',
            headerLeft: () => <Ionicons onPress={() => { this.props.navigation.goBack() }} name="ios-arrow-round-back" size={30} />,
            headerLeftContainerStyle: {
              paddingLeft: 8,
              width: 50
            }
          }}
        />
        <Stack.Screen
          name="Scan"
          component={ScanScreen}
          options={{
            title: '扫一扫',
            // headerBackTitle: '返回',
            headerRight: () => <Text>相册</Text>,
            headerRightContainerStyle: {
              color: 'red',
              marginRight: 8,
              fontSize: 16
            },
            headerLeft: () => <Ionicons onPress={() => { this.props.navigation.goBack() }} name="ios-arrow-round-back" size={30} />,
            headerLeftContainerStyle: {
              paddingLeft: 8,
              width: 50
            }
          }}
        />
      </Stack.Navigator>
    )
  }
}

@inject(["billStore"])
@observer
class BillContainer extends React.Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fcaf17',
            height: 60
          }
        }}
      >
        <Stack.Screen
          name="Bills"
          component={BillsScreen}
          options={{
            title: '账本',
            headerRight: () => <Ionicons name="ios-add" size={24} onPress={() => this.props.navigation.navigate('AddBill')}
            />,
            headerRightContainerStyle: {
              paddingRight: 8
            },
            headerLeft: () => <Ionicons onPress={() => { this.props.navigation.goBack() }} name="ios-arrow-round-back" size={30} />,
            headerLeftContainerStyle: {
              paddingLeft: 8,
              width: 50
            }
          }}
        />
        <Stack.Screen
          name="AddBill"
          component={AddBill}
          options={{
            title: '添加账本',
            headerLeft: () => <Ionicons onPress={() => { this.props.navigation.navigate(this.props.route.params.screen) }} name="ios-arrow-round-back" size={30} />,
            headerLeftContainerStyle: {
              paddingLeft: 8,
              width: 50
            },
          }}
        />
        <Stack.Screen
          name="BillInfo"
          component={BillInfo}
          options={{
            title: '账本详情',
            headerLeft: () => <Ionicons onPress={() => { this.props.navigation.navigate('Bills') }} name="ios-arrow-round-back" size={30} />,
            headerLeftContainerStyle: {
              paddingLeft: 8,
              width: 50
            },
            headerRight: () => <Entypo name="dots-three-horizontal" size={20} onPress={() => billStore.setBillInfoSetting(true)} />,
            headerRightContainerStyle: {
              paddingRight: 8
            }
          }}
        />
        <Stack.Screen
          name="Share"
          component={Share}
          options={{
            title: '二维码',
            headerLeft: () => <Ionicons onPress={() => { this.props.navigation.navigate('BillInfo') }} name="ios-arrow-round-back" size={30} />,
            headerLeftContainerStyle: {
              paddingLeft: 8,
              width: 50
            }
          }}
        />
        <Stack.Screen
          name="BillMembers"
          component={BillMembers}
          options={{
            title: '账本成员',
            headerLeft: () => <Ionicons onPress={() => { this.props.navigation.navigate('BillInfo') }} name="ios-arrow-round-back" size={30} />,
            headerLeftContainerStyle: {
              paddingLeft: 8,
              width: 50
            }
          }}
        />
        <Stack.Screen
          name="RecordInfo"
          component={RecordInfo}
          options={{
            title: '记录详情',
            headerLeft: () => <Ionicons 
            onPress={() => { 
              const { state } = this.props.route
              if (state) {
                this.props.navigation.navigate('BillInfo')
              } else {
                this.props.navigation.goBack() 
              }
            }} 
              name="ios-arrow-round-back" size={30} />,
            headerLeftContainerStyle: {
              paddingLeft: 8,
              width: 50
            },
          }}
        />
        <Stack.Screen
          name="Charts"
          component={ChartsScreen}
          options={{
            title: '图表',
            headerLeft: () => <Ionicons onPress={() => { this.props.navigation.navigate('StackHome') }} name="ios-arrow-round-back" size={30} />,
            headerLeftContainerStyle: {
              paddingLeft: 8,
              width: 50
            },
          }}
        />
      </Stack.Navigator>
    )
  }
}
