import styled from "styled-components";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { makeApiCall } from "../../helpers/api/index";

const EditButtonsStyle = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  background-color: #222;
  flex-wrap: wrap;
`;
const EditButtonStyle = styled.div`
  padding: 0px 10px;
  // margin: 20px 10px 20px;
  color: #aaa;
  font-size: 15px;
  cursor: pointer;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  background-color: #222;

  &:hover {
    background-color: #555;
    color: #000;
  }
`;
const ModeratorAvatarControls = ({ oculus_id }) => {
  const onApprove = () => {
    makeApiCall("v1/user" + oculus_id + "/avatar", "PUT", {
      approve: true,
    }).then((data) => {
      window.location.reload(false);
    });
  };
  const onRemove = () => {
    makeApiCall("v1/user" + oculus_id + "/avatar", "PUT", {
      approve: false,
    }).then((data) => {
      window.location.reload(false);
    });
  };
  return (
    <EditButtonsStyle>
      <EditButtonStyle onClick={onRemove}>Remove</EditButtonStyle>
      <EditButtonStyle onClick={onApprove}>Approve</EditButtonStyle>
    </EditButtonsStyle>
  );
};

const AvatarControls = ({ oculus_id }) => {
  // eslint-disable-next-line
  // var pending = userData["avatar_pending"];

  return <ModeratorAvatarControls oculus_id={oculus_id} />;
  // return <></>;
};

const AvatarStyle = styled.img`
  // min-height: 100%;
  width: 100%;
  height: auto;
  min-width: 0;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  overflow: hidden;
`;

const AboutAvatar = ({ avatar, oculus_id }) => {
  console.log("AVATAR " + avatar);
  return (
    <>
      <AvatarStyle src={avatar} />
      <AvatarControls oculus_id={oculus_id} />
    </>
  );
};
const AvatarContainer = styled.div`
  min-width: 300px;
  max-width: 600px;

  padding: 10px 10px 0px;
  margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  flex: 100px 2;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;
const AllAvatarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px 10px 0px;
  margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
`;
const ApproveImagesContainer = styled.div`
  color: white;
  float: center;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
`;
const UserLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-size: 30px;
`;
export default function ApproveImagesModeration() {
  const [unapprovedImages, setUnapprovedImages] = React.useState([]);

  useEffect(() => {
    makeApiCall("v1/moderator/unapprovedimages")
      .then(async (response) => {
        if (response.status === 200) {
          const json = response.json;
          setUnapprovedImages(json);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  console.log(unapprovedImages);
  return (
    <>
      <ApproveImagesContainer>
        <h1>Approve Images</h1>
        <AllAvatarContainer>
          {unapprovedImages.map((user) => {
            return (
              <AvatarContainer>
                <UserLink to={"/user/" + user.oculus_name + "/stats"}>
                  {" "}
                  {user.oculus_name}
                </UserLink>
                <AboutAvatar avatar={user.avatar} oculus_id={user.oculus_id} />
              </AvatarContainer>
            );
          })}
        </AllAvatarContainer>
      </ApproveImagesContainer>
    </>
  );
}
