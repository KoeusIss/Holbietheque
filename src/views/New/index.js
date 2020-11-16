import React from "react"
import {Segment, Image, Button} from "semantic-ui-react"
import UserService from "../../services/user_service"
import AddNewStudent from "./add_student";
import AddNewRecruiter from "./add_recruiter";
import AddEditProfile from "../Student/Profile/add_profile";


const NewProfile = () => {
  
  const currentUser = UserService.currentUser()
  return (
    <Segment vertical textAlign="center" style={{paddingTop: "6rem", paddingBottom: "14rem"}}>
      <Image
        src={require("../../images/empty_profile.png")}
        size="large"
        style={{margin: "auto"}}
      />
      {currentUser.role === "student" ?
        <AddEditProfile
          theTrigger={<Button basic>Add profile</Button>}
          userID={currentUser.id}
        />
        :
        <AddNewRecruiter
          theTrigger={<Button basic>Add profile</Button>}
          user_id={currentUser.id}
        />
      }
    </Segment>
  )
}

export default NewProfile