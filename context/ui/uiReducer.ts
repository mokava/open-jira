import { UIState } from "./";

type UIActionType =
  | { type: "[UI] - Open Sidebar" }
  | { type: "[UI] - Close Sidebar" }
  | { type: "[UI] - Adding" }
  | { type: "[UI] - Not Adding" }
  | { type: "[UI] - Start Dragging" }
  | { type: "[UI] - End Dragging" };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "[UI] - Open Sidebar":
      return {
        ...state,
        sidemenuOpen: true,
      };
    case "[UI] - Close Sidebar":
      return {
        ...state,
        sidemenuOpen: false,
      };
    case "[UI] - Adding":
      return {
        ...state,
        isAdding: true,
      };
    case "[UI] - Not Adding":
      return {
        ...state,
        isAdding: false,
      };
    case "[UI] - Start Dragging":
      return {
        ...state,
        isDragging: true,
      };
    case "[UI] - End Dragging":
      return {
        ...state,
        isDragging: false,
      };

    default:
      return state;
  }
};
