import {
  Button,
  FormControlLabel,
  FormControlLabelProps,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  useRadioGroup,
} from "@mui/material";
import { ChangeEvent, MouseEvent, FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import type { FilterParams } from "types/filterParams";
import { styled } from "@mui/material/styles";

interface StyledLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledLabel = styled((props: StyledLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));

const CustomLabel = (props: FormControlLabelProps) => {
  const radioGroup = useRadioGroup();
  const [searchParams, setSearchParams] = useSearchParams();
  const initGender = searchParams.get("gender");

  const checked = initGender
    ? initGender === props.value
    : radioGroup?.value === props.value;

  return (
    <StyledLabel
      onClick={({ target: { value } }: any) => {
        setSearchParams({ gender: value });
      }}
      checked={checked}
      {...props}
    />
  );
};

const RadioButtons = () => {
  return (
    <RadioGroup name="gender" row>
      <CustomLabel value="" control={<Radio />} label="All" />
      <CustomLabel value="female" control={<Radio />} label="Female" />
      <CustomLabel value="male" control={<Radio />} label="Male" />
      <CustomLabel value="genderless" control={<Radio />} label="Genderless" />
      <CustomLabel value="unknown" control={<Radio />} label="Unknown" />
    </RadioGroup>
  );
};

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initName = searchParams.get("name");

  const handleSearch = (event: any) => {
    event.preventDefault();
    const searchParams: FilterParams = {};
    const formValue = event.target;
    const name = formValue.name.value;
    const gender = formValue.gender.value;

    if (name) {
      searchParams.name = name;
    }
    if (gender) {
      searchParams.gender = gender;
    }

    setSearchParams(searchParams);
  };

  return (
    <form onSubmit={handleSearch} style={{ marginBottom: "50px" }}>
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        <Grid item>
          <TextField
            placeholder="Search by name..."
            name="name"
            value={initName}
            onChange={({ target: { value } }) =>
              setSearchParams({ name: value })
            }
          />
        </Grid>
        <Grid item>
          <RadioButtons />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
