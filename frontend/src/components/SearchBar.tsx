import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { Staff } from "../types";

const SearchBar = (props: { data: Staff[]; setSearch: React.Dispatch<React.SetStateAction<any>> }) => {
       const filterOptions = createFilterOptions({
              matchFrom: "any",
              limit: 25,
       });
       return (
              <div>
                     <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            filterOptions={filterOptions}
                            options={props.data}
                            getOptionLabel={(data: any) => data.staff_pass_id}
                            sx={{ width: 300, background: "white" }}
                            onChange={(e: any) => props.setSearch(e.target.innerHTML)}
                            renderInput={(params) => (
                                   <TextField
                                          {...params}
                                          label="Staff ID"
                                   />
                            )}
                     />
              </div>
       );
};

export default SearchBar;
