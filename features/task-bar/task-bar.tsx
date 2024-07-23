// Import libraries
import {
  Box,
  Divider,
  useTheme,
  useMediaQuery,
  type DrawerProps,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationCircle,
  faChevronDown,
} from "@fortawesome/pro-regular-svg-icons";

// Import components
import {
  TaskbarContainer,
  Title,
  MainTaskName,
  TaskName,
  TaskStatus,
} from "./task-bar.styles";
import Button from "@/components/button/button";
import Loader from "@/components/loader/loader";
import UserCard from "@/features/user-card/user-card";

const dummyTasks1 = {
  id: 0,
  agentName: "Agent P.",
  agentRole: "Your Project Manager",
  backgroundColor: "#E9EEFF",
  task: [
    {
      id: 1,
      taskName: "Breaking up main task to sub-tasks",
      status: "Processing...",
    },
  ],
};

const dummyTasks2 = {
  id: 1,
  agentName: "Agent T.",
  agentRole: "Your Tester",
  backgroundColor: "#FFE3E3",
  task: [
    {
      id: 1,
      taskName: "Test complete",
      status: "Processing...",
    },
    {
      id: 2,
      taskName: "Test 01: This i dummy copy",
      status: "Done",
    },
    {
      id: 3,
      taskName: "Test 02: This i dummy copy",
      status: "Done",
    },
  ],
};

const dummyTasks3 = {
  id: 2,
  agentName: "Agent E.",
  agentRole: "Your Engineer",
  backgroundColor: "#E7FFB4",
  task: [
    {
      id: 1,
      taskName: "All deliverables handed over",
      status: "Deficit",
    },
  ],
};

const AgentTasks = [dummyTasks1, dummyTasks2, dummyTasks3];

const TaskBar = (props: DrawerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing...":
        return <Loader />;
      case "Done":
        return (
          <FontAwesomeIcon
            icon={faCheck}
            color={"#00C853"}
            style={{ fontSize: 12 }}
          />
        );
      case "Deficit":
        return (
          <FontAwesomeIcon
            icon={faExclamationCircle}
            color={"#FF1744"}
            style={{ fontSize: 12 }}
          />
        );
      default:
        return (
          <FontAwesomeIcon
            icon={faExclamationCircle}
            color={"#FF1744"}
            style={{ fontSize: 12 }}
          />
        );
    }
  };

  return (
    <TaskbarContainer
      variant="persistent"
      anchor={isMobile ? "bottom" : "right"}
      {...props}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            alignItems: "center",
          }}
          //@ts-ignore
          onClick={() => props?.onClose()}
        >
          <Title>Tasks</Title>
          {isMobile && (
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ fontSize: 12, strokeWidth: "1.5px" }}
            />
          )}
        </Box>
        <Button
          variant="contained"
          style={{
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          Cancel project
        </Button>
      </Box>
      <Divider />
      <Box
        sx={{
          padding: "16px",
        }}
      >
        {AgentTasks.map((agentTask, index) => (
          <Box key={`agent-${index}`}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <UserCard
                username={agentTask.agentName}
                role={agentTask.agentRole}
                backgroundColor={agentTask.backgroundColor}
              />
            </Box>
            <Box
              sx={{
                padding: "2px 8px",
                borderRadius: "8px",
                backgroundColor: agentTask.backgroundColor,
                width: "fit-content",
                fontSize: 10,
              }}
            >
              Main task
            </Box>
            <Box
              sx={{
                margin: "8px 0",
                padding: "8px 12px",
                borderRadius: "8px",
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              {agentTask.task.map((item, index) => (
                <Box key={`task-${index}`}>
                  {index === 0 ? (
                    <MainTaskName>{item.taskName}</MainTaskName>
                  ) : (
                    <TaskName>{item.taskName}</TaskName>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TaskStatus>{item.status}</TaskStatus>
                    {getStatusIcon(item.status)}
                  </Box>
                  {index !== agentTask.task.length - 1 && (
                    <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} />
                  )}
                </Box>
              ))}
            </Box>

            <Divider
              sx={{
                margin: "15px -20px",
              }}
            />
          </Box>
        ))}
      </Box>
    </TaskbarContainer>
  );
};

export default TaskBar;
