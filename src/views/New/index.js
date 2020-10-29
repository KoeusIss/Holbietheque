import React from "react"
import { Segment, Image, Button } from "semantic-ui-react"
import AddProfile from "../Students/Profile/add_profile"
import UserService from "../../services/user_service"


const NewProfile = () => {

	const currentUser = UserService.currentUser()
	return (
		<Segment vertical textAlign="center" style={{ paddingTop: "6rem", paddingBottom: "14rem" }}>
			<Image
				src={require("../../images/empty_profile.png")}
				size="large"
				style={{ margin: "auto" }}
			/>
			<AddProfile
				theTrigger={<Button basic>Add profile</Button>}
				user_id={currentUser.id}
			/>
		</Segment>
	)
}

export default NewProfile