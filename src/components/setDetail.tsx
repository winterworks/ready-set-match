import React from 'react';
import { TextField } from "@mui/material";
import { Set } from 'src/types';

interface Props {
  set: Set;

  onSetChanged: (set: Set) => void;
}

export default function SetDetails({ set, onSetChanged }: Props) {
  const { id, a, b, practiced, mistakes } = set;

  return (
    <div>
      <TextField id={`a-${id}`} variant="standard" value={a}
        onChange={(e) => onSetChanged({ ...set, a: e.target.value })}
      />
      <TextField id={`b-${id}`} variant="standard" value={b}
        onChange={(e) => onSetChanged({ ...set, b: e.target.value })}
      />
      <TextField
        id={`practiced-${id}`}
        type="number"
        disabled
        className='number-field'
        variant="standard"
        value={practiced}
      />
      <TextField
        id={`mistakes-${id}`}
        type="number"
        disabled
        className='number-field'
        variant="standard"
        value={mistakes}
      />
    </div>
  );

}