import React, { useState } from "react";
import styled from "styled-components";

const AutoCompleteBoxSub = styled.div`
  display: flex;
  flex-direction: column;
  transition-duration: 0.5s;
  // transition-property: max-height;
`;
function AutoCompleteMatches(
  options,
  currentText,
  onClickOption,
  maxAllowed,
  OptionDiv
) {
  var currentShowed = 0;
  if (options) {
    return options.map((option) => {
      if (currentText && currentText.length > 0) {
        if (option.toLowerCase().startsWith(currentText.toLowerCase())) {
          currentShowed++;
          if (currentShowed > maxAllowed) return null;
          return (
            <OptionDiv onClick={() => onClickOption(option)}>
              {option.substr(0, currentText.length)}
              <span style={{ color: "#999" }}>
                {option.substr(currentText.length, option.length)}
              </span>
            </OptionDiv>
          );
        }
      }
      return null;
    });
  } else {
    return null;
  }
}

export default function AutoComplete({
  options,
  onFormSubmit,
  Box,
  Input,
  OptionDiv,
  maxAllowed,
}) {
  const [showOptions, setShowOptions] = useState(true);
  const textInput = React.useRef(null);
  const [currentText, setCurrentText] = useState();
  const onClickOption = (text) => {
    console.log("Clicked");
    setCurrentText(text);
    textInput.current.value = text;
    textInput.current.blur();
    onFormSubmit(text);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    onFormSubmit(e.target[0].value);
  };
  // console.log("AutoComplete 276", options);
  return (
    <Box onSubmit={handleSubmit}>
      <Input
        ref={textInput}
        id="AutoCompleteInputInput"
        type="text"
        placeholder="Search..."
        autoComplete="off"
        name="name"
        onChange={(e) => setCurrentText(e.target.value)}
        onFocus={() => {
          setShowOptions(true);
          textInput.current.value = "";
          setCurrentText("");
        }}
        onBlur={() => {
          setShowOptions(false);
        }}
      />
      <AutoCompleteBoxSub
        style={showOptions ? { maxHeight: "600px" } : { maxHeight: "0px" }}
      >
        {AutoCompleteMatches(
          options,
          currentText,
          onClickOption,
          maxAllowed,
          OptionDiv
        )}
      </AutoCompleteBoxSub>
    </Box>
  );
}
