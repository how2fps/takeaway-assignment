import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";

export default function DeleteDialog(props: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; onDelete: Function; selectedStaffIDToDelete: string }) {
       return (
              <Dialog
                     open={props.open}
                     onClose={() => props.setOpen(false)}
                     aria-labelledby="alert-dialog-title"
                     aria-describedby="alert-dialog-description">
                     <DialogContent>
                            <DialogContentText id="alert-dialog-description">Are you sure you want to delete?</DialogContentText>
                     </DialogContent>
                     <DialogActions>
                            <Button onClick={() => props.setOpen(false)}>Cancel</Button>
                            <Button
                                   onClick={() => props.onDelete(props.selectedStaffIDToDelete)}
                                   autoFocus>
                                   Delete
                            </Button>
                     </DialogActions>
              </Dialog>
       );
}
