import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ActionButton from "../../../shared/components/ActionButton";
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog";
import ContentState from "../../../shared/components/ContentState";
import FeedbackSnackbar from "../../../shared/components/FeedbackSnackbar";
import FeatureItemsLayout from "../../../shared/components/FeatureItemsLayout";
import FeatureListSection from "../../../shared/components/FeatureListSection";
import FeaturePageHeader from "../../../shared/components/FeaturePageHeader";
import FeatureSectionDivider from "../../../shared/components/FeatureSectionDivider";
import ValidationDialog from "../../../shared/components/ValidationDialog";
import { useAssignmentsScreen } from "../hooks/useAssignmentsScreen";
import { AssignmentListProps } from "../types/assignmentScreen";
import AssignmentRow from "./AssignmentRow";
import AssignmentsFilterPopover from "./AssignmentsFilterPopover";

function LegacyAssignmentsList({
  ShowForm,
  onGroupChange,
  userGroupid,
  userRole,
}: Readonly<AssignmentListProps>) {
  const [filtersAnchorEl, setFiltersAnchorEl] = useState<HTMLElement | null>(
    null,
  );

  const screen = useAssignmentsScreen({
    userRole,
    userGroupid: userGroupid ?? 0,
    onGroupChange: onGroupChange ?? (() => undefined),
  });

  const canManageAssignments = userRole === "teacher" || userRole === "admin";

  return (
    <>
      <FeaturePageHeader
        title="Tareas"
        actions={
          <>
            <ActionButton
              endIcon={<KeyboardArrowDownIcon />}
              variantStyle="secondary"
              onClick={(event) => setFiltersAnchorEl(event.currentTarget)}
            >
              Filtrar
            </ActionButton>
            {screen.showCreateButton ? (
              <ActionButton
                startIcon={<AddIcon />}
                variantStyle="primary"
                onClick={ShowForm}
              >
                Crear
              </ActionButton>
            ) : null}
          </>
        }
      />
      <FeatureSectionDivider />

      <FeatureListSection>
        {screen.isLoading ? (
          <ContentState variant="loading" title="Cargando tareas..." />
        ) : screen.error ? (
          <ContentState
            variant="error"
            title="No se pudieron cargar las tareas"
            description={screen.error.message}
          />
        ) : screen.assignments.length === 0 ? (
          <ContentState
            variant="empty"
            title="No hay tareas disponibles"
            description="Cuando existan tareas para el grupo seleccionado, apareceran en este listado."
          />
        ) : (
          <FeatureItemsLayout>
            {screen.assignments.map((assignment) => (
              <AssignmentRow
                key={assignment.id}
                item={assignment}
                canManage={canManageAssignments}
                onDelete={screen.handleClickDelete}
                onView={screen.handleClickDetail}
              />
            ))}
          </FeatureItemsLayout>
        )}
      </FeatureListSection>

      <AssignmentsFilterPopover
        anchorEl={filtersAnchorEl}
        groupList={screen.groupList}
        onClose={() => setFiltersAnchorEl(null)}
        onGroupChange={screen.handleGroupChange}
        onSortingChange={screen.handleOrderAssignments}
        open={Boolean(filtersAnchorEl)}
        selectedGroup={screen.selectedGroup}
        selectedSorting={screen.selectedSorting}
      />

      {screen.confirmationOpen ? (
        <ConfirmationDialog
          open={screen.confirmationOpen}
          title="Eliminar la tarea?"
          content={
            <>
              Ten en cuenta que esta accion tambien eliminara <br /> todas las
              entregas asociadas.
            </>
          }
          cancelText="Cancelar"
          deleteText="Eliminar"
          onCancel={() => screen.setConfirmationOpen(false)}
          onDelete={screen.handleConfirmDelete}
        />
      ) : null}

      {screen.validationDialogOpen ? (
        <ValidationDialog
          open={screen.validationDialogOpen}
          title="Tarea eliminada exitosamente"
          closeText="Cerrar"
          onClose={() => {
            screen.setValidationDialogOpen(false);
          }}
        />
      ) : null}

      <FeedbackSnackbar
        open={Boolean(screen.feedbackMessage) && !screen.validationDialogOpen}
        message={screen.feedbackMessage}
        severity={screen.feedbackSeverity}
        onClose={() => screen.setFeedbackMessage("")}
      />
    </>
  );
}

function ModernAssignmentsList({
  assignments,
  confirmationOpen,
  feedbackMessage,
  feedbackSeverity,
  handleClickDelete,
  handleClickDetail,
  handleConfirmDelete,
  setConfirmationOpen,
  setFeedbackMessage,
  setValidationDialogOpen,
  userRole,
  validationDialogOpen,
}: Readonly<AssignmentListProps>) {
  const canManageAssignments = userRole === "teacher" || userRole === "admin";

  return (
    <>
      <FeatureItemsLayout>
        {(assignments ?? []).map((assignment) => (
          <AssignmentRow
            key={assignment.id}
            item={assignment}
            canManage={canManageAssignments}
            onDelete={handleClickDelete ?? (() => undefined)}
            onView={handleClickDetail ?? (() => undefined)}
          />
        ))}
      </FeatureItemsLayout>

      {confirmationOpen ? (
        <ConfirmationDialog
          open={confirmationOpen}
          title="Eliminar la tarea?"
          content={
            <>
              Ten en cuenta que esta accion tambien eliminara <br /> todas las
              entregas asociadas.
            </>
          }
          cancelText="Cancelar"
          deleteText="Eliminar"
          onCancel={() => setConfirmationOpen?.(false)}
          onDelete={handleConfirmDelete ?? (async () => undefined)}
        />
      ) : null}

      {validationDialogOpen ? (
        <ValidationDialog
          open={validationDialogOpen}
          title="Tarea eliminada exitosamente"
          closeText="Cerrar"
          onClose={() => {
            setValidationDialogOpen?.(false);
          }}
        />
      ) : null}

      <FeedbackSnackbar
        open={Boolean(feedbackMessage) && !validationDialogOpen}
        message={feedbackMessage ?? ""}
        severity={feedbackSeverity ?? "success"}
        onClose={() => setFeedbackMessage?.("")}
      />
    </>
  );
}

function AssignmentsList(props: Readonly<AssignmentListProps>) {
  const isLegacyMode = Boolean(props.ShowForm || props.onGroupChange);

  if (isLegacyMode) {
    return <LegacyAssignmentsList {...props} />;
  }

  return <ModernAssignmentsList {...props} />;
}

export default AssignmentsList;
