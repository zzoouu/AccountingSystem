import React from 'react'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie } from 'victory-native'
import { View, Text, ScrollView, Modal, TouchableHighlight, Button, TouchableWithoutFeedback, TouchableHighlightBase } from 'react-native'
import { inject, observer } from 'mobx-react'
import styles from '../css/ChartsScreenCss'
import SelfadaptModal from 'react-native-selfadapt-modal'
import DateTimePicker from '@react-native-community/datetimepicker'
import Ionicons from 'react-native-vector-icons/Ionicons'

class LineChart extends React.Component {
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
                    <VictoryChart
                        domainPadding={20}
                    >
                        <VictoryAxis
                            tickValues={[1, 2, 3, 4]}
                            tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={(x) => (`$${x / 1000}k`)}
                        />
                        <VictoryBar
                            data={data}
                            x="quarter"
                            y="earnings"
                        />
                    </VictoryChart>
                </View>
                <View>
                    <VictoryChart>
                        <VictoryBar
                            data={data}
                            x="quarter"
                            y="earnings"
                        />
                    </VictoryChart>
                </View>
            </View>
        )
    }
}

export default LineChart
