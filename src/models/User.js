export default class User {
	constructor(
		email = "",
		password = "",
		password_confirmation = "",
		role = "recruiter"
	) {
		this.email = email
		this.password = password
		this.password_confirmation = password_confirmation
		this.role = role
	}
}