const SET_FILES = "SET_FILES";
const SET_CURRENT_DIR = "SET_CURRENT_DIR";

const defaultState = {
  files: [],
  currentDir: null,
};

export default function fileReducer(state = defaultState, action: any) {
  switch (action.type) {
    case SET_FILES:
      return { ...state, files: action.payload };
    case SET_CURRENT_DIR:
      return { ...state, files: action.payload };
    default:
      return state;
  }
}
// action
export const setFiles = (files: any) => ({ type: SET_FILES, payload: files });
export const setCurrentDir = (dir: any) => ({
  type: SET_CURRENT_DIR,
  payload: dir,
});
