import { debounce, Paper, TextField, TextFieldProps } from "@mui/material";

export interface FilterProps {
  onFilterChange: (filterValue: string) => void;
}

export const Filter = ({ onFilterChange }: FilterProps): JSX.Element => {
  const onChangeHandler: TextFieldProps["onChange"] = debounce((event) => {
    onFilterChange(event.target.value);
  }, 500);

  return (
    <Paper sx={{ display: "flex", padding: "1rem", flexGrow: 1 }}>
      <TextField
        onChange={onChangeHandler}
        id="filter-input"
        label="Filter by beneficiary field"
        variant="standard"
        sx={{ flexGrow: 1 }}
      />
    </Paper>
  );
};
