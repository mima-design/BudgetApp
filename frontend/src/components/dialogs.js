import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import "./css/dialog.css"

export default function DialogWindow({open, onClose, actions = [], title = "", width = "30vw", height = "30vh", children = null}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      width={width}
      height={height}
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
  </Dialog>
  );
}