import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";
import { GitLinkDialog } from "../../../shared/components/GitHubLinkDialog";
import { CommentDialog } from "../../../shared/components/CommentDialog";
import ContentState from "../../../shared/components/ContentState";
import ActionButton from "../../../shared/components/ActionButton";
import FeedbackSnackbar from "../../../shared/components/FeedbackSnackbar";
import { PracticeOverviewCard } from "../components/PracticeOverviewCard";
import { usePracticeDetail } from "../hooks/usePracticeDetail";
import "./PracticeDetailPage.css";

interface PracticeDetailPageProps {
  userid: number;
}

const PracticeDetailPage: React.FC<PracticeDetailPageProps> = ({ userid }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const practiceid = Number(id);

  const {
    practiceState,
    submissionState,
    practice,
    submission,
    createdAt,
    statusLabel,
    isTaskInProgress,
    linkDialogOpen,
    isCommentDialogOpen,
    openLinkDialog,
    closeLinkDialog,
    sendGithubLink,
    openCommentDialog,
    closeCommentDialog,
    sendComment,
    redirectToGraph,
    uiMessage,
    closeUiMessage,
  } = usePracticeDetail({ userid, practiceid, navigate });

  if (practiceState === "loading") {
    return (
      <div className="practice-detail-page">
        <ContentState
          variant="loading"
          title="Cargando detalle de la práctica..."
        />
      </div>
    );
  }

  if (practiceState === "error") {
    return (
      <div className="practice-detail-page">
        <ContentState
          variant="error"
          title="Error"
          description="No se pudo cargar el detalle de la practica. Intenta nuevamente."
        />
      </div>
    );
  }

  if (practiceState === "empty") {
    return (
      <div className="practice-detail-page">
        <ContentState
          variant="empty"
          title="Sin datos"
          description="No se encontro la practica solicitada."
        />
      </div>
    );
  }

  if (!practice) return null;

  return (
    <div className="practice-detail-page">
      <div className="practice-content-shell">
        <PracticeOverviewCard title={practice.title} createdAt={createdAt} />

        <section className="practice-student-card">
          <Typography
            component="h2"
            className="practice-section-title"
          >
            Mi practica
          </Typography>

          <div className="practice-student-content">
            <div className="practice-student-details">
              <p className="practice-student-row">
                <strong>Enlace:</strong>{" "}
                {submissionState === "loading" ? (
                  "Cargando enlace..."
                ) : submission?.repository_link ? (
                  <a
                    href={submission.repository_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="practice-link-anchor"
                  >
                    <span className="practice-link-cell">
                      <LinkIcon fontSize="small" />
                      {submission.repository_link}
                    </span>
                  </a>
                ) : submissionState === "error" ? (
                  "No disponible por error de carga"
                ) : (
                  "No se inicio la practica"
                )}
              </p>

              <p className="practice-student-row">
                <strong>Estado:</strong> {statusLabel}
              </p>
            </div>

            <div className="practice-student-actions">
              <ActionButton
                variantStyle="primary"
                disabled={Boolean(submission)}
                onClick={openLinkDialog}
              >
                Iniciar practica
              </ActionButton>

              <ActionButton
                variantStyle="primary"
                disabled={isTaskInProgress}
                onClick={openCommentDialog}
              >
                Finalizar practica
              </ActionButton>

              <ActionButton
                variantStyle="primary"
                disabled={!submission?.repository_link}
                onClick={redirectToGraph}
              >
                Ver gráfica
              </ActionButton>
            </div>
          </div>
        </section>
      </div>

      <GitLinkDialog
        open={linkDialogOpen}
        onClose={closeLinkDialog}
        onSend={sendGithubLink}
      />

      <CommentDialog
        open={isCommentDialogOpen}
        link={submission?.repository_link}
        onSend={(comment) => sendComment(comment)}
        onClose={closeCommentDialog}
      />

      <FeedbackSnackbar
        open={Boolean(uiMessage)}
        message={uiMessage ?? ""}
        severity="warning"
        onClose={closeUiMessage}
      />
    </div>
  );
};

export default PracticeDetailPage;
