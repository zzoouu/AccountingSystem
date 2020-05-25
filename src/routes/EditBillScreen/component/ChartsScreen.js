import React from 'react'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie, VictoryTooltip, VictoryLine, LineSegment, VictoryZoomContainer, VictoryClipContainer, AxisWrapper, NoopComponent, LinearGradient, VictoryArea, VictoryScatter, Lollipop, VictoryBrushContainer } from 'victory-native'
import { View, Text, TextInput, ScrollView, Modal, TouchableHighlight, Button, TouchableWithoutFeedback, TouchableHighlightBase, FlatList } from 'react-native'
import { inject, observer } from 'mobx-react'
import { styles, progressInfo } from '../css/ChartsScreenCss'
import SelfadaptModal from 'react-native-selfadapt-modal'
import DateTimePicker from '@react-native-community/datetimepicker'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MyIconFont from '../../../components/icon/iconfont'
import * as Progress from 'react-native-progress'
import { monthData, yearData } from '../../../utils/const'
import { toJS } from 'mobx'
import moment from 'moment'

const colorScale = [
  '#FFEFD5', '#FFE4E1', '#FFE4B5', '#FFF8DC', '#FFDEAD', '#FFFF00',
  '#FFDAB9', '#FFD700', '#FFC0CB', '#FFB6C1', '#FFA500', '#FFA07A']

