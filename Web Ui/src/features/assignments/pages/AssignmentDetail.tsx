import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import StatefulButton from "../../../shared/components/StatefulButton";
import ContentState from "../../../shared/components/ContentState";
import DetailPageShell from "../../../shared/components/DetailPageShell";
import StudentDetailCard from "../../../shared/components/StudentDetailCard";
import { CommentDialog } from "../../../shared/components/CommentDialog";
import FeedbackSnackbar from "../../../shared/components/FeedbackSnackbar";
import { GitLinkDialog } from "../../../shared/components/GitHubLinkDialog";
import { formatDate } from "../../../utils/dateUtils";
import { DeliveriesTable } from "../components/detail/DeliveriesTable";
import { StudentSubmissionSummary } from "../components/detail/StudentSubmissionSummary";
import { TaskOverviewCard } from "../components/detail/TaskOverviewCard";
import { useAssignmentDetailData } from "../hooks/useAssignmentDetailData";
import "./AssignmentDetail.css";

function toDisplayDate(value: Date | string | null | undefined) {
  if (!value) {
    return "N/A";
  }

  const normalized = value instanceof Date ? value.toISOString() : value.toString();
  return formatDate(normalized);
}

interface AssignmentDetailProps {
  role: string;
  userid: number;
}

const AssignmentDetail: React.FC<AssignmentDetailProps> = ({ role, userid }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const assignmentid = Number(id);

  const {
    assignment,
    groupDetails,
    assignmentState,
    deliveriesState,
    deliveriesRows,
    studentSubmission,
    studentStatusLabel,
    isTaskInProgress,
    linkDialogOpen,
    isCommentDialogOpen,
    showIAButton,
    disableAdditionalGraphs,
    isStudent,
    openLinkDialog,
    closeLinkDialog,
    sendGithubLink,
    openCommentDialog,
    closeCommentDialog,
    sendComment,
    redirectStudentToGraph,
    redirectStudentToAssistant,
    openTeacherGraph,
    openTeacherAssistant,
    openTeacherAdditionalGraphs,
    studentRepositoryLink,
    submissionRepositoryLink,
    uiMessage,
    closeUiMessage,
  } = useAssignmentDetailData({ role, userid, assignmentid, navigate });
  const hasStudentSubmission = !!studentSubmission;
  const hasStudentRepository = !!studentSubmission?.repository_link;
  const canFinishTask = !isTaskInProgress;
  const isLoading = assignmentState === "loading";
  const hasError = assignmentState === "error" || !assignment;

  return (
    <>
      <DetailPageShell>
        {isLoading || hasError ? (
          <div className="detail-center-state" data-testid="loading-indicator">
            {isLoading ? (
              <ContentState variant="loading" title="Cargando..." />
            ) : (
              <Typography color="error">
                No se pudo cargar el detalle de la tarea. Intenta nuevamente.
              </Typography>
            )}
          </div>
        ) : (
          <>
            <TaskOverviewCard
              title={assignment.title}
              groupName={groupDetails?.groupName || "Cargando grupo..."}
              startDate={toDisplayDate(assignment.start_date)}
              endDate={toDisplayDate(assignment.end_date)}
            />

            {isStudent ? (
              <StudentDetailCard
                title="Mi entrega"
                titleClassName="assignment-section-title"
                sectionClassName="assignment-student-card"
                contentClassName="assignment-student-content"
                detailsClassName="assignment-student-details"
                actionsClassName="assignment-student-actions"
                details={
                  <StudentSubmissionSummary
                    status={studentStatusLabel}
                    repositoryLink={studentRepositoryLink}
                    comment={studentSubmission?.comment || undefined}
                  />
                }
                actions={
                  <>
                    <StatefulButton
                      variantStyle={!hasStudentSubmission ? 'primary' : 'secondary'}
                      onClick={() => {
                        if (!hasStudentSubmission) openLinkDialog();
                      }}
                    >
                      Iniciar tarea
                    </StatefulButton>

                    <StatefulButton
                      variantStyle={hasStudentRepository ? 'primary' : 'secondary'}
                      onClick={() => {
                        if (hasStudentRepository) redirectStudentToGraph();
                      }}
                    >
                      Ver gráfica
                    </StatefulButton>

                    <StatefulButton
                      variantStyle={canFinishTask ? 'primary' : 'secondary'}
                      onClick={() => {
                        if (canFinishTask) openCommentDialog();
                      }}
                    >
                      Finalizar tarea
                    </StatefulButton>

                    {showIAButton && (
                      <StatefulButton
                        variantStyle={studentSubmission?.repository_link ? 'primary' : 'secondary'}
                        onClick={() => {
                          if (studentSubmission?.repository_link) redirectStudentToAssistant();
                        }}
                      >
                        Asistente IA
                      </StatefulButton>
                    )}
                  </>
                }
              />
            ) : (
              <>
                <h2 className="assignment-section-title">Lista de entregas</h2>
                {deliveriesState === "loading" ? (
                  <div className="assignment-deliveries-state">
                    <ContentState variant="loading" title="Cargando..." />
                  </div>
                ) : deliveriesState === "error" ? (
                  <div className="assignment-deliveries-state">
                    <ContentState variant="error" title="Error al cargar..." />
                  </div>
                ) : deliveriesState === "empty" ? (
                  <div className="assignment-deliveries-state">
                    <ContentState variant="empty" title="Sin entregas" />
                  </div>
                ) : (
                  <section className="assignment-deliveries-card">
                    <DeliveriesTable
                      state={deliveriesState}
                      rows={deliveriesRows}
                showAdditionalGraphs={!disableAdditionalGraphs}
                onOpenGraph={openTeacherGraph}
                onOpenAssistant={openTeacherAssistant}
                onOpenAdditionalGraphs={openTeacherAdditionalGraphs}
              />
            </section>
                )}
              </>
            )}
          </>
        )}
      </DetailPageShell>

      <GitLinkDialog
        open={linkDialogOpen}
        onClose={closeLinkDialog}
        onSend={sendGithubLink}
      />

      <CommentDialog
        open={isCommentDialogOpen}
        link={submissionRepositoryLink}
        onSend={sendComment}
        onClose={closeCommentDialog}
      />

      <FeedbackSnackbar
        open={Boolean(uiMessage)}
        message={uiMessage ?? ""}
        onClose={closeUiMessage}
        severity="warning"
      />
    </>
  );
};

export default AssignmentDetail;
