import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ActionButton from "../../../shared/components/ActionButton";
import ContentState from "../../../shared/components/ContentState";
import FeatureListSection from "../../../shared/components/FeatureListSection";
import FeaturePageHeader from "../../../shared/components/FeaturePageHeader";
import FeatureScreenLayout from "../../../shared/components/FeatureScreenLayout";
import FeatureSectionDivider from "../../../shared/components/FeatureSectionDivider";
import AssignmentForm from "../components/AssignmentForm";
import AssignmentsFilterPopover from "../components/AssignmentsFilterPopover";
import AssignmentsList from "../components/AssignmentsList";
import { useAssignmentsScreen } from "../hooks/useAssignmentsScreen";
import { AssignmentScreenProps } from "../types/assignmentScreen";

function AssignmentsPage({
  userRole,
  userGroupid,
}: Readonly<AssignmentScreenProps>) {
  const [createAssignmentPopupOpen, setCreateAssignmentPopupOpen] =
    useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<number>(
    userGroupid > 0 ? userGroupid : 0,
  );
  const [filtersAnchorEl, setFiltersAnchorEl] = useState<HTMLElement | null>(
    null,
  );

  const handleCreateAssignmentClick = () => {
    setCreateAssignmentPopupOpen(true);
  };

  const assignmentsScreen = useAssignmentsScreen({
    userRole,
    userGroupid,
    onGroupChange: setSelectedGroupId,
  });

  const headerActions = (
    <>
      <ActionButton
        endIcon={<KeyboardArrowDownIcon />}
        variantStyle="secondary"
        onClick={(event) => setFiltersAnchorEl(event.currentTarget)}
      >
        Filtrar
      </ActionButton>
      {assignmentsScreen.showCreateButton ? (
        <ActionButton
          startIcon={<AddIcon />}
          variantStyle="primary"
          onClick={handleCreateAssignmentClick}
        >
          Crear
        </ActionButton>
      ) : null}
    </>
  );

  const listSection = (
    <FeatureListSection>
      {assignmentsScreen.isLoading ? (
        <ContentState variant="loading" title="Cargando..." />
      ) : assignmentsScreen.error ? (
        <ContentState
          variant="error"
          title="Error al cargar..."
          description={assignmentsScreen.error.message}
        />
      ) : assignmentsScreen.assignments.length === 0 ? (
        <ContentState
          variant="empty"
          title="Sin resultados"
          description="Cuando existan tareas para el grupo seleccionado, apareceran en este listado."
        />
      ) : (
        <AssignmentsList
          assignments={assignmentsScreen.assignments}
          confirmationOpen={assignmentsScreen.confirmationOpen}
          feedbackMessage={assignmentsScreen.feedbackMessage}
          feedbackSeverity={assignmentsScreen.feedbackSeverity}
          handleClickDelete={assignmentsScreen.handleClickDelete}
          handleClickDetail={assignmentsScreen.handleClickDetail}
          handleConfirmDelete={assignmentsScreen.handleConfirmDelete}
          setConfirmationOpen={assignmentsScreen.setConfirmationOpen}
          setFeedbackMessage={assignmentsScreen.setFeedbackMessage}
          setValidationDialogOpen={assignmentsScreen.setValidationDialogOpen}
          userRole={userRole}
          validationDialogOpen={assignmentsScreen.validationDialogOpen}
        />
      )}
    </FeatureListSection>
  );

  return (
    <FeatureScreenLayout
      className="assignments-page"
      testId="assignments-container"
      sectionGap={0}
    >
      <FeaturePageHeader title="Tareas" actions={headerActions} />
      <FeatureSectionDivider />
      {listSection}

      <AssignmentsFilterPopover
        anchorEl={filtersAnchorEl}
        groupList={assignmentsScreen.groupList}
        onClose={() => setFiltersAnchorEl(null)}
        onGroupChange={assignmentsScreen.handleGroupChange}
        onSortingChange={assignmentsScreen.handleOrderAssignments}
        open={Boolean(filtersAnchorEl)}
        selectedGroup={assignmentsScreen.selectedGroup}
        selectedSorting={assignmentsScreen.selectedSorting}
      />

      {createAssignmentPopupOpen ? (
        <AssignmentForm
          data-testid="form-container"
          open={createAssignmentPopupOpen}
          handleClose={() => setCreateAssignmentPopupOpen(false)}
          groupid={selectedGroupId}
        />
      ) : null}
    </FeatureScreenLayout>
  );
}

export default AssignmentsPage;
