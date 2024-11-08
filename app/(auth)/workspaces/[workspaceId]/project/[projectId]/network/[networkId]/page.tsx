"use client";

// Import libraries
import { Typography, Box, Divider, DialogContent } from "@mui/material";
import {
  faPlus,
  faArrowUpFromBracket,
  faEllipsis,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useMemo, useEffect } from "react";
import FileIcon from "@/assets/icons/file-icon.svg";
import Image from "next/image";

// Import components
import SearchField from "@/components/search-field/search-field";
import Dialog from "@/components/dialog/dialog";
import Button from "@/components/button/button";
import { SectionToolBar } from "@/app/(auth)/all-projects/all-projects.styles";
import SessionCard from "@/features/session-card/session-card";
import FileDropzone from "@/components/file-dropzone/file-dropzone";
import IconButton from "@/components/icon-button/icon-button";
import CustomPopover from "@/components/custom-popover/custom-popover";

// Import hooks
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

// Import redux
import { toggleIsCreate } from "@/redux/project/projectSlice";

// Import utils
import { SESSIONS } from "@/utils/constants";
import { COLORS } from "@/utils/colors";
// Import types
import { TSessionCard } from "@/features/session-card/session-card";

type TSessionList = {
  searchText: string;
  sessionList: TSessionCard[];
  toggleDialog: () => void;
};

const EmptySessionList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        marginTop: "-100px",
      }}
    >
      <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
        Currently, you have no sessions
      </Typography>
      <Button
        variant="contained"
        startIcon={<FontAwesomeIcon icon={faPlus} style={{ fontSize: 12 }} />}
        onClick={() => {}}
        style={{ textTransform: "none" }}
      >
        Create sessions
      </Button>
    </Box>
  );
};

const SessionList = ({ searchText, sessionList }: TSessionList) => {
  const sessions = useMemo(() => {
    if (!searchText) return sessionList;

    return sessionList.filter((project) =>
      project.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }, [sessionList, searchText]);

  return (
    <>
      <Box
        component={"div"}
        sx={{ display: "flex", flexDirection: "column", gap: "32px" }}
      >
        {sessions?.map((session, idx) => (
          <SessionCard
            key={`session-card-${idx}`}
            id={session.id}
            name={session.name}
            owner={session.owner}
            lastUsed={session.lastUsed}
          />
        ))}
      </Box>
    </>
  );
};

const AllSessions = () => {
  const dispatch = useAppDispatch();

  const { isCreate } = useAppSelector((state) => state.project);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [sessionList, setSessionList] = useState<TSessionCard[]>(SESSIONS);
  const [searchText, setSearchText] = useState<string>("");
  const [hasProjects, setHasProjects] = useState(true);
  const [files, setFiles] = useState<File[]>([]);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const popperId = open ? "simple-popover" : undefined;

  const toggleDialog = () => {
    setIsDialogOpen((prevState) => !prevState);
    dispatch(toggleIsCreate());
  };

  const handleUpload = () => {
    setIsUploadDialogOpen((prevState) => !prevState);
  };

  return (
    <Box component={"section"}>
      <SectionToolBar component={"div"}>
        <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
          All Sessions
        </Typography>
        {hasProjects ? (
          <Box component={"div"} sx={{ display: "flex", gap: "12px" }}>
            <SearchField
              value={searchText}
              placeholder="Search sessions"
              onChange={(e) => setSearchText(e.target.value)}
              onClose={() => setSearchText("")}
            />
            {/* <Button
              variant="outlined"
              startIcon={
                <FontAwesomeIcon
                  icon={faArrowUpFromBracket}
                  style={{ fontSize: 12 }}
                />
              }
              onClick={handleUpload}
            >
              Upload / View Data
            </Button> */}
            <Button
              variant="contained"
              startIcon={
                <FontAwesomeIcon icon={faPlus} style={{ fontSize: 12 }} />
              }
              onClick={toggleDialog}
            >
              Start New Session
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </SectionToolBar>
      <Box
        sx={{
          width: "100%",
          // height: "calc(100vh - 95px)",
          marginTop: "42px",
        }}
      >
        {hasProjects ? (
          <SessionList
            searchText={searchText}
            sessionList={sessionList}
            toggleDialog={toggleDialog}
          />
        ) : (
          <EmptySessionList />
        )}
      </Box>

      {files.length > 0 && (
        <Box
          sx={{
            width: "100%",
            // height: "calc(100vh - 95px)",
            marginTop: "42px",
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: 600, marginTop: 10 }}>
            Project - Uploaded Data
          </Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: 600, marginTop: 3 }}>
            Name
          </Typography>

          <Box
            sx={{
              width: "90%",
              height: "32px",
              marginTop: "10px",
            }}
          >
            {files.map((file, idx) => (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "32px",
                    padding: "22px 0px 15px 0px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={FileIcon}
                      style={{ height: 16, width: 12 }}
                      alt="File-Icon"
                    />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: COLORS.lightGray,
                      }}
                    >
                      {file.name}
                    </Typography>
                  </Box>
                  <IconButton
                    aria-describedby={popperId}
                    icontype="icon"
                    icon={faEllipsis}
                    style={{
                      color: COLORS.mildGrey,
                      fontSize: 18,
                    }}
                    onClick={handleClick}
                  />
                  <CustomPopover
                    id={popperId}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Box>Rename</Box>
                    <Box>Delete file</Box>
                  </CustomPopover>
                </Box>
                <Divider />
              </>
            ))}
          </Box>
        </Box>
      )}
      <Dialog
        open={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        PaperProps={{
          style: {
            padding: 0,
          },
        }}
      >
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 0,
          }}
        >
          <FileDropzone
            width={380}
            height={250}
            onClose={() => setIsUploadDialogOpen(false)}
            setFiles={setFiles}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AllSessions;
