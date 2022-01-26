import axios from "axios";
import { addFile, deleteFileAction, setFiles } from "../reducers/fileReducer";

export const getFiles = (dirId: string) => {
  return async (dispatch: any) => {
    try {
      const responce = await axios.get(
        `http://localhost:5000/api/files${dirId ? "?parent=" + dirId : ""}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(setFiles(responce.data.files));
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
};

export const createDir = (dirId: string, name: string) => {
  return async (dispatch: any) => {
    try {
      const responce = await axios.post(
        `http://localhost:5000/api/files`,
        { name, type: "dir", parent: dirId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(addFile(responce.data));
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
};

export const uploadFile = (file: string, dirId: string) => {
  return async (dispatch: any) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (dirId) {
        formData.append("parent", dirId);
      }
      const responce = await axios.post(
        `http://localhost:5000/api/files/upload`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader("content-length") ||
                progressEvent.target.getResponseHeader(
                  "x-decompressed-content-length"
                );
            console.log("total", totalLength);
            if (totalLength) {
              let progress = Math.round(
                (progressEvent.loaded * 100) / totalLength
              );
              console.log(progress);
            }
          },
        }
      );
      dispatch(addFile(responce.data));
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
};

export const downloadFile = async (file: any) => {
  const response = await fetch(
    `http://localhost:5000/api/files/download?id=${file._id}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  if (response.status === 200) {
    const blob = await response.blob(); //
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};

export const deleteFile = async (file: any) => {
  return async (dispatch: any) => {
    try {
      const responce = await axios.delete(
        `http://localhost:5000/api/files?id=${file._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(deleteFileAction(file._id));
      alert(responce.data.message);
    } catch (error: any) {
      alert(error?.response?.data?.message);
    }
  };
};
