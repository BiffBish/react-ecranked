import styled from "styled-components";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { makeApiCall } from "../../helpers/api/index";
function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return "approximately " + Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return "approximately " + Math.round(elapsed / msPerYear) + " years ago";
  }
}

const UserContainer = styled.div`
  background-color: #222;
  color: white;
  float: left;
  flex: 20px 2;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: stretch;
  // height: 20px;
  height: 52px;
`;
const AllUsersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 10px 0px;
  margin: 20px 10px 20px;
  background-color: #222;
  color: white;
  float: left;
  // border: 1px solid rgb(70, 70, 70);
  // border-radius: 10px;
  flex-direction: column;
  margin: auto;
  width: 98%;
`;
const ApproveImagesContainer = styled.div`
  color: white;
  float: center;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  flex-grow: 1;
`;
const UserLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-size: 20px;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  height: 30px;
  flex: 50px 1;
  padding: 10px;
`;
const Button = styled.div`
  text-decoration: none;
  color: white;
  font-size: 20px;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  flex: 50px 0;
  cursor: pointer;
  &:hover {
    background-color: #555;
    color: #000;
  }
  padding: 10px;
  height: 30px;
`;
const NotClickableButton = styled.div`
  text-decoration: none;
  color: white;
  font-size: 15px;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  padding: 10px;
  height: 30px;
  width: 200px;
`;
const BodyContainer = styled.div`
  margin: auto;
  width: 80%;
  min-width: 400px;
  display: flex;
`;
export default function UncontactedUsersModeration({
  username,
  setBannerCallback,
  subDomain,
}) {
  const [unapprovedImages, setUnapprovedImages] = React.useState([]);

  useEffect(() => {
    makeApiCall("v1/moderator/uncontactedusers")
      .then(async (response) => {
        if (response.status === 200) {
          const json = response.json;
          console.log(json[0]);
          setUnapprovedImages(json);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [username, setBannerCallback]);
  console.log(unapprovedImages);
  const RemoveUser = (username) => {
    makeApiCall("v1/user/" + username, "PUT", { contacted: 1 });
  };
  return (
    <BodyContainer>
      <ApproveImagesContainer>
        <h1>Uncontacted Users!</h1>
        <AllUsersContainer>
          {unapprovedImages.slice(0, 200).map((user) => {
            return (
              <UserContainer>
                <NotClickableButton>
                  {timeDifference(Date.now(), user.join_date * 1000)}
                </NotClickableButton>

                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(user.oculus_name);
                  }}
                >
                  Copy
                </Button>
                <UserLink to={"/user/" + user.oculus_name + "/stats"}>
                  {" "}
                  {user.oculus_name}
                </UserLink>
                <Button
                  onClickCapture={() => {
                    RemoveUser(user.oculus_name);
                  }}
                >
                  Remove
                </Button>
              </UserContainer>
            );
          })}
        </AllUsersContainer>
      </ApproveImagesContainer>
    </BodyContainer>
  );
}
