import { FC, ReactNode, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { AddingModal } from "../../components/ui/AddingModal";
import entriesApi from "../../apis/entriesApi";
import { useSnackbar } from "notistack";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface Props {
  children: ReactNode;
}

export const EntriesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });
    dispatch({ type: "[Entry] - Add-Entry", payload: data });
  };

  const updateEntry = async (entry: Entry, showSnackbar: boolean = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(
        `/entries/${entry._id}`,
        entry
      );

      dispatch({ type: "[Entry] - Entry-Updated", payload: entry });

      if (showSnackbar) {
        enqueueSnackbar("Entrada actualizada", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEntry = async (entry: Entry, showSnackbar: boolean = false) => {
    try {
      const { data } = await entriesApi.delete<Entry>(`/entries/${entry._id}`);
      dispatch({ type: "[Entry] - Entry-Deleted", payload: entry });
      if (showSnackbar) {
        enqueueSnackbar("Entrada eliminada", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] - Refresh-Data", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
