// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import bcrypt from "bcryptjs-react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifie si un utilisateur est déjà connecté (stocké dans localStorage)
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Inscription
  async function register(username, password) {
    try {
      // Vérifie si l'utilisateur existe déjà
      const { data: existingUsers } = await supabase
        .from("users")
        .select("*")
        .eq("username", username);

      if (existingUsers && existingUsers.length > 0) {
        return { error: "Cet utilisateur existe déjà" };
      }

      // Hachage du mot de passe
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      // Création de l'utilisateur
      const { data, error } = await supabase
        .from("users")
        .insert([{ username, password_hash }])
        .select();

      if (error) throw error;

      const user = data[0];
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return { user };
    } catch (error) {
      return { error: error.message };
    }
  }

  // Connexion
  async function login(username, password) {
    try {
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username);

      if (error) throw error;
      if (!users || users.length === 0) {
        return { error: "Utilisateur non trouvé" };
      }

      const user = users[0];
      const isValid = await bcrypt.compare(password, user.password_hash);

      if (!isValid) {
        return { error: "Mot de passe incorrect" };
      }

      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return { user };
    } catch (error) {
      return { error: error.message };
    }
  }

  // Déconnexion
  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}