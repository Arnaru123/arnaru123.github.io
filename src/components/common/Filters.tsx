import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { FilterParams } from "types/filterParams";

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryName = searchParams.get("name");
  const queryGender = searchParams.get("gender");
  const [initialValue, setInitialValue] = useState({
    name: queryName ?? "",
    gender: queryGender ?? "",
  });

  const genders = ["Female", "Male", "Genderless", "Unknown"];
  const genderOptions = genders.map((gender) => (
    <MenuItem key={gender} value={gender}>
      {gender}
    </MenuItem>
  ));

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
      searchParamsObj.name = name.trim();
    }
    if (gender) {
      searchParamsObj.gender = gender;
    }

    setSearchParams(searchParamsObj);
  };

  const handleReset = () => {
    const searchParamsObj: FilterParams = { page: "1" };
    setSearchParams(searchParamsObj);
    setInitialValue({ name: "", gender: "" });
  };

  return (
    <form
      onSubmit={handleSearch}
      onReset={handleReset}
      style={{ marginBottom: "50px" }}
    >
      <Box
        width="600px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <TextField
          placeholder="Search by name..."
          name="name"
          value={initialValue.name}
          onChange={({ target: { value } }) =>
            setInitialValue((initialValue) => ({
              ...initialValue,
              name: value,
            }))
          }
        />
        <Box width="150px">
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={initialValue.gender}
              label="gender"
              name="gender"
              onChange={({ target: { value } }) =>
                setInitialValue((initialValue) => ({
                  ...initialValue,
                  gender: value,
                }))
              }
            >
              <MenuItem disabled value="">
                Gender
              </MenuItem>
              {genderOptions}
            </Select>
          </FormControl>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">
            Search
          </Button>
          <Button type="reset" variant="contained">
            Reset
          </Button>
        </Stack>
      </Box>
    </form>
  );
};
