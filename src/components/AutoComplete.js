import React, { useState } from "react";
import styled from "styled-components";
import Fuse from "fuse.js";
const AutoCompleteBoxSub = styled.div`
  display: flex;
  flex-direction: column;
  transition-duration: 0.5s;
  // transition-property: max-height;
`;

const AutoCompleteText = ({ result, OptionDiv, onClickOption }) => {
  let matches = [];
  let lastValue = 0;
  console.log(result);
  for (let index = 0; index < result.matches[0].indices.length; index++) {
    const match = result.matches[0].indices[index];
    const matchStart = match[0];
    const matchEnd = match[1];
    matches.push([result.item.slice(lastValue, matchStart), false]);
    matches.push([result.item.slice(matchStart, matchEnd), true]);
    lastValue = matchEnd;
  }
  matches.push([result.item.slice(lastValue, result.item.length), false]);

  return (
    <OptionDiv onClick={() => onClickOption(result.item)}>
      {/* {result.item} */}
      {matches.map((string) => {
        if (string[1]) {
          return string[0];
        }
        return <span style={{ color: "#999" }}>{string[0]}</span>;
      })}

      {/* {result.item.substr(0, currentText.length)}
      <span style={{ color: "#999" }}>
        {option.substr(currentText.length, option.length)}
      </span> */}
    </OptionDiv>
  );
};

const AutoCompleteMatches = (
  options,
  currentText,
  onClickOption,
  maxAllowed,
  OptionDiv
) => {
  // var currentShowed = 0;

  // // Change the pattern
  // const pattern = "Silver"

  if (options && currentText !== undefined) {
    const fuse = new Fuse(options, {
      threshold: 0.5,
      keys: [],
      includeMatches: true,
    });
    let results = fuse.search(currentText);

    return results.slice(0, 15).map((result) => {
      // if (currentText && currentText.length > 0) {
      //   if (option.toLowerCase().startsWith(currentText.toLowerCase())) {
      //     currentShowed++;
      //     if (currentShowed > maxAllowed) return null;
      return (
        <AutoCompleteText
          result={result}
          OptionDiv={OptionDiv}
          onClickOption={onClickOption}
        />
      );
      // }
      // }
      // return null;
    });
  } else {
    return null;
  }
};

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
    // textInput.current.value = text;
    // textInput.current.blur();
    e.preventDefault();
    // console.log(e.target[0].value);
    if (currentText && currentText.length > 0) {
      for (let index = 0; index < options.length; index++) {
        const option = options[index];
        if (option.toLowerCase().startsWith(currentText.toLowerCase())) {
          textInput.current.value = option;
          textInput.current.blur();
          onFormSubmit(option);

          return;
        }
      }
    }
  };
  // console.log("AutoComplete 276", options);
  return (
    <Box onSubmit={handleSubmit} style={{ flex: "200px 1" }}>
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
