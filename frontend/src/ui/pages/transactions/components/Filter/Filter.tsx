import { debounce, TextField, TextFieldProps } from "@mui/material";

interface FilterProps {
  onFilterChange: (filterValue: string) => void;
}

export const Filter = ({ onFilterChange }: FilterProps): JSX.Element => {
  const onChangeHandler: TextFieldProps["onChange"] = debounce((event) => {
    onFilterChange(event.target.value);
  }, 500);

  return (
    <TextField onChange={onChangeHandler} id="filter-input" label="Filter by beneficiary field" variant="standard" />
  );
};
