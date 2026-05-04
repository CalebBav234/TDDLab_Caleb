import AssignmentsListContent from "../../../features/assignments/components/AssignmentsList";
import { useAssignmentsScreen } from "../../../features/assignments/hooks/useAssignmentsScreen";

interface LegacyAssignmentsListProps {
  ShowForm: () => void;
  userRole: string;
  userGroupid: number | number[];
  onGroupChange: (groupId: number) => void;
}

function AssignmentsList({
  ShowForm: _ShowForm,
  userRole,
  userGroupid,
  onGroupChange,
}: Readonly<LegacyAssignmentsListProps>) {
  const screen = useAssignmentsScreen({
    userRole,
    userGroupid,
    onGroupChange,
  });

  return (
    <>
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
    </>
  );
}

export default AssignmentsList;
