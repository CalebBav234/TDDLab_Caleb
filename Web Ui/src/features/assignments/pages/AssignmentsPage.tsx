import { useState } from "react";
import FeatureScreenLayout from "../../../shared/components/FeatureScreenLayout";
import AssignmentForm from "../components/AssignmentForm";
import AssignmentsList from "../components/AssignmentsList";
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

  const handleCreateAssignmentClick = () => {
    setCreateAssignmentPopupOpen(true);
  };

  return (
    <FeatureScreenLayout
      className="assignments-page"
      testId="assignments-container"
      sectionGap={0}
    >
      <AssignmentsList
        ShowForm={handleCreateAssignmentClick}
        userRole={userRole}
        userGroupid={userGroupid}
        onGroupChange={setSelectedGroupId}
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
