import styled from "styled-components";

const MainTextStyle = styled.p`
  color: white;
`;

export default function Changelog() {
  return (
    <MainTextStyle>
      <h1>Changelog</h1>
      <h3>October 11</h3>
      -Added a Changelog <br />
      -Added a timeline bar.
    </MainTextStyle>
  );
}
