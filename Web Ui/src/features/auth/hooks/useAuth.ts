import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignInWithGitHub } from "../../../modules/User-Authentication/application/signInWithGithub";
import { handleSignInWithGoogle } from "../../../modules/User-Authentication/application/signInWithGoogle";
import { setCookieAndGlobalStateForValidUser } from "../../../modules/User-Authentication/application/setCookieAndGlobalStateForValidUser";
import { CheckIfUserHasAccount } from "../../../modules/User-Authentication/application/checkIfUserHasAccount";
import { useGlobalState } from "../../../modules/User-Authentication/domain/authStates";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authData = useGlobalState("authData");

  useEffect(() => {
    if (authData && authData[0] && authData[0].userEmail) {
      navigate({ pathname: "/" });
    }
  }, [authData, navigate]);

  const handleAuthResult = async (userData: any, isGoogle: boolean) => {
    if (!userData?.email) {
      throw new Error("Disculpa, tu usuario no está registrado. Por favor, regístrate primero.");
    }
    const idToken = await userData.getIdToken();
    const loginPort = new CheckIfUserHasAccount();
    const userCourse = isGoogle 
      ? await loginPort.userHasAnAccountWithGoogleToken(idToken)
      : await loginPort.userHasAnAccountWithToken(idToken);
    
    if (userCourse) {
      setCookieAndGlobalStateForValidUser(userData, userCourse, () =>
        navigate({ pathname: "/" })
      );
      localStorage.setItem("userProfilePic", userData.photoURL || "");
    } else {
      throw new Error("Disculpa, tu usuario no está registrado. Por favor, regístrate primero.");
    }
  };

  const loginWithGitHub = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await handleSignInWithGitHub();
      await handleAuthResult(userData, false);
    } catch (err: any) {
      const errorMessage = err?.message || "Error al iniciar sesión";
      if (errorMessage.includes("Google")) {
        setError("Este usuario está registrado con Google. Por favor, inicia sesión con Google.");
      } else if (errorMessage.includes("no encontrado") || errorMessage.includes("404")) {
        setError("Usuario no encontrado. Por favor, regístrate primero.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await handleSignInWithGoogle();
      await handleAuthResult(userData, true);
    } catch (err: any) {
      const errorMessage = err?.message || "Error al iniciar sesión";
      if (errorMessage.includes("GitHub")) {
        setError("Este usuario está registrado con GitHub. Por favor, inicia sesión con GitHub.");
      } else if (errorMessage.includes("no encontrado") || errorMessage.includes("404")) {
        setError("Usuario no encontrado. Por favor, regístrate primero.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loginWithGitHub,
    loginWithGoogle,
    loading,
    error,
    setError
  };
};
