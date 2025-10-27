import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function generateAuthToken() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function readUserFromStorage() {
  try {
    return JSON.parse(localStorage.getItem("users")) || [];
  } catch {
    console.error("Error reading users from storage");
    return [];
  }
}

function writeUserToStorage(users) {
  try {
    localStorage.setItem("users", JSON.stringify(users));
  } catch {
    console.error("Error writing users to storage");
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("auth_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("ticketapp_session") || null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem("auth_user", JSON.stringify(user));
    else localStorage.removeItem("auth_user");
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem("ticketapp_session", token);
    else localStorage.removeItem("ticketapp_session");
  }, [token]);

  async function signup({ name, email, password }) {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = readUserFromStorage();
    if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
      setLoading(false);
      throw new Error("Email already exists");
    }

    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    writeUserToStorage(users);

    const newToken = generateAuthToken();
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    setToken(newToken);

    setLoading(false);
    return { token: newToken, user: newUser };
  }

  async function login({ email, password }) {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 350));

    const users = readUserFromStorage();
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!found) {
      setLoading(false);
      throw new Error("Invalid email or password");
    }

    const newToken = generateAuthToken();
    setUser({ id: found.id, name: found.name, email: found.email });
    setToken(newToken);

    setLoading(false);
    return { token: newToken, user: found };
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("ticketapp_session"); // ✅ ensure clean logout session
  }

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    signup,
    isAuthenticated: Boolean(localStorage.getItem("ticketapp_session")) // ✅ updated logic
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
