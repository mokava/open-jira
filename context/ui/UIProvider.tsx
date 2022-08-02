import { FC, ReactNode, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sidemenuOpen: boolean;
  isAdding: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAdding: false,
  isDragging: false,
};

interface Props {
  children: ReactNode;
}

export const UIProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: "[UI] - Open Sidebar" });
  };

  const closeSideMenu = () => {
    dispatch({ type: "[UI] - Close Sidebar" });
  };

  const addingTask = () => {
    dispatch({ type: "[UI] - Adding" });
  };
  const notAddingTask = () => {
    dispatch({ type: "[UI] - Not Adding" });
  };

  const startDragging = () => {
    dispatch({ type: "[UI] - Start Dragging" });
  };
  const endDragging = () => {
    dispatch({ type: "[UI] - End Dragging" });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        addingTask,
        notAddingTask,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
