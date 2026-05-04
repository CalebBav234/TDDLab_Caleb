import useUsersPage from "../hooks/useUsersPage";
import FeaturePageHeader from "../../../shared/components/FeaturePageHeader";
import FeatureScreenLayout from "../../../shared/components/FeatureScreenLayout";
import FeatureSectionDivider from "../../../shared/components/FeatureSectionDivider";
import ContentState from "../../../shared/components/ContentState";

import UsersHeader from "../components/UsersHeader";
import UsersTable from "../components/UsersTable";

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
      <FeaturePageHeader
        title="Usuarios"
        actions={
          <UsersHeader
            groups={groups}
            selectedGroup={selectedGroup}
            searchQuery={searchQuery}
            onGroupChange={handleGroupValueChange}
            onSearchChange={handleSearchQueryChange}
          />
        }
      />
      <FeatureSectionDivider />

      {loading ? (
        <ContentState variant="loading" title="Cargando..." />
      ) : error ? (
        <ContentState
          variant="error"
          title="Error al cargar..."
          description="Hubo un problema al cargar los usuarios."
        />
      ) : filteredUsers.length === 0 ? (
        <ContentState
          variant="empty"
          title="Sin resultados"
          description="No hay usuarios que coincidan con los filtros actuales."
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
