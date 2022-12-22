import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { MouseEvent, SyntheticEvent } from "react";
import { useSearchParams } from "react-router-dom";
import type { FilterParams } from "types/filterParams";

export const Filters = () => {
  const [_, setSearchParams] = useSearchParams();

  const handleSearch = (event: SyntheticEvent) => {
    event.preventDefault();
    const searchParamsObj: FilterParams = { page: "1" };
    const target = event.target as typeof event.target & {
      name: { value: string };
      gender: { value: string };
    };
    const name = target.name.value;
    const gender = target.gender.value;

    if (name) {
      searchParamsObj.name = name;
    }
    if (gender) {
      searchParamsObj.gender = gender;
    }

    setSearchParams(searchParamsObj);
  };

  const handleReset = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const searchParamsObj: FilterParams = { page: "1" };

    setSearchParams(searchParamsObj);
  };

  return (
    <form onSubmit={handleSearch} style={{ marginBottom: "50px" }}>
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        <Grid item>
          <TextField placeholder="Search by name..." name="name" />
        </Grid>
        <Grid item>
          <RadioGroup name="gender" row>
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="genderless"
              control={<Radio />}
              label="Genderless"
            />
            <FormControlLabel
              value="unknown"
              control={<Radio />}
              label="Unknown"
            />
          </RadioGroup>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
