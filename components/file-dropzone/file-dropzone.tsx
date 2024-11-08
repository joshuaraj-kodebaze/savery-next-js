// Import libraries
import { Box, Typography, type InputProps } from "@mui/material";
// import { DropzoneArea } from "mui-file-dropzone";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUpload, faTimes } from "@fortawesome/pro-regular-svg-icons";
import { COLORS } from "@/utils/colors";
// Import components
import "./file-dropzone.css";

type TFileDropzone = {
  label?: string;
  width?: number;
  height?: number;
  onClose?: () => void;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const FileDropzone = (props: TFileDropzone) => {
  const { width = 302, height = 228 } = props;

  const [dragOver, setDragOver] = useState(false);
  // const [files, setFiles] = useState<File[]>([]);

  const handleDragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileChange = (event: { target: { files: any } }) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles: File[] = Array.from(selectedFiles);
      props.setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDrop = (event: {
    preventDefault: () => void;
    dataTransfer: { files: any };
  }) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles: File[] = Array.from(droppedFiles);
      props.setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
    setDragOver(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  const handleRemoveFile = (index: number) => {
    props.setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <section className="drag-drop" style={{ width: width, height: height }}>
      <div
        className={`document-uploader ${dragOver ? "drag-over" : ""}`}
        style={{ width: width, height: height }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <>
          <div className="upload-info">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div></div>
              <FontAwesomeIcon
                icon={faCloudUpload}
                style={{
                  fontSize: 20,
                  backgroundColor: "#CC00FF",
                  padding: 8,
                  borderRadius: "6px",
                  color: "white",
                }}
              />

              <FontAwesomeIcon
                icon={faTimes}
                style={{
                  fontSize: 12,
                  color: "#A3A3A3",
                }}
                onClick={props.onClose}
              />
            </div>
          </div>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 400,
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            Drag and drop to upload file
          </Typography>
          <input
            type="file"
            hidden
            id="browse"
            onChange={handleFileChange}
            accept=".pdf,.docx,.pptx,.txt,.xlsx"
            multiple
          />
          <label htmlFor="browse" className="browse-btn">
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: "white" }}>
              Browse computer
            </Typography>
          </label>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 400,
              marginTop: 2,
              color: COLORS.lightGray,
            }}
          >
            You can upoad...
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 400,
              marginTop: 0,
              color: COLORS.lightGray,
            }}
          >
            Maximum file size...
          </Typography>
        </>
      </div>
    </section>
  );
};

export default FileDropzone;
