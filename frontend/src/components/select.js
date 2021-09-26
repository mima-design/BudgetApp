import { MenuItem } from "@material-ui/core";
import { Select } from "@mui/material";

export default function MySelect({options, onChange, value, label}) {
  return (
    <Select
      value={value}
      onChange={onChange}
      label={label}
    >
      { options.map((item, idx) => (
        <MenuItem value={item.value} key={idx}>{item.label}</MenuItem>
      ))}
    </Select>
  )
}