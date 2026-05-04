import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ActionButton from "../../../shared/components/ActionButton";
import ContentState from "../../../shared/components/ContentState";
import FeatureListSection from "../../../shared/components/FeatureListSection";
import FeaturePageHeader from "../../../shared/components/FeaturePageHeader";
import FeatureSectionDivider from "../../../shared/components/FeatureSectionDivider";
import AssignmentsFilterPopover from "../../../features/assignments/components/AssignmentsFilterPopover";
import AssignmentsListContent from "../../../features/assignments/components/AssignmentsList";
import { useAssignmentsScreen } from "../../../features/assignments/hooks/useAssignmentsScreen";

interface LegacyAssignmentsListProps {
  ShowForm: () => void;
  userRole: string;
  userGroupid: number | number[];
  onGroupChange: (groupId: number) => void;
}

function AssignmentsList({
  ShowForm,
  userRole,
  userGroupid,
  onGroupChange,
}: Readonly<LegacyAssignmentsListProps>) {
  const [filtersAnchorEl, setFiltersAnchorEl] = useState<HTMLElement | null>(
    null,
  );

  const screen = useAssignmentsScreen({
    userRole,
    userGroupid,
    onGroupChange,
  });

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
          <ContentState variant="loading" title="Cargando..." />
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
          <AssignmentsListContent
            assignments={screen.assignments}
            confirmationOpen={screen.confirmationOpen}
            feedbackMessage={screen.feedbackMessage}
            feedbackSeverity={screen.feedbackSeverity}
            handleClickDelete={screen.handleClickDelete}
            handleClickDetail={screen.handleClickDetail}
            handleConfirmDelete={screen.handleConfirmDelete}
            setConfirmationOpen={screen.setConfirmationOpen}
            setFeedbackMessage={screen.setFeedbackMessage}
            setValidationDialogOpen={screen.setValidationDialogOpen}
            userRole={userRole}
            validationDialogOpen={screen.validationDialogOpen}
          />
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
    </>
  );
}

export default AssignmentsList;
