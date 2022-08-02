import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  isAdding: boolean;
  addingTask: () => void;
  notAddingTask: () => void;
  isDragging: boolean;
  startDragging: () => void;
  endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
