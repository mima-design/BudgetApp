import { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import MySelect from "../../components/select";

export default function EntryList({categories, entryList, label, onAddHandler, type}) {
  const [entryValue, setEntryValue] = useState(0);
  const [entryCategory, setEntryCategory] = useState(categories[0].id);

  const onChangeValue = (e) => {
    setEntryValue(e.target.value);
  }

  const onCategoryChange = (e) => {
    setEntryCategory(e.target.value);
  }

  const onAddClick = () => {
    onAddHandler(entryValue, type, entryCategory);
  }

  return (
    <Grid item xs={6}>
      <b>{label}</b>
        {entryList.map((category) => {
          if (!category.values.length) 
            return null;
          return (
            <div key={`expanse_${category.name}`}>
              <div>
                {category.name}
              </div>
              <div style={{textAlign: "center"}}>
                {category.values.map((item) =>
                  (<div key={`entry_${item.id}`}>
                    {item.quantity}
                  </div>)
                )}
              </div>
            </div>
          );
        })}
      <div>
        <TextField 
          value={entryValue}
          onChange={onChangeValue}
          type="number"
          size="small"
        />
        <MySelect
          options={categories.map((item) => ({value: item.id, label: item.name}))}
          value={entryCategory}
          onChange={onCategoryChange}
        />
        <Button
          onClick={onAddClick}
        >
          <AddIcon />
        </Button>
      </div>
    </Grid>
  )
}