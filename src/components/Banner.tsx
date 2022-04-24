import { useSelector } from "react-redux";
import { State } from "../stores/store";
import styled from "styled-components";
import AnimateHeight from "react-animate-height";

const BannerStyle = styled(AnimateHeight)`
  text-align: center;
  /* Accent / Default */
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  margin: 0px;
  overflow: visible;
  z-index: -1;
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  color: #fff;
`;

const UserIcon = styled.img`
  width: 40px;
  height: 40px;
  margin: 20px;
`;

const combatBackground = "/images/combat_background.jpg";



function getHelperText(src?: string) {
  if (src === undefined) return ""
  switch (src) {
    case "/images/moderator_icon.png":
      return "Moderator";
    case "/images/verified_icon.png":
      return "Verified User";
    case "/images/capture_point_crown_green.png":
      return "Certified Cutie";
    default:
      return "";
  }
}

export const Banner = () => {


  const { height, text, icon } = useSelector((state: State) => state.banner);
  const BannerIconTitle = getHelperText(icon?.src);


  return (
    <BannerStyle
      id="example-panel" duration={500}
      height={height}
      style=
      {{
        backgroundImage: `url(${combatBackground})`,
        overflow: "visible",
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {text}
        {icon?.src ? (
          <UserIcon title={BannerIconTitle} src={icon.src} />
        ) : (
          ""
        )}
      </div>
    </BannerStyle>
  );
};


