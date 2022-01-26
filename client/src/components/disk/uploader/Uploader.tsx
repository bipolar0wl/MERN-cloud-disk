import React from "react";
import "./uploader.scss";
import UploadFile from "./UploadFile";

const Uploader = () => {
  const files: any = [];

  return (
    <div className="uploader">
      <div className="uploader__header">
        <div className="uploader__title"></div>
        <button className="uploader__close">x</button>
      </div>
      {files.map((file: any) => (
        <UploadFile key={file._id} file={file} />
      ))}
    </div>
  );
};

export default Uploader;
