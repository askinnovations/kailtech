// Import Dependencies
import { useEffect, useReducer } from "react";
// import isObject from "lodash/isObject";
import PropTypes from "prop-types";
import isString from "lodash/isString";

// Local Imports
import axios from "utils/axios";
import { isTokenValid, setSession } from "utils/jwt";
import { AuthContext } from "./context";


// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  errorMessage: null,
  user: null,
};

const reducerHandlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user : user ?? null,
    };
  },

  LOGIN_REQUEST: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },

  LOGIN_SUCCESS: (state, action) => {
    const user = action?.payload?.user ?? {};
    return {
      ...state,
      isAuthenticated: true,
      isLoading: false,
      user,
    };
  },

  LOGIN_ERROR: (state, action) => {
    const errorMessage = action?.payload ?? "Login failed";

    return {
      ...state,
      errorMessage,
      isLoading: false,
    };
  },

  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};
const reducer = (state, action) => {
  const handler = reducerHandlers[action.type];
  return handler ? handler(state, action) : state;
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (authToken && isTokenValid(authToken)) {
          setSession(authToken);

          
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: null,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
          
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
             user: null,
            
          },
        });
      }
    };

    init();
  }, []);

 // ✅ Login function used in SignIn.jsx
  const login = async ({ username, password, finyear }) => {
  dispatch({ type: "LOGIN_REQUEST" });

  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("finyear", finyear);

    const response = await axios.post("https://lims.kailtech.in/api/login", formData);

    const { token, permissions, user } = response.data;

    if (!isString(token)) {
      throw new Error("Invalid token received");
    }

    // Save token
    localStorage.setItem("authToken", token);
    localStorage.setItem("userPermissions", JSON.stringify(permissions));
    setSession(token); // optionally set default header

    // ✅ Use actual user from response
    dispatch({ type: "LOGIN_SUCCESS", payload: { user: user ?? {} } });

  } catch (err) {
    dispatch({
      type: "LOGIN_ERROR",
      payload: err?.response?.data?.message || err?.message || "Login failed",
    });

    throw err;
  }
};

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  if (!children) {
    return null;
  }

  return (
    <AuthContext
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

