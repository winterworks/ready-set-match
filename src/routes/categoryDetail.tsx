import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import Icon from "src/components/icon";
import { stateAtom } from "src/data/state";
import { Set } from "src/types";

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const [state] = useAtom(stateAtom);

  const selectedCategory = state.categories[categoryId || ''];
  if (!selectedCategory) {
    return <>This category does not exit</>
  }

  const { name, icon, link, sets } = selectedCategory;

  function renderSet({ a, b, practiced }: Set){
    return (
      <div>
        <TextField id="a" label="" variant="standard" value={a} />
        <TextField id="b" label="" variant="standard" value={b} />
        <TextField
          id="standard-number"
          label=""
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={practiced}
        />
      </div>
    )
  }

  return (
    <>
      <Typography component="h2" variant="h4" gutterBottom>
        {selectedCategory.name}
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="name" label="Name" variant="standard" value={name} />
        <TextField
          id="icon"
          label="Icon"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {icon && (<Icon iconName={icon}/>)}
              </InputAdornment>
            ),
          }}
          variant="standard"
          value={icon}
        />
        <TextField id="link" label="Link" variant="standard" value={link} />
        <Typography component="h3" variant="h5" gutterBottom>
          Sets
        </Typography>
        {sets.map(renderSet)}
      </Box>
    </>
  );
}