import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../hooks/useAuth";
import { AuthBackground } from "../components/AuthBackground";
import { AuthHeader } from "../components/AuthHeader";
import FeedbackSnackbar from "../../../shared/components/FeedbackSnackbar";

const ContentContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  paddingTop: "101px", // roughly matches 214px - 113px
});

const Title = styled(Typography)({
  fontFamily: "'Palanquin Dark', sans-serif",
  fontWeight: 600,
  fontStyle: "SemiBold", // No es estándar, pero se deja como referencia
  fontSize: "32px",
  lineHeight: "100%",
  letterSpacing: "0%",
  color: "#000000",
  marginBottom: "16px",
  textAlign: "center",
  // leading-trim: NONE no es estándar CSS, se omite
});

const Subtitle = styled(Typography)({
  fontFamily: "'Palanquin Dark', sans-serif",
  fontWeight: 400,
  fontStyle: "Regular", // No es estándar, pero se deja como referencia
  fontSize: "20px",
  lineHeight: "100%",
  letterSpacing: "0%",
  color: "#000000",
  marginBottom: "73px", // roughly 375px - 302px
  textAlign: "center",
  // leading-trim: NONE no es estándar CSS, se omite
});

const AuthButton = styled("button")<{ bgcolor: string }>(({ bgcolor }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  gap: "10px",
  width: "395px",
  height: "44px",
  background: bgcolor,
  borderRadius: "5px",
  border: "none",
  fontFamily: "Inter, sans-serif",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "17px",
  color: "#FFFFFF",
  cursor: "pointer",
  marginBottom: "11px",
  transition: "opacity 0.2s ease",
  "&:hover": {
    opacity: 0.9,
  },
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  }
}));

export default function AuthPage() {
  const { loginWithGitHub, loginWithGoogle, loading, error, setError } = useAuth();

  return (
    <>
      <AuthBackground />
      <AuthHeader />
      <ContentContainer>
        <Title>!Bienvenido al TDD Lab!</Title>
        <Subtitle>Ingresa tu cuenta para acceder:</Subtitle>

        <AuthButton
          bgcolor="#6ABB46"
          onClick={loginWithGitHub}
          disabled={loading}
        >
          {loading ? "Accediendo..." : "Accede con GitHub"}
        </AuthButton>

        <AuthButton
          bgcolor="#1370D2"
          onClick={loginWithGoogle}
          disabled={loading}
        >
          {loading ? "Accediendo..." : "Accede con Google"}
        </AuthButton>
      </ContentContainer>

      <FeedbackSnackbar
        message={error || ""}
        open={!!error}
        onClose={() => setError(null)}
        severity="error"
      />
    </>
  );
};
