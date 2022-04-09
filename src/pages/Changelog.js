var changelogData = require("./Changelog.json");

export default function Changelog() {
  return (
    // Heres something cool. add a className of "list" and
    // itll become a list with automaticly spaced out sub elements
    // use quotes. "padded rounded" is a string
    // theres a space. because padded and rounded are two seperate classes
    // Also this is the top level element :firgiggle: your probably gonna want to have the top level element be a
    // "rounded list" and have the sub elements be "padded"
    <div
      className={"rounded list padded"}
      style={{
        gap: "30px",

        margin: "50px 100px",
      }}
    >
      {/* And if you make the div above a list add an h1 element and youll see it magicly move to the center :firsmart: */}
      {/* Think about removing the following 4 lines */}

      <h1>Changelog (page by unusual)</h1>
      <div>
        <h3>Launch-Present</h3>
        <p>
          This page represents the major changes to ECRanked since september to
          present. its not a comprehensive list but it marks the milestones and
          notable achievements.
        </p>
      </div>
      {/* -Added a Changelog <br /> */}
      {/* -Added a timeline bar. */}
      {changelogData.reverse().map((changelogElement) => {
        return (
          <>
            {/* Wrap the 3 lines in a div */}
            <div>
              <h3>
                {changelogElement.name} - {changelogElement.date}
              </h3>
              <p> -{changelogElement.description}</p>
            </div>
          </>
        );
      })}
    </div>
  );
}

// //Always make components CamelCase. (Aka. First word is capitalized with each folowing word being capitlized as well)
// const change = ({ data }) => {
//   return (
//     // Think about adding a className of "padded rounded"
//     // that will also make the styles redundent.
//     // Feel free to mess around with just doing "padded" or just doing "rounded" to see what happens
//     // this is where your free to have fun and experement
//     <div
//       style={{
//         backgroundColor: "none",
//         padding: "20px",
//         boarder: "10px",
//       }}
//       //This is gonna be where your gonna wanna put stuff like titles and descriptions
//     ></div>
//   );
// };
