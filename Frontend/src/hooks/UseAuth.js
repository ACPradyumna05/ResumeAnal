import { useEffect, useState } from "react";
import { getToken, logout as apiLogout } from "../lib/api";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setUser(null);
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    const email = payload.sub;

    setUser({
      email,
      name: email.split("@")[0],
    });
  }, []);

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return { user, setUser, logout };
}
