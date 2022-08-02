import { Box, Button, Dialog, Modal, TextField } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { ChangeEvent, useState, useContext } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

export const AddingModal = () => {
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);
  const { isAdding, notAddingTask } = useContext(UIContext);

  const { addNewEntry } = useContext(EntriesContext);

  const onTextChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    notAddingTask();
    setTouched(false);
    setInputValue("");
  };
  return (
    <Dialog open={isAdding} onClose={notAddingTask}>
      <Box sx={{ marginBottom: 2, paddingX: 1 }}>
        <TextField
          fullWidth
          sx={{ marginTop: 2, marginBottom: 1 }}
          placeholder="Nueva entrada"
          autoFocus
          multiline
          label="Nueva entrada"
          error={inputValue.length <= 0 && touched}
          helperText={inputValue.length <= 0 && touched && "Ingrese un valor"}
          value={inputValue}
          onChange={onTextChanges}
          onBlur={() => setTouched(true)}
        />
        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={notAddingTask}>
            Cancelar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<SaveRoundedIcon />}
            onClick={onSave}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
