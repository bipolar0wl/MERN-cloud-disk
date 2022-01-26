import React from "react";
import { useSelector } from "react-redux";
import File from "./file/File";
import "./fileList.scss";

const FileList = () => {
  const files = useSelector((state: any) => state.files.files).map(
    (file: any) => <File key={file._id} file={file} />
  );

  return (
    <div className="filelist">
      <div className="filelist__header">
        <div className="flielist__name">Название</div>
        <div className="flielist__date">Дата</div>
        <div className="flielist__size">Размер</div>
      </div>
      {files}
    </div>
  );
};

export default FileList;
