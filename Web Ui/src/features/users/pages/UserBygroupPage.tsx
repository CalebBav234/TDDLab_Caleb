import UsersByGroupTable from "../components/UsersByGroupTable";
import useUsersByGroupPage from "../hooks/useUsersByGroupPage";
import FeaturePageHeader from "../../../shared/components/FeaturePageHeader";
import FeatureListSection from "../../../shared/components/FeatureListSection";
import FeatureScreenLayout from "../../../shared/components/FeatureScreenLayout";
import FeatureSectionDivider from "../../../shared/components/FeatureSectionDivider";
import ContentState from "../../../shared/components/ContentState";

function UsersByGroupPage() {
  const { users, group, loading, error } = useUsersByGroupPage();

  return (
    <FeatureScreenLayout className="users-by-group-page" sectionGap={0}>
      <FeaturePageHeader title={group ? group.groupName : "Grupo"} />
      <FeatureSectionDivider />
      <FeatureListSection>
        {loading ? (
          <ContentState variant="loading" title="Cargando..." />
        ) : error ? (
          <ContentState
            variant="error"
            title="Error al cargar..."
            description="Hubo un problema al cargar los datos del grupo."
          />
        ) : users.length === 0 ? (
          <ContentState
            variant="empty"
            title="Sin resultados"
            description="Este grupo todavía no tiene usuarios asignados."
          />
        ) : (
          <UsersByGroupTable users={users} />
        )}
      </FeatureListSection>
    </FeatureScreenLayout>
  );
}

export default UsersByGroupPage;
