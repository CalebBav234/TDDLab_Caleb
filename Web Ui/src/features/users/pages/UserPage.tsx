import useUsersPage from "../hooks/useUsersPage";
import FeatureScreenLayout from "../../../shared/components/FeatureScreenLayout";
import ContentState from "../../../shared/components/ContentState";

import UsersHeader from "../components/UsersHeader";
import UsersTable from "../components/UsersTable";
import UsersDivider from "../components/UsersDivider";

import { ValidationDialog } from "../components/dialogs/ValidationDialog";
import { ConfirmationDialog } from "../components/dialogs/ConfirmationDialog";

function UserPage() {
  const {
    groups,
    selectedGroup,
    searchQuery,
    filteredUsers,
    loading,
    error,
    groupMap,
    handleGroupValueChange,
    handleSearchQueryChange,
    openRemoveDialog,
    confirmRemoveUser,
    closeRemoveDialog,
    isRemoveDialogOpen,
    isFeedbackDialogOpen,
    feedbackMessage,
    closeFeedbackDialog,
  } = useUsersPage();

  return (
    <FeatureScreenLayout className="users-page" sectionGap={0}>
      <UsersHeader
        groups={groups}
        selectedGroup={selectedGroup}
        searchQuery={searchQuery}
        onGroupChange={handleGroupValueChange}
        onSearchChange={handleSearchQueryChange}
      />

      <UsersDivider />

      {loading ? (
        <ContentState variant="loading" title="Cargando usuarios..." />
      ) : error ? (
        <ContentState
          variant="error"
          title="Error"
          description="Hubo un problema al cargar los usuarios."
        />
      ) : (
        <UsersTable
          users={filteredUsers}
          groupMap={groupMap}
          onRemove={openRemoveDialog}
        />
      )}

      <ConfirmationDialog
        open={isRemoveDialogOpen}
        title="Confirmar eliminación"
        content="¿Eliminar usuario del grupo?"
        cancelText="Cancelar"
        deleteText="Eliminar"
        onCancel={closeRemoveDialog}
        onDelete={confirmRemoveUser}
      />

      <ValidationDialog
        open={isFeedbackDialogOpen}
        title={feedbackMessage}
        closeText="Cerrar"
        onClose={closeFeedbackDialog}
      />
    </FeatureScreenLayout>
  );
}

export default UserPage;
