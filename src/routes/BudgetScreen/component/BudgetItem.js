import React from 'react'
import { View, Text, TextInput, TouchableHighlight } from 'react-native'
import styles from '../css/BudgetItemCss'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MyIconFont from '../../../components/icon/iconfont'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'

@inject('budgetStore', 'homeStore') // 注入对应的 store
@observer // 监听当前组件
class BudgetItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            label: undefined,
            icon: undefined,
            money: '0'
        }
    }
    componentDidMount() {
        const { label, icon, budget_type, budget_id, budget_money } = this.props.route.params
        this.setState({
            label,
            icon,
            budget_type,
            budget_id,
            money: budget_money ? budget_money.toString() : '0'
        })
    }
    handleInput = text => {
        this.setState({
            money: text
        })
    }
    editBudgetItem = async () => {
        const { icon, label, money, budget_type, budget_id } = this.state
        const { refresh } = this.props.route.params
        await this.props.budgetStore.setBudgetItem({
            budget_icon: icon,
            budget_name: label,
            budget_money: parseInt(money),
            budget_type,
            budget_id
        })
        await refresh()
        this.props.navigation.goBack()
    }
    getType = (type = 1) => {
        const textObj = {
            0: '年',
            1: '月',
            2: '周',
        }
        return textObj[type]
    }
    render() {
        const { icon, label, money, budget_type } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.labelText}>消费类型：</Text>
                    <MyIconFont name={icon} size={16} color="#FF9D6F" style={styles.icon} />
                    <Text>{label}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.labelText}>预算周期：</Text>
                    <Text style={styles.labelText}>{this.getType(budget_type)}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.labelText}>消费金额：</Text>
                    <TextInput
                        style={styles.itemInput}
                        onChangeText={(text) => this.handleInput(text)}
                        value={money}
                    />
                </View>
                <TouchableHighlight
                    onPress={() => this.editBudgetItem()}
                    style={styles.confirmButton}
                    underlayColor="#fcaf17">
                    <Text>确定</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
export default BudgetItem
