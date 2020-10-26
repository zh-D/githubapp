import { LOGOUT } from "../actions/actionTypes";
export const userInitialState = {};

export default function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
