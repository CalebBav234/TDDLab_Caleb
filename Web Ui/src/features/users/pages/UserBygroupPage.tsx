import UsersByGroupTable from "../components/UsersByGroupTable";
import useUsersByGroupPage from "../hooks/useUsersByGroupPage";
import FeaturePageHeader from "../../../shared/components/FeaturePageHeader";
import FeatureScreenLayout from "../../../shared/components/FeatureScreenLayout";
import FeatureSectionDivider from "../../../shared/components/FeatureSectionDivider";
import ContentState from "../../../shared/components/ContentState";

function UsersByGroupPage() {
  const { users, group, loading, error } = useUsersByGroupPage();

  return (
    <FeatureScreenLayout className="users-by-group-page" sectionGap={0}>
      <FeaturePageHeader title={group ? group.groupName : "Grupo"} />
      <FeatureSectionDivider />
      {loading ? (
        <ContentState variant="loading" title="Cargando usuarios del grupo..." />
      ) : error ? (
        <ContentState
          variant="error"
          title="Error"
          description="Hubo un problema al cargar los datos del grupo."
        />
      ) : (
        <UsersByGroupTable users={users} />
      )}
    </FeatureScreenLayout>
  );
}

export default UsersByGroupPage;
