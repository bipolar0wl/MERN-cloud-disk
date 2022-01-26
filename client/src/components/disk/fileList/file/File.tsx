import "./file.scss";
import dirLogo from "../../../../assets/img/logo.svg";
import fileLogo from "../../../../assets/img/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer";
import { deleteFile, downloadFile } from "../../../../actions/file";
import React from "react";

const File = (file: any) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state: any) => state.files.currentDir);

  function openDirHandler(file: any) {
    if (file.type === "dir") {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  }

  function downloadClickHandler(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    downloadFile(file);
  }

  function deleteClickHandler(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    dispatch(deleteFile(file));
  }

  return (
    <div className="file" onClick={() => openDirHandler(file)}>
      <img
        src={file.type === "dir" ? dirLogo : fileLogo}
        alt=""
        className="file__img"
      />
      <div className="file__name">{file.name}</div>
      {/* <div className="file__date">{file.date.slice(0, 10) || ""}</div> */}
      <div className="file__date">{file.date}</div>
      <div className="file__size">{file.size}</div>
      {file.type !== "dir" && (
        <button
          onClick={(event) => downloadClickHandler(event)}
          className="file__btn file__download"
        >
          Загрузить
        </button>
      )}
      <button
        onClick={(event) => deleteClickHandler(event)}
        className="file__btn file__delete"
      >
        Удалить
      </button>
    </div>
  );
};

export default File;
