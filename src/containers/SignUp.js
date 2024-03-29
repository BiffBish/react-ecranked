import React from "react";
import styled from "styled-components";
import sjcl from "sjcl";
import { useHistory } from "react-router-dom";

const MainStyle = styled.div`
  color: white;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  flex-grow: 1;
  margin: 10px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 600px;
  position: absolute;
  padding: 10px;
  margin: auto;
`;
const LabelStyle = styled.label`
  color: white;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  margin: 10px;
  height: 80px;
  text-align: center;
  display: relative;
  width: 550px;
  display: inline-block;
  flex-grow: 1;
`;
const TextBoxStyle = styled.input`
  width: 200px;
  height: 50px;
  font-size: 20px;
  background: transparent;
  color: white;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  margin: 10px;
`;
const TextBoxStyleSubmit = styled.input`
  width: 200px;
  height: 50px;
  font-size: 20px;
  background: transparent;
  color: white;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
`;
export default function Signup({ creation_key }) {
  // const [fields, handleFieldChange] = useFormFields({
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   confirmationCode: "",
  // });
  // const history = useHistory();
  // const [newUser, setNewUser] = useState(null);
  // const { userHasAuthenticated } = useAppContext();
  // const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  const handleOnSumbit = (event) => {
    console.log(creation_key);
    const username = event.target[0].value;
    const password = event.target[1].value;

    const passwordBitArray = sjcl.hash.sha256.hash(password);
    const passwordHash = sjcl.codec.hex.fromBits(passwordBitArray);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: passwordHash,
        creation_key: creation_key,
      }),
    };
    fetch("https://ecranked.ddns.net/api/v1/auth/signup", requestOptions)
      .then((response) => response.json())
      .then((data) => null);
    alert(
      "Signed Up! there are no features at the moment but when there are you'll have full access to them."
    );
    history.push("/home");
    event.preventDefault();
  };
  return (
    <MainStyle>
      <form onSubmit={handleOnSumbit}>
        <LabelStyle>
          Username:
          <TextBoxStyle type="text" name="name" />
        </LabelStyle>
        <LabelStyle>
          Password:
          <TextBoxStyle type="password" name="name" />
        </LabelStyle>
        <LabelStyle>
          <TextBoxStyleSubmit type="submit" value="Submit" />
        </LabelStyle>
      </form>
    </MainStyle>
  );
}
