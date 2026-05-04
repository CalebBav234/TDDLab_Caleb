import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link as LinkIcon } from "@mui/icons-material";
import { GitLinkDialog } from "../../../shared/components/GitHubLinkDialog";
import { CommentDialog } from "../../../shared/components/CommentDialog";
import ContentState from "../../../shared/components/ContentState";
import StatefulButton from "../../../shared/components/StatefulButton";
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

  return (
    <div className="practice-detail-page">
      <div className="practice-content-shell">
        {practiceState === "loading" ? (
          <div className="practice-center-state">
            <ContentState variant="loading" title="Cargando..." />
          </div>
        ) : practiceState === "error" ? (
          <div className="practice-center-state">
            <ContentState
              variant="error"
              title="Error al cargar..."
              description="No se pudo cargar el detalle de la practica. Intenta nuevamente."
            />
          </div>
        ) : practiceState === "empty" ? (
          <div className="practice-center-state">
            <ContentState
              variant="empty"
              title="Sin resultados"
              description="No se encontro la practica solicitada."
            />
          </div>
        ) : practice ? (
          <>
            <PracticeOverviewCard title={practice.title} createdAt={createdAt} />

            <section className="practice-student-card">
              <h2 className="practice-section-title">
                Mi practica
              </h2>

              <div className="practice-student-content">
                <div className="practice-student-details">
                  <div className="practice-student-row practice-enlace-row">
                    <strong>Enlace:</strong>{" "}
                    {submissionState === "loading" ? (
                      <span style={{ marginLeft: "8px" }}>Cargando...</span>
                    ) : submission?.repository_link ? (
                      <a
                        href={submission.repository_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="practice-link-anchor"
                      >
                        <span className="practice-link-cell">
                          {submission.repository_link}
                        </span>
                      </a>
                    ) : submissionState === "error" ? (
                      <span style={{ marginLeft: "8px" }}>No disponible por error de carga</span>
                    ) : (
                      <span style={{ marginLeft: "8px" }}>No se inicio la practica</span>
                    )}
                  </div>

                  <div className="practice-student-row practice-estado-row">
                    <strong>Estado:</strong>{" "}
                    <span style={{ marginLeft: "8px" }}>
                      {submissionState === "loading" ? "Cargando..." : statusLabel}
                    </span>
                  </div>
                </div>

                <div className="practice-student-actions">
                  <StatefulButton
                    variantStyle={(!Boolean(submission) && submissionState !== "loading") ? "primary" : "secondary"}
                    onClick={() => {
                      if (!Boolean(submission) && submissionState !== "loading") openLinkDialog();
                    }}
                  >
                    Iniciar práctica
                  </StatefulButton>

                  <StatefulButton
                    variantStyle={(!isTaskInProgress && submissionState !== "loading" && Boolean(submission?.repository_link)) ? "primary" : "secondary"}
                    onClick={() => {
                      if (!isTaskInProgress && submissionState !== "loading" && Boolean(submission?.repository_link)) openCommentDialog();
                    }}
                  >
                    Finalizar práctica
                  </StatefulButton>

                  <StatefulButton
                    variantStyle={(Boolean(submission?.repository_link) && submissionState !== "loading") ? "primary" : "secondary"}
                    onClick={() => {
                      if (Boolean(submission?.repository_link) && submissionState !== "loading") redirectToGraph();
                    }}
                  >
                    Ver gráfica
                  </StatefulButton>
                </div>
              </div>
            </section>
          </>
        ) : null}
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
        message={uiMessage}
        severity="warning"
        onClose={closeUiMessage}
      />
    </div>
  );
};

export default PracticeDetailPage;
