import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Moderator, User } from "@ecranked/api";
import AutoComplete from "../../components/AutoComplete";

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
interface ModeratorAvatarControlsProps {
  oculus_id: string
}
const ModeratorAvatarControls = ({ oculus_id }: ModeratorAvatarControlsProps) => {


  const onApprove = async () => {
    (await User.fetch(oculus_id)).approveAvatar().then(() => { });
  };
  const onRemove = async () => {
    (await User.fetch(oculus_id)).removeAvatar();

  };
  return (
    <EditButtonsStyle>
      <EditButtonStyle onClick={onRemove}>Remove</EditButtonStyle>
      <EditButtonStyle onClick={onApprove}>Approve</EditButtonStyle>
    </EditButtonsStyle>
  );
};

interface AvatarControlsProps {
  oculus_id: string
}
const AvatarControls = ({ oculus_id }: AvatarControlsProps) => {
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

interface AboutAvatarProps {
  avatar: string,
  oculus_id: string
}
const AboutAvatar = ({ avatar, oculus_id }: AboutAvatarProps) => {
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

const AutoCompleteBox = styled.form`
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  display: inline-block;
  float: right;
  margin: 4px;
  background-color: #222;
  z-index: 50;
  overflow: hidden;
`;
const AutoCompleteInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 18px;
  padding: 8px;
  font-family: "Montserrat", sans-serif;
  z-index: 50;
`;
const autoCompleteOptionDiv = styled.div`
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 18px;
  padding: 3px 8px;
  z-index: 50;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
  transition-duration: 0.1s;
`;
export default function LinkUsers() {
  const [allUsernames, setAllUsernames] = useState<string[]>([]);
  useEffect(() => {
    User.fetchAll().then((response) => {
      setAllUsernames(response);
    })
      .catch((error) => {
        console.error("SetAllUsernames => There was an error!", error);
      });
  }, []);

  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredID, setEnteredID] = useState<string>("");

  return (
    <>
      <ApproveImagesContainer>
        <h1>Link User</h1>
        <AllAvatarContainer>
          Oculus Name:
          <AutoComplete
            options={allUsernames}
            onFormSubmit={(name: string) => {
              setEnteredName(name);
            }}
            Box={AutoCompleteBox}
            OptionDiv={autoCompleteOptionDiv}
            Input={AutoCompleteInput}
            maxAllowed={12}
          />
          Discord ID:
          <AutoCompleteBox>
            <AutoCompleteInput onChange={(event) => {
              setEnteredID(event.target.value);
            }} value={enteredID} />
          </AutoCompleteBox>
          <button onClick={async () => {
            let user = await User.fetch(enteredName);
            await user.setDiscordID(enteredID);
            await user.setDiscordName(enteredName);
          }}>Link</button>

        </AllAvatarContainer>
      </ApproveImagesContainer>
    </>
  );
}
