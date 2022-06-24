import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

export const OasisDashboardPopup = ({ url }) => {
  console.log("[23] Running useEffect");
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    async function getUser() {
      const hasPopupsEnabled = await new Promise((resolve, reject) => {
        console.log("Running Promise");
        var popupBlockerChecker = {
          check: function (popup_window) {
            var _scope = this;
            if (popup_window) {
              if (/chrome/.test(navigator.userAgent.toLowerCase())) {
                setTimeout(function () {
                  resolve(_scope._is_popup_blocked(_scope, popup_window));
                }, 200);
              } else {
                popup_window.onload = function () {
                  resolve(_scope._is_popup_blocked(_scope, popup_window));
                };
              }
            } else {
              _scope._displayError();
              resolve(false);
            }
          },
          _is_popup_blocked: function (scope, popup_window) {
            if (popup_window.innerHeight <= 0) {
              scope._displayError();
              return false;
            }
            return true;
          },
          _displayError: function () {
            alert(
              "Popup Blocker is enabled! Please add this site to your exception list."
            );
          },
        };
        let popup = window.open(url, "", "popup");
        popupBlockerChecker.check(popup);
      });
      setIsEnabled(hasPopupsEnabled);
      if (hasPopupsEnabled) {
        window.opener = null;
        window.open("", "_self");
        window.close();
        window.close();
        return <Redirect to={"/"} />;
      }
    }
    getUser();
  }, []);
  if (isEnabled) return null;
  return (
    <div className="rounded border padded centered" style={{ margin: "50px" }}>
      <h1>Popups are disabled. Please enable them and refresh the page.</h1>
    </div>
  );
};
