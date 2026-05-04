import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
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
  const screen = useAssignmentsScreen({
    userRole,
    userGroupid,
    onGroupChange,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleGroupSelect = (event: SelectChangeEvent<number>) => {
    screen.handleGroupChange(event);
  };

  if (screen.isLoading) {
    return (
      <div>
        <Typography variant="h4" data-testid="page-title">
          Tareas
        </Typography>
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress data-testid="loading-indicator" />
        </Box>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h4" data-testid="page-title">
        Tareas
      </Typography>

      <Box display="flex" gap={2} marginBottom={2}>
        {screen.showCreateButton && (
          <Button
            variant="contained"
            color="primary"
            data-testid="create-button"
            onClick={() => {
              ShowForm();
            }}
          >
            Crear
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          data-testid="filter-button"
          onClick={handleFilterClick}
        >
          Filtrar
        </Button>
      </Box>

      {isFilterOpen && (
        <Box marginBottom={2} display="flex" gap={2}>
          <Box>
            <Typography id="grupo-label">Grupo</Typography>
            <Select
              value={screen.selectedGroup || 0}
              onChange={handleGroupSelect}
              displayEmpty
              fullWidth
              aria-labelledby="grupo-label"
            >
              <MenuItem value={0}>Todos los grupos</MenuItem>
              {screen.groupList?.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.groupName}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Typography id="ordenar-label">Ordenar</Typography>
            <Select
              value={screen.selectedSorting || ""}
              onChange={(e) => screen.handleOrderAssignments(e)}
              displayEmpty
              fullWidth
              aria-labelledby="ordenar-label"
            >
              <MenuItem value="">Por defecto</MenuItem>
              <MenuItem value="title">Título</MenuItem>
              <MenuItem value="date">Fecha</MenuItem>
            </Select>
          </Box>
        </Box>
      )}

      {screen.error ? (
        <Box>
          <Typography color="error">
            No se pudieron cargar las tareas
          </Typography>
          <Typography color="error">{screen.error.message}</Typography>
        </Box>
      ) : screen.assignments.length === 0 ? (
        <Typography>No hay tareas disponibles</Typography>
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
    </div>
  );
}

export default AssignmentsList;
