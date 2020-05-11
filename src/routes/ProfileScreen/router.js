import baseUrl from '../router'

const profileRouter = {
	signup: `${baseUrl}/signup`,
	findUsr: `${baseUrl}/signup/username`,
	updateUsr: `${baseUrl}/userinfo`,
	signin: `${baseUrl}/signin`,
	signout: `${baseUrl}/signout`,
	signdays: `${baseUrl}/signdays`,
	message: `${baseUrl}/message`,
	editSignDays: `${baseUrl}/signdays`
}
export default profileRouter


