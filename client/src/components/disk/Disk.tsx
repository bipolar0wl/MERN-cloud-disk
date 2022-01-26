import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../actions/file";
import FileList from "./fileList/FileList";
import "./disk.scss";
import Popup from "./Popup";
import { setCurrentDir, setPopupDisplay } from "../../reducers/fileReducer";

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state: any) => state.files.currentDir); // Текущая директория
  const dirStack = useSelector((state: any) => state.files.dirStack); // Вложенность папок
  const [dragEnter, setDragEnter] = useState(false); // Работает ли dranNdrop

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  const showPopupHandler = () => {
    dispatch(setPopupDisplay("flex"));
  };

  const backClickHandler = () => {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  };

  const fileUploadHandler = (event: any) => {
    const files = [...event.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  };

  function dragEnterHandler(event: any) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }

  function dragLeaveHandler(event: any) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }
  function dropHandler(event: any) {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  }

  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className="disk__btns">
        <button className="disk__back" onClick={() => backClickHandler()}>
          Назад
        </button>
        <button className="disk__create" onClick={() => showPopupHandler()}>
          Создать папку
        </button>
        <div className="disk__upload">
          <label htmlFor="" className="disk__upload-label">
            Загрузить файл
          </label>
          <input
            multiple
            onChange={(event) => fileUploadHandler(event)}
            type="file"
            id="disk__upload-input"
            className="disk__upload-input"
          />
        </div>
      </div>
      {/* <FileList /> */}
      <Popup />
    </div>
  ) : (
    <div
      className="drop-area"
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      Перетащите файлы сюда
    </div>
  );
};

export default Disk;
