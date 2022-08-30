import React, { useReducer, createContext, useEffect } from "react";
import { AuthUserInfo } from "@graphql/Auth/Auth.interface";
import { IUserInfo } from "@interfaces/IAuth";
import { IAction, IContext } from "./authContext.interface";
import { ACTIONS } from "@constants/actions";
import {
  deleteUserInfoFromLocalStorage,
  getUserInfoFromLocalStorage,
  isUserExists,
  setUserInfoToLocalStorage,
} from "@helpers/localStorage";
import { ROUTE } from "@src/constants/route";
import { browserHistory } from "@src/browserHistory";

const initialState = {
  user: {},
};

const AuthContext = createContext({} as IContext);

function authReducer(state: IUserInfo, action: IAction) {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case ACTIONS.LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
}

function AuthProvider(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (
    { user, access_token }: AuthUserInfo,
    isMemorized: boolean,
  ) => {
    dispatch({
      type: ACTIONS.LOGIN,
      payload: user,
    });
    setUserInfoToLocalStorage({ user, access_token, isMemorized });
  };

  const logout = () => {
    dispatch({ type: ACTIONS.LOGOUT });
    deleteUserInfoFromLocalStorage();
  };

  useEffect(() => {    
    const restoreUser = () => {
      if (isUserExists()) {
        const { user, isMemorized } = getUserInfoFromLocalStorage();

        if (isMemorized) {
          dispatch({
            type: ACTIONS.LOGIN,
            payload: user,
          });
        } else {
          deleteUserInfoFromLocalStorage();
          browserHistory.push(ROUTE.SIGN_IN);
        }
      }
    };

    restoreUser();
  }, []);
  
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
