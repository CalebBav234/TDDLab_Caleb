import React from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function PracticeLinkCell({
  submissionState,
  repositoryLink,
}: Readonly<{
  submissionState: string;
  repositoryLink?: string;
}>) {
  if (submissionState === "loading") {
    return <span style={{ marginLeft: "8px" }}>Cargando...</span>;
  }
  if (submissionState === "error") {
    return <span style={{ marginLeft: "8px" }}>No disponible por error de carga</span>;
  }
  if (repositoryLink) {
    return (
      <a
        href={repositoryLink}
        target="_blank"
        rel="noopener noreferrer"
        className="practice-link-anchor"
      >
        <span className="practice-link-cell">{repositoryLink}</span>
      </a>
    );
  }
  return <span style={{ marginLeft: "8px" }}>No se inicio la practica</span>;
}
function PracticeStatusLabel({
  submissionState,
  statusLabel,
}: Readonly<{
  submissionState: string;
  statusLabel: string;
}>) {
  const label = submissionState === "loading" ? "Cargando..." : statusLabel;
  return <span style={{ marginLeft: "8px" }}>{label}</span>;
}

interface PracticeStudentCardProps {
  submission: { repository_link?: string } | null;
  submissionState: string;
  statusLabel: string;
  isTaskInProgress: boolean;
  openLinkDialog: () => void;
  openCommentDialog: () => void;
  redirectToGraph: () => void;
}

function PracticeStudentCard({
  submission,
  submissionState,
  statusLabel,
  isTaskInProgress,
  openLinkDialog,
  openCommentDialog,
  redirectToGraph,
}: Readonly<PracticeStudentCardProps>) {
  const hasSubmission = Boolean(submission);
  const hasRepo = Boolean(submission?.repository_link);
  const isLoading = submissionState === "loading";
  const canStart = !hasSubmission && !isLoading;
  const canFinish = !isTaskInProgress && !isLoading && hasRepo;
  const canView = hasRepo && !isLoading;

  return (
    <section className="practice-student-card">
      <h2 className="practice-section-title">Mi practica</h2>
      <div className="practice-student-content">
        <div className="practice-student-details">
          <div className="practice-student-row practice-enlace-row">
            <strong>Enlace:</strong>{" "}
            <PracticeLinkCell
              submissionState={submissionState}
              repositoryLink={submission?.repository_link}
            />
          </div>
          <div className="practice-student-row practice-estado-row">
            <strong>Estado:</strong>{" "}
            <PracticeStatusLabel
              submissionState={submissionState}
              statusLabel={statusLabel}
            />
          </div>
        </div>
        <div className="practice-student-actions">
          <StatefulButton
            variantStyle={canStart ? "primary" : "secondary"}
            onClick={() => canStart && openLinkDialog()}
          >
            Iniciar práctica
          </StatefulButton>
          <StatefulButton
            variantStyle={canFinish ? "primary" : "secondary"}
            onClick={() => canFinish && openCommentDialog()}
          >
            Finalizar práctica
          </StatefulButton>
          <StatefulButton
            variantStyle={canView ? "primary" : "secondary"}
            onClick={() => canView && redirectToGraph()}
          >
            Ver gráfica
          </StatefulButton>
        </div>
      </div>
    </section>
  );
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
        {practiceState === "loading" && (
          <div className="practice-center-state">
            <ContentState variant="loading" title="Cargando..." />
          </div>
        )}
        {practiceState === "error" && (
          <div className="practice-center-state">
            <ContentState
              variant="error"
              title="Error al cargar..."
              description="No se pudo cargar el detalle de la practica. Intenta nuevamente."
            />
          </div>
        )}
        {practiceState === "empty" && (
          <div className="practice-center-state">
            <ContentState
              variant="empty"
              title="Sin resultados"
              description="No se encontro la practica solicitada."
            />
          </div>
        )}
        {practice && (
          <>
            <PracticeOverviewCard title={practice.title} createdAt={createdAt} />
            <PracticeStudentCard
              submission={submission}
              submissionState={submissionState}
              statusLabel={statusLabel}
              isTaskInProgress={isTaskInProgress}
              openLinkDialog={openLinkDialog}
              openCommentDialog={openCommentDialog}
              redirectToGraph={redirectToGraph}
            />
          </>
        )}
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
