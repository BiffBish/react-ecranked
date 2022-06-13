import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { Leaderboard } from "@ecranked/api"
const LoadoutBoxStyle = styled(NavLink)`
  justify-content: center;
  padding: 10px 10px 10px;
  margin: 20px 10px 20px;
  background-color: #282828;
  color: white;
  float: left;
  border: 1px solid rgb(70, 70, 70);
  border-radius: 10px;
  flex: 60px 1;
  font-size: 11px;
  text-align: center;
  flex-direction: column;
  min-width: 60px;
`;
const LoadoutBoxItemStyle = styled.div`
  flex-grow: 1;
`;
function ordinal_suffix_of(i: number) {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}
const RankingText = styled.p`
  font-size: 10px;
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;


type LoadoutBoxParms = {
    user_id: string | null;
    number: string;
    frequency: number;
}
export const LoadoutBox = ({ user_id, number, frequency }: LoadoutBoxParms) => {
    const loadoutNumber = parseInt(number)

    const [ranking, setRanking] = useState(0);
    useEffect(() => {
        Leaderboard.rank(user_id)?.loadout(loadoutNumber).then(({ rank }) => {
            setRanking(rank);
        });
    });

    const tacNumber = loadoutNumber % 4;
    const grenadeNumber = ((loadoutNumber - tacNumber) % 16) / 4;
    const weaponNumber = ((loadoutNumber - (tacNumber + grenadeNumber * 4)) % 64) / 16;

    const tacModMap = [
        "repair_matrix.png",
        "threat_scanner.png",
        "energy_barrier.png",
        "phaseshift.png",
    ];
    const ordinanceMap = [
        "detonator.png",
        "stun_field.png",
        "arcmine.png",
        "instant_repair.png",
    ];
    const weaponMap = ["pulsar.png", "nova.png", "comet.png", "meteor.png"];
    const tacModMapName = [
        "Repair matrix",
        "Threat scanner",
        "Energy barrier",
        "Phase shift",
    ];
    const ordinanceMapName = [
        "Detonator",
        "Stun field",
        "Arc mine",
        "Instant repair",
    ];
    const weaponMapName = ["Pulsar", "Nova", "Comet", "Meteor"];
    let displayNumber = Math.round(frequency * 10000) / 100;
    // if (displayNumber === 100) {
    //   displayNumber = 99.999;
    // }
    return (
        <LoadoutBoxStyle to={"/leaderboard/loadout/" + number}>
            <img
                src={"/images/icons/" + weaponMap[weaponNumber]}
                alt={weaponMapName[weaponNumber]}
                style={{ width: "60px", height: "60px" }}
                title={weaponMapName[weaponNumber]} />
            <img
                src={"/images/icons/" + ordinanceMap[grenadeNumber]}
                alt={ordinanceMapName[grenadeNumber]}
                style={{ width: "60px", height: "60px" }}
                title={ordinanceMapName[grenadeNumber]} />
            <img
                src={"/images/icons/" + tacModMap[tacNumber]}
                alt={tacModMapName[tacNumber]}
                style={{ width: "60px", height: "60px" }}
                title={tacModMapName[tacNumber]} />
            <LoadoutBoxItemStyle style={{ fontSize: "20px", fontWeight: "900" }}>
                {displayNumber + "%"} <br />
                {ranking > 0 && ranking < 10 ? (
                    <RankingText>
                        {ordinal_suffix_of(ranking) + " Globally!"}{" "}
                    </RankingText>
                ) : (
                    ""
                )}
            </LoadoutBoxItemStyle>
        </LoadoutBoxStyle>
    );
};
