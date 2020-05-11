import React from 'react'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie } from 'victory-native'
import { View, Text, ScrollView, Modal, TouchableHighlight, Button, TouchableWithoutFeedback, TouchableHighlightBase } from 'react-native'
import { inject, observer } from 'mobx-react'
import styles from '../css/ChartsScreenCss'
import SelfadaptModal from 'react-native-selfadapt-modal'
import DateTimePicker from '@react-native-community/datetimepicker'
import Ionicons from 'react-native-vector-icons/Ionicons'

class PieChart extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const data = [
            { quarter: 1, earnings: 13000 },
            { quarter: 2, earnings: 16500 },
            { quarter: 3, earnings: 14250 },
            { quarter: 4, earnings: 19000 }
        ]
        return (
            <View>
                <View>
                    <VictoryPie
                        data={[
                            { x: "Cats", y: 35 },
                            { x: "Dogs", y: 40 },
                            { x: "Birds", y: 55 }
                        ]}
                    />
                </View>
            </View>
        )
    }
}

export default PieChart

