import "./styles/Login.css"; // Archivo de estilos CSS
import { CheckIfUserHasAccount } from "../../modules/User-Authentication/application/checkIfUserHasAccount";
import { useNavigate } from "react-router-dom";
import { handleSignInWithGitHub } from "../../modules/User-Authentication/application/signInWithGithub";
import { handleSignInWithGoogle } from "../../modules/User-Authentication/application/signInWithGoogle";
import { setCookieAndGlobalStateForValidUser } from "../../modules/User-Authentication/application/setCookieAndGlobalStateForValidUser";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../modules/User-Authentication/domain/authStates";
import type { AlertColor } from "@mui/material";
import FeedbackSnackbar from "../../shared/components/FeedbackSnackbar";

const Login = () => {
  const navigate = useNavigate();
  const authData = useGlobalState("authData");
  const [feedback, setFeedback] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "error",
  });

  const showFeedback = (message: string, severity: AlertColor = "error") => {
    setFeedback({ open: true, message, severity });
  };

  const handleCloseFeedback = () => {
    setFeedback((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (authData[0].userEmail) {
      navigate({
        pathname: "/tareas",
      });
    }
  }, [authData, navigate]);
  const handleGitHubLogin = async () => {
    try {
      const userData = await handleSignInWithGitHub();
      if (userData?.email) {
        const idToken = await userData.getIdToken();
        const loginPort = new CheckIfUserHasAccount();
        const userCourse = await loginPort.userHasAnAccountWithToken(idToken);
        if (userCourse) {
          setCookieAndGlobalStateForValidUser(userData, userCourse, () =>
            navigate({
              pathname: "/tareas",
            }),
          );
          localStorage.setItem("userProfilePic", userData.photoURL||"");
        } else {
          showFeedback("Disculpa, tu usuario no esta registrado. Por favor, registrate primero.");
        }
      } else {
        showFeedback("Disculpa, tu usuario no esta registrado. Por favor, registrate primero.");
      }
    } catch (error: any) {
      const errorMessage = error?.message || "Error al iniciar sesión";
      if (errorMessage.includes("Google")) {
        showFeedback("Este usuario esta registrado con Google. Por favor, inicia sesion con Google.");
      } else if (errorMessage.includes("no encontrado") || errorMessage.includes("404")) {
        showFeedback("Usuario no encontrado. Por favor, registrate primero.");
      } else {
        showFeedback(errorMessage);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userData = await handleSignInWithGoogle();
      if (userData?.email) {
        const idToken = await userData.getIdToken();
        const loginPort = new CheckIfUserHasAccount();
        const userCourse = await loginPort.userHasAnAccountWithGoogleToken(idToken);
        if (userCourse) {
          setCookieAndGlobalStateForValidUser(userData, userCourse, () =>
            navigate({
              pathname: "/tareas",
            }),
          );
          localStorage.setItem("userProfilePic", userData.photoURL||"");
        } else {
          showFeedback("Disculpa, tu usuario no esta registrado. Por favor, registrate primero.");
        }
      } else {
        showFeedback("Disculpa, tu usuario no esta registrado. Por favor, registrate primero.");
      }
    } catch (error: any) {
      const errorMessage = error?.message || "Error al iniciar sesión";
      if (errorMessage.includes("GitHub")) {
        showFeedback("Este usuario esta registrado con GitHub. Por favor, inicia sesion con GitHub.");
      } else if (errorMessage.includes("no encontrado") || errorMessage.includes("404")) {
        showFeedback("Usuario no encontrado. Por favor, registrate primero.");
      } else {
        showFeedback(errorMessage);
      }
    }
  };

  return (
    <div className="login-container">
      <header className="app-header">
        <h1>TDDLab</h1>
      </header>
      <div className="login-content">
        <p className="login-Title">
          ¡Bienvenido a TDDLab!, usa tu cuenta para acceder:
        </p>
        <div className="login-buttons">
          <button className="github-button" onClick={handleGitHubLogin}>
            Accede con GitHub
          </button>
          <button className="google-button" onClick={handleGoogleLogin}>
            Accede con Google
          </button>
        </div>
      </div>

      <FeedbackSnackbar
        open={feedback.open}
        message={feedback.message}
        severity={feedback.severity}
        onClose={handleCloseFeedback}
      />
    </div>
  );
};

export default Login;
