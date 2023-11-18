import React, { Dispatch } from "react";
import { State, Action } from "../reducers/storeReducer";

interface StoreContextType {
    state: State;
    dispatch: Dispatch<Action>;
  }

  const StoreContext = React.createContext({} as StoreContextType);
  export default StoreContext