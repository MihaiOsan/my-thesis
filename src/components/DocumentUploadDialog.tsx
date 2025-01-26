// src/components/DocumentUploadDialog.tsx

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface DocumentUploadDialogProps {
  thesisId: number; // ID-ul tezei pentru care încărcăm documentul
  open: boolean; // control dacă dialogul e deschis/închis
  onClose: () => void; // funcție apelată când dialogul se închide
  onUpload: (thesisId: number, docName: string) => void;
  // funcție care va salva documentul (ex. mută logica în TopicsContext)
}

const DocumentUploadDialog: React.FC<DocumentUploadDialogProps> = ({
  thesisId,
  open,
  onClose,
  onUpload,
}) => {
  const [docName, setDocName] = useState("");

  const handleUpload = () => {
    if (!docName.trim()) return;
    // Apelăm funcția venită din props, care e responsabilă să salveze datele
    onUpload(thesisId, docName);
    // Resetăm câmpul text și închidem dialogul
    setDocName("");
    onClose();
  };

  const handleCancel = () => {
    setDocName("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Încărcare document</DialogTitle>
      <DialogContent>
        <TextField
          label="Nume document"
          placeholder="Ex: Capitol1.pdf"
          fullWidth
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
          sx={{ marginTop: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Anulează</Button>
        <Button variant="contained" onClick={handleUpload}>
          Încarcă
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DocumentUploadDialog;
