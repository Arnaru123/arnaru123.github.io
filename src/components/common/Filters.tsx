import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import type { FilterParams } from "types/filterParams";

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const genderParam = searchParams.get("gender") || "";
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    // const name = searchParams.get("name");
    const params: FilterParams = {};

    if (event.target.name === "name") {
      params.name = event.target.value;
    }
    if (event.target.name === "gender") {
      params.gender = event.target.value;
    }

    setSearchParams(params);
  };

  return (
    <FormControl onChange={handleSearch}>
      <TextField label="Name" name="name" value={name} />
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="genderParam"
        name="gender"
        row
        // onChange={handleSearch}
      >
        <FormControlLabel value="" control={<Radio />} label="All" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel
          value="Genderless"
          control={<Radio />}
          label="Genderless"
        />
        <FormControlLabel value="unknown" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
};
