import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useMemo,
} from "react";

// ========== Types ==========
export interface User {
  userId: number;
  nom: string;
  nomEtablissement: string;
  adresseMap: string;
  email: string;
  telephone: string;
  businessActivity: string;
  Kbis: string | null;
  isValidate: boolean;
  typeActeur: string;
  ban: boolean;
  userLatitude: number | null;
  userLongitude: number | null;
  createdAt: string;
  updatedAt: string;
}

interface State {
  user: User | null;
  doctors: User[];
  vendeurs: User[];
}

type Action =
  | { type: "SET_USER"; payload: User }
  | { type: "UPDATE_USER"; payload: Partial<User> }  // Adding UPDATE_USER action
  | { type: "SET_DOCTORS"; payload: User[] }
  | { type: "SET_VENDEURS"; payload: User[] }
  | { type: "RESET" };

// ========== Initial State ==========
const initialState: State = {
  user: null,
  doctors: [],
  vendeurs: [],
};

// ========== Reducer ==========
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "UPDATE_USER":
      // Updating user based on the partial payload
      if (state.user) {
        return {
          ...state,
          user: { ...state.user, ...action.payload },  // Update the fields of the user
        };
      }
      return state;  // If no user in state, just return the current state


    case "SET_DOCTORS":
      return { ...state, doctors: action.payload };

    case "SET_VENDEURS":
      return { ...state, vendeurs: action.payload };

    case "RESET":
      return initialState; // Resetting to the initial state


    default:
      return state;
  }
};

// ========== Context ==========
const DataContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// ========== Provider ==========
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

// ========== Hook ==========
export const useDataContext = () => useContext(DataContext);
