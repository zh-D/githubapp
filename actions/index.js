import { LOGOUT } from "./actionTypes";
import axois from "axios";

export function logout() {
  return (dispatch) => {
    axois
      .post("/logout")
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: LOGOUT,
          });
        } else {
          console.log("logout failed", res);
        }
      })
      .catch((err) => {
        console.log("logout failed", err);
      });
  };
}
