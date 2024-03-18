import { Alert, Button, Collapse, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteDialog from "./components/DeleteDialog";
import RedemptionTable from "./components/RedemptionTable";
import SearchBar from "./components/SearchBar";
import { Redemption, Staff } from "./types";

export function App() {
       const [staffList, setStaffList] = useState<Staff[]>([]);
       const [redemptionList, setRedemptionList] = useState<Redemption[]>([]);
       const [search, setSearch] = useState<string>("");
       const [redemptionAlreadyExists, setRedemptionAlreadyExists] = useState<boolean>(false);
       const [successfulRedemption, setSuccessfulRedemption] = useState<boolean>(false);
       const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
       const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
       const [selectedStaffIDToDelete, setSelectedStaffIDToDelete] = useState<string>("");
       const [successfulDelete, setSuccessfulDelete] = useState<boolean>(false);

       useEffect(() => {
              const fetchStaffList = async () => {
                     try {
                            const response = await fetch("http://localhost:3000/staff-list");
                            const staffListJSON = await response.json();
                            setStaffList(staffListJSON);
                     } catch (error) {
                            console.error("Error fetching data:", error);
                     }
              };
              fetchStaffList();
       }, []);

       const fetchRedemptionList = async () => {
              try {
                     const response = await fetch("http://localhost:3000/redemption");
                     const redemptionJSON: Redemption[] = await response.json();
                     setRedemptionList(redemptionJSON);
              } catch (error) {
                     console.error("Error fetching data:", error);
              }
       };
       useEffect(() => {
              fetchRedemptionList();
       }, []);

       useEffect(() => {
              const selectedStaff = staffList.find((staff) => staff.staff_pass_id === search);
              if (!selectedStaff) {
                     setSelectedStaff(null);
                     return;
              }
              setSelectedStaff(selectedStaff);
       }, [search, staffList]);

       async function selectRepresentative(redemptionData: Redemption) {
              try {
                     const response = await fetch("http://localhost:3000/redemption", {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                   "Content-Type": "application/json",
                                   "Access-Control-Allow-Origin": "*",
                            },
                            body: JSON.stringify(redemptionData),
                     });
                     console.log(response.status);
                     if (response.status === 200) {
                            fetchRedemptionList();
                            setSuccessfulRedemption(true);
                            setTimeout(() => {
                                   setSuccessfulRedemption(false);
                            }, 3000);
                     }
                     if (response.status === 403) {
                            setRedemptionAlreadyExists(true);
                            setTimeout(() => {
                                   setRedemptionAlreadyExists(false);
                            }, 3000);
                     }
              } catch (e) {
                     console.log(e);
              }
       }

       function onDeleteClick(staff_pass_id: string) {
              setSelectedStaffIDToDelete(staff_pass_id);
              setOpenDeleteDialog(true);
       }

       async function onDelete(staff_pass_id: string) {
              const queryParams = {
                     staff_pass_id: staff_pass_id,
              };

              const queryString = new URLSearchParams(queryParams).toString();

              setOpenDeleteDialog(false);
              try {
                     const response = await fetch(`http://localhost:3000/redemption?${queryString}`, {
                            method: "DELETE",
                            mode: "cors",
                            headers: {
                                   "Access-Control-Allow-Origin": "*",
                            },
                     });
                     if (response.status === 200) {
                            setSuccessfulDelete(true);
                            fetchRedemptionList();
                     }
              } catch (e) {
                     console.log(e);
              }
       }

       return (
              <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                     <h1>Redemption Interface</h1>
                     <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", background: "#f5f5f5", borderRadius: "5px", padding: "10px", marginBottom: "20px" }}>
                            <SearchBar
                                   data={staffList}
                                   setSearch={setSearch}
                            />
                            {selectedStaff ? <div style={{ marginTop: "7px" }}>Team name: {selectedStaff.team_name}</div> : ""}
                            <Collapse in={redemptionAlreadyExists}>
                                   <Alert
                                          severity="error"
                                          sx={{ mb: 1, mt: 2 }}>
                                          Team already has redeemed!
                                   </Alert>
                            </Collapse>
                            <Collapse in={successfulRedemption}>
                                   <Alert
                                          severity="success"
                                          sx={{ mb: 1, mt: 2 }}>
                                          Redemption is successful!
                                   </Alert>
                            </Collapse>
                            <Button
                                   style={{ marginTop: "10px" }}
                                   variant="contained"
                                   disabled={!selectedStaff}
                                   onClick={() => (selectedStaff ? selectRepresentative({ staff_pass_id: selectedStaff.staff_pass_id, team_name: selectedStaff.team_name, redeemed_at: Date.now() }) : "")}>
                                   Choose as team's representative
                            </Button>
                     </div>
                     <DeleteDialog
                            open={openDeleteDialog}
                            setOpen={setOpenDeleteDialog}
                            onDelete={onDelete}
                            selectedStaffIDToDelete={selectedStaffIDToDelete}
                     />
                     <RedemptionTable
                            data={redemptionList}
                            onDeleteClick={onDeleteClick}
                     />
                     <Snackbar
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                            open={successfulDelete}
                            onClose={() => setSuccessfulDelete(false)}
                            message={`Successfully deleted ${selectedStaffIDToDelete} from redemption table`}
                     />
              </div>
       );
}

export default App;
