import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import dayjs from "dayjs";
import { Redemption } from "../types";

function epochToDateTime(epoch: number) {
       return dayjs(epoch).format("DD/MM/YYYY HH:mm");
}

const RedemptionTable = (props: { data: Redemption[]; onDeleteClick: any }) => {
       return (
              <TableContainer component={Paper}>
                     <h2 style={{ marginLeft: "10px" }}>Redemption Table</h2>
                     <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table">
                            <TableHead>
                                   <TableRow>
                                          <TableCell align="left">Staff ID</TableCell>
                                          <TableCell align="right">Team Name</TableCell>
                                          <TableCell align="right">Time Redeemed</TableCell>
                                          <TableCell align="right">Action(s)</TableCell>
                                   </TableRow>
                            </TableHead>
                            <TableBody>
                                   {props.data.map((redemption) => (
                                          <TableRow key={redemption.staff_pass_id}>
                                                 <TableCell align="left">{redemption.staff_pass_id}</TableCell>
                                                 <TableCell align="right">{redemption.team_name}</TableCell>
                                                 <TableCell align="right">{epochToDateTime(redemption.redeemed_at)}</TableCell>
                                                 <TableCell align="right">
                                                        <IconButton onClick={() => props.onDeleteClick(redemption.staff_pass_id)}>
                                                               <DeleteForeverIcon style={{ fontSize: "35px" }} />
                                                        </IconButton>
                                                 </TableCell>
                                          </TableRow>
                                   ))}
                            </TableBody>
                     </Table>
              </TableContainer>
       );
};

export default RedemptionTable;
