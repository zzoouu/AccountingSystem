import React from 'react'
import { Text, View, Button, TouchableHighlight, Modal } from 'react-native'
import styles from './css/SettingScreenCss'
import { common } from '../../utils/commonCss'
import RightArrow from '../../components/RightArrow'

export default class SettingScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false
		}
	}
	handelExit = () => {
		console.log('退出')
	}
	handelTime = e => {
		console.log('shijian')
	}
	handelCache = flag => {
		if (flag) {
			// 删除缓存
		}
		this.setShowModal(false)
	}
	setShowModal = bool => {
		this.setState({
			showModal: bool
		})
	}
	render() {
		return (
			<View style={styles.container}>
				<TouchableHighlight
					// underlayColor='red'
					onPress={() => this.setShowModal(true)}
					style={{ marginBottom: 10 }}>
					<View style={styles.item}>
						<Text style={styles.cache}>清空缓存</Text>
						<RightArrow style={styles.rightArrow} />

					</View>
				</TouchableHighlight>
				<TouchableHighlight onPress={e => this.handelTime(e)}>
					<View style={styles.item}>
						<Text>时间提醒</Text>
					</View>
				</TouchableHighlight>
				<View style={[styles.item, styles.button, common.borderRadius]}>
					<Button
						onPress={this.handelExit}
						title='退出登录'
						color='#000000'/>
				</View>
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.showModal}
					onRequestClose={() => this.setShowModal(false)}>
					<View style={[styles.modal, common.borderRadius]}>
						<View style={styles.modalContent}>
							<View style={styles.modalMessage}>
								<Text>请确认是否删除缓存的文件?</Text>
							</View>
							<View style={styles.modalCheck}>
								<View style={styles.modalButton}>
									<Button
										title="确认"
										onPress={() => this.handelCache(true)}
									/>
								</View>
								<View style={styles.modalButton}>
									<Button
										title="取消"
										onPress={() => this.handelCache(false)}
									/>
								</View>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		)
	}
}
