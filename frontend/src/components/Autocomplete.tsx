import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import MUIAutocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
interface Option {
  id: number;
  name: string;
}
interface Props {
  options: Option[];
  defaultValue?: Option[];
  label: string;
  placeholder: string;
  onChange: (options: Option[]) => void;
}

const Autocomplete = ({
  options,
  defaultValue,
  label,
  placeholder,
  onChange,
}: Props) => {
  return (
    <MUIAutocomplete
      multiple
      defaultValue={defaultValue}
      options={options}
      disableCloseOnSelect
      onChange={(evt, values) => onChange(values)}
      isOptionEqualToValue={(option, value) => option.id == value.id}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 5 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
};

export default Autocomplete;
