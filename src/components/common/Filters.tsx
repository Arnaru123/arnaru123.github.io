import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { FilterParams } from "types/filterParams";

const genders = ["Female", "Male", "Genderless", "Unknown"];
const genderOptions = genders.map((gender) => (
  <MenuItem key={gender} value={gender}>
    {gender}
  </MenuItem>
));

export const Filters = ({ className }: any) => {
  const mediaQuery = useMediaQuery("(max-width:650px)");
  const [searchParams, setSearchParams] = useSearchParams();
  const queryName = searchParams.get("name");
  const queryGender = searchParams.get("gender");
  const [filter, setFilter] = useState({
    name: queryName ?? "",
    gender: queryGender ?? "",
  });

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
    setFilter({ name: "", gender: "" });
  };

  const setNameFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setFilter((filter) => ({
      ...filter,
      name: value,
    }));
  };

  const setGenderFilter = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setFilter((filter) => ({
      ...filter,
      gender: value,
    }));
  };

  return (
    <Box className={className}>
      <form onSubmit={handleSearch} onReset={handleReset}>
        <Box
          width={mediaQuery ? "100%" : "600px"}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          marginBottom="50px"
        >
          <TextField
            style={{
              flexBasis: mediaQuery ? "100%" : "auto",
              marginBottom: "5px",
            }}
            placeholder="Search by name..."
            name="name"
            value={filter.name}
            onChange={setNameFilter}
          />
          <Box
            style={{
              flexBasis: mediaQuery ? "100%" : "25%",
              marginBottom: "5px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={filter.gender}
                label="gender"
                name="gender"
                onChange={setGenderFilter}
              >
                <MenuItem disabled value="">
                  Gender
                </MenuItem>
                {genderOptions}
              </Select>
            </FormControl>
          </Box>
          <Button type="submit" variant="contained">
            Search
          </Button>
          <Button type="reset" variant="contained">
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};
