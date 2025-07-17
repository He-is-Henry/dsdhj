import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(null);

  const login = (userData) => {
    setUser(userData);
    setChecked(true);
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get("users/me");

        console.log(response);
        setUser(response.data);
      } catch (err) {
        console.log(err);
        if (!err.response) setError("No server response");
        else {
          setError(err.message);
        }
        console.log(err.message);
        setUser(null);
      } finally {
        setChecked(true);
      }
    };
    checkUser();
  }, []);

  /*  const sendResetMail = async (email = user.email) => {
    try {
      const response = await axios.post("/author/reset", {
        email,
      });
      console.log(response.data);
      setUser((prev) => ({ ...prev, _id: response.data.userId }));
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Something went wrong" };
    }
  };
 */
  return (
    <AuthContext.Provider
      value={{
        user,
        checked,
        login,
        setChecked,
        error,
        setUser /* sendResetMail */,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