@inject('billStore', 'homeStore')
@observer
class ChartsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chart: undefined,
      option: undefined,
      originData: [],
      dataByMonth: [],
      dataByName: [],
      incomeData: [],
      payData: [],
      isDatePicerVisible: false,
      pickDate: new Date(),
      chartType: 'pie',
      payType: 'pay',
      pieData: [],
      lineData: [],
      totalPay: 0,
      totalIncome: 0,
      totalReamin: 0,
      chosedYear: new Date().getFullYear(),
      chosedMonth: new Date().getMonth() + 1
    }
  }
  componentDidMount() {
    const { records, originRecords } = this.props.homeStore
    this.setState({
      dataByMonth: records,
      originData: originRecords
    }, () => {
      this.formatData()
    })
  }
  timeToString = (time, num) => {
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const day = time.getDate()
    let str = `${year}-${month.toString().padStart(2, '0')}`
    str = num === 2 ? str : `${str}-${day.toString().padStart(2, '0')}`
    return str
  }
  formatData = (records, type, date) => {
    let { payType, chartType, pickDate, originData, dataByMonth, chosedMonth, chosedYear } = this.state
    dataByMonth = toJS(dataByMonth)
    // const { records: dataByMonth } = this.props.homeStore
    let { totalIncome, totalPay, totalReamin } = this.state
    // const choseDate = this.timeToString(pickDate, 2)
    // const choseDate = `${chosedYear}-${chosedMonth}}`
    let arr = []
    let incomeData = []
    let lineData = []
    let payData = []
    let remainData = []
    if (dataByMonth.length) {
      // 根据选中时间筛选数据
      arr = dataByMonth.filter(record => {
        const date = record.title
        let choseDate
        let time
        if (chosedMonth === '-') {
          // 整年
          time = date.substr(0, 4)
          choseDate = chosedYear.toString()
        } else {
          // 按月
          time = date.substr(0, 7)
          choseDate = `${chosedYear}-${chosedMonth.toString().padStart(2, 0)}`
        }
        return time === choseDate
      })
      arr = arr.length ? arr[0].data : []
      // 对每类型的数据金额进行汇总
      let map = {}
      let dataByName = []
      let dataByTime = []
      arr.map(record => {
        const { record_name, record_type, money, icon, number } = record
        if (!map[record_name]) {
          if (record_type === 1) {
            map[record_name] = {
              inMoney: money / number,
              record_name,
              icon,
              inNum: 1,
              payNum: 0,
              payMoney: 0,
              number
            }
          } else {
            map[record_name] = {
              payMoney: money / number,
              record_name,
              icon,
              payNum: 1,
              inNum: 0,
              inMoney: 0,
              number
            }
          }
        } else {
          if (record_type === 1) {
            // let preMoney = map[record_name].inMoney ? map[record_name].inMoney : 0
            map[record_name].inMoney += money / number
            map[record_name].inNum += 1
          } else {
            // let preMoney = map[record_name].payMoney ? map[record_name].payMoney : 0
            map[record_name].payMoney += money / number
            map[record_name].payNum += 1
          }
        }
      })
      dataByName = Object.values(map)
      console.log(dataByName)
      // if (chartType === 'pie') {
      // 处理饼图数据，按消费类型分类
      totalPay = totalReamin = totalIncome = 0
      dataByName.map(record => {
        const { record_name, icon, inMoney, payMoney, inNum, payNum } = record
        if (inNum) {
          let obj = {
            x: record_name,
            y: inMoney,
            icon,
            inNum
          }
          totalIncome += inMoney
          incomeData.push(obj)
        }
        if (payNum) {
          let obj = {
            x: record_name,
            y: payMoney,
            icon,
            payNum
          }
          totalPay += payMoney
          payData.push(obj)
        }
        totalReamin = totalIncome - totalPay
      })
      console.log(dataByName)
      console.log(payData, incomeData)
      remainData = [
        { x: '结余', y: totalReamin },
        { x: '支出', y: totalPay },
      ]
      this.setState({
        totalIncome,
        totalPay,
        totalReamin,
        dataByName,
        incomeData,
        payData
      })
      switch (payType) {
        case 'income':
          this.setState({ pieData: incomeData })
          break
        case 'pay':
          this.setState({ pieData: payData })
          break
        case 'remain':
          this.setState({ pieData: remainData })
          break
      }

      // linedata, 将数据按照时间每天计算支出收入
      let lineobj = {}
      arr.map(record => {
        const { record_date, record_type, money, number } = record
        let time = moment(record_date).format('MM-DD')
        if (!lineobj[time]) {
          if (record_type === 1) {
            lineobj[time] = {
              date: time,
              record_date,
              income: money / number,
              pay: 0
            }
          } else {
            lineobj[time] = {
              date: time,
              record_date,
              pay: money / number,
              income: 0
            }
          }
        } else {
          if (record_type === 1) {
            lineobj[time].income += money / number
          } else {
            lineobj[time].pay += money / number
          }
        }
      })
      dataByTime = Object.values(lineobj)
      let days = moment(pickDate, 'YYYY-MM').daysInMonth()
      let dateObj = moment(pickDate).toObject()
      const { years, months } = dateObj
      let temparr = []
      for (let i = 0; i < days; i++) {
        temparr[i] = {
          // x: moment(new Date(years, months, i + 1)).format('MM-DD'),
          x: new Date(years, months, i + 1),
          y: undefined
        }
      }
      dataByTime.map(item => {
        let index = item.date.substr(4, 2)
        if (payType === 'income') {
          temparr[index].y = item.income
        } else if (payType === 'pay') {
          temparr[index].y = item.pay
        } else {
          temparr[index].y = item.income - item.pay
        }
      })
      // 没添加数据的当天的剩余量处理
      let pre = undefined
      for (let i = 0; i < days; i++) {
        let value = temparr[i]
        if (value.y) {
          pre = value.y
        } else {
          if (!pre) {
            pre = 0
          }
          temparr[i].y = pre
        }
      }
      lineData = temparr
      this.setState({
        lineData
      })
      // }
    }
  }
  doSelect = (res, flag) => {
    // console.log(res, flag)
  }
  handleSelectDate = flag => {
    this.setState({
      isDatePicerVisible: flag
    })
  }
  handleSelect = (e, date) => {
    // console.log(date)
    this.setState({
      pickDate: date
    })
  }
  formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    // const time = `${year}年${month}月${day}日`
    const time = `${year}年${month}月`
    return time
  }
  handlePayType = type => {
    this.setState({
      payType: type
    }, () => {
      this.formatData()
    })
  }
  handleChartType = type => {
    this.setState({
      chartType: type
    }, () => {
      this.formatData()
    })
  }
  handleZoom(domain) {
    this.setState({ selectedDomain: domain });
  }

  handleBrush(domain) {
    this.setState({ zoomDomain: domain });
  }

  getItemProgress = (type, item) => {
    return 0.4
  }
  getItemPercent = money => {
    const { totalIncome, totalPay, payType } = this.state
    let denom = payType === 'income' ? totalIncome : totalPay
    const ret = (money / denom * 100).toFixed(1)
    return (money / denom)
    // return `${ret}%`
  }
  handleSelfModal = (flag, data) => {
    const { chosedMonth, chosedYear } = this.state
    let key = flag === 'year' ? 'chosedYear' : 'chosedMonth'
    console.log(data)
    this.setState({
      [key]: data
    })
  }
  render() {
    const { pickDate, chartType, payType, lineData, pieData, totalIncome, totalPay, totalReamin, incomeData, payData, chosedYear, chosedMonth } = this.state
    return (
      <ScrollView style={[styles.container]} contentContainerStyle={{ alignItems: 'center' }}>
        <View style={styles.commandsLine}>
          <View style={[styles.timePicker, styles.borderRadius]}>
            <TouchableWithoutFeedback
              onPress={() => this.handleSelectDate(true)}>
              <Text style={styles.lineText}>{chosedMonth === '-' ? `${chosedYear}年` : `${chosedYear}年${chosedMonth}月`}</Text>
            </TouchableWithoutFeedback>
            <Ionicons name="ios-arrow-down" size={16} color="black" />
          </View>
        </View>
        <View style={[styles.commandsLine, { height: 60 }]}>
          <TouchableHighlight
            style={[styles.sumItem, payType === 'pay' && styles.choseSumItem]}
            underlayColor="#fff"
            onPress={() => this.handlePayType('pay')}
          >
            <>
              <Text>{totalPay}</Text>
              <Text style={styles.sumText}>总支出</Text>
            </>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.sumItem, payType === 'income' && styles.choseSumItem]}
            underlayColor="#fff"
            onPress={() => this.handlePayType('income')}
          >
            <>
              <Text>{totalIncome}</Text>
              <Text style={styles.sumText}>总收入</Text>
            </>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.sumItem, payType === 'remain' && styles.choseSumItem]}
            underlayColor="#fff"
            onPress={() => this.handlePayType('remain')}
          >
            <>
              <Text>{totalReamin}</Text>
              <Text style={styles.sumText}>总结余</Text>
            </>
          </TouchableHighlight>
        </View>
        <View style={styles.charts}>
          <View style={[styles.chartLine, styles.borderRadius]}>
            <TouchableHighlight
              style={[styles.chartTab, chartType === 'pie' && styles.choseChartTab]}
              onPress={() => this.handleChartType('pie')}
              underlayColor="#fff"
            >
              <Text>饼图</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.chartTab, chartType === 'line' && styles.choseChartTab]}
              onPress={() => this.handleChartType('line')}
              underlayColor="#fff"
            >
              <Text>折线图</Text>
            </TouchableHighlight>
          </View>
          {
            chartType === 'line' ?
              (
                <>
                  <VictoryChart
                    scale={{ x: "time" }}
                    containerComponent={
                      <VictoryZoomContainer responsive={false}
                        zoomDimension="x"
                        zoomDomain={this.state.zoomDomain}
                        onZoomDomainChange={this.handleZoom.bind(this)}
                      />
                    }
                  >
                    <VictoryAxis style={{
                      axis: { stroke: '#FF8F59' },
                    }} tickFormat={(x) => { return moment(x).format('MM-DD') }} />
                    <VictoryAxis style={{ axis: { stroke: '#FF8F59' } }} dependentAxis />
                    <VictoryLine
                      style={{
                        data: { stroke: 'tomato' }
                      }}
                      data={lineData}
                    />
                  </VictoryChart>
                  <VictoryChart
                    height={40}
                    scale={{ x: "time" }}
                    padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
                    containerComponent={
                      <VictoryBrushContainer responsive={false}
                        brushDimension="x"
                        brushDomain={this.state.selectedDomain}
                        onBrushDomainChange={this.handleBrush.bind(this)}
                        brushStyle={{ fill: 'teal', opacity: 0.2 }}
                      />
                    }
                  >
                    <VictoryAxis tickFormat={(x) => { return moment(x).format('MM-DD') }} />
                    <VictoryLine
                      style={{
                        data: { stroke: "tomato" }
                      }}
                      data={lineData}
                    />
                  </VictoryChart>
                </>
              ) : (
                <View>
                  <VictoryPie
                    colorScale={colorScale}
                    data={pieData}
                    labels={({ datum }) => {
                      let total
                      if (payType === 'income') {
                        total = totalIncome
                      } else if (payType === 'pay') {
                        total = totalPay
                      } else {
                        total = totalIncome
                      }
                      let str = `${datum.x}:${datum.y}\n(${(datum.y / total * 100).toFixed(1)}%)`
                      return str
                    }}
                    style={{ labels: { fill: '#8E8E8E', fontSize: 14, fontWeight: 'normal' } }}
                    labelRadius={60}
                  />
                </View>
              )
          }
        </View>
        {
          payType !== 'remain' && (
            <FlatList
              data={payType === 'income' ? incomeData : payData}
              style={styles.recordList}
              renderItem={({ item }) => {
                return (
                  <View
                    keyExtractor={(item) => Math.random().toString()}
                    style={styles.recordItem}
                  // onPress={() => this.editItem()}>
                  >
                    <View style={styles.itemLabel}>
                      <View style={styles.itemInfo}>
                        <MyIconFont
                          name={item.icon}
                          size={20}
                          color="#FF8F59"
                          style={styles.itemIcon}
                        />
                        <Text style={styles.itemText}>{`${item.x}(${payType !== 'income' ? item.payNum : item.inNum}笔)`}</Text>
                        <Text style={styles.itemText}>{`${item.y}元`}</Text>
                      </View>
                      <Text style={[styles.itemText]}>{`${(this.getItemPercent(item.y) * 100).toFixed(1)}%`}</Text>
                    </View>
                    <Progress.Bar
                      progress={this.getItemPercent(item.y).toFixed(2)}
                      color="#FFAD86"
                      unfilledColor="#e0e0e0"
                      borderWidth={0}
                      width={progressInfo.totalWidth}
                      style={styles.itemProgress}
                    />
                  </View>
                )
              }}
            />
          )
        }
        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.isDatePicerVisible}>
          <View style={styles.dateModal}>
            <View style={styles.selfModal}>
              <View style={styles.selfadap}>
                <Text>年份：</Text>
                <SelfadaptModal
                  menuList={yearData().reverse()}
                  onPress={res => this.handleSelfModal('year', res)}
                >
                  <Text style={styles.textinput}>{`${chosedYear}年`}</Text>
                </SelfadaptModal>
              </View>
              <View style={styles.selfadap}>
                <Text>月份：</Text>
                <SelfadaptModal
                  menuList={monthData}
                  onPress={res => this.handleSelfModal('month', res)}
                >
                  <Text style={styles.textinput}>{chosedMonth !== '-' ? `${chosedMonth}月` : chosedMonth}</Text>
                </SelfadaptModal>
              </View>
            </View>
            <View style={styles.dateModalHead}>
              <TouchableHighlight onPress={() => { this.handleSelectDate(false) }}>
                <Text style={styles.selfText}>取消</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => { this.handleSelectDate(false); this.formatData() }}>
                <Text style={styles.selfText}>确定</Text>
              </TouchableHighlight>
            </View>
            {/* <DateTimePicker
              value={this.state.pickDate}
              mode="date"
              display="default"
              // format="YYYY-MM"
              maximumDate={new Date(2200, 1, 1)}
              minimumDate={new Date(2020, 1, 1)}
              neutralButtonLabel="clear"
              onChange={(e, date) => this.handleSelect(e, date)}
              locale="zh-Hans"
              style={styles.dateModalTime}
            /> */}
          </View>
        </Modal>
      </ScrollView>
    )
  }
}
export default ChartsScreen

