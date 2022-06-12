import { User } from "@ecranked/api";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


interface UserButtonProps {
  // identifier: string;
  oculus_id?: string;
  username?: string;
}
export default function UserButton({ oculus_id, username }: UserButtonProps) {
  const [verifiedName, setVerifiedName] = useState<string | null>(null);

  useEffect(() => {
    if (!oculus_id && !username) return;
    User.fetch(oculus_id ?? username ?? "{error}").then(({ oculus_name }) => {
      setVerifiedName(oculus_name);
    }).catch(() => {
      setVerifiedName("{unknown}");
    });

  }, [oculus_id, username]);

  let shownName = "Loading...";

  if (username) {
    shownName = username;
  }
  if (verifiedName) {
    shownName = verifiedName;
  }
  return (
    <NavLink className={"rounded button"} to={"/user/" + shownName + "/stats"}>
      {shownName}
    </NavLink>
  );
}
