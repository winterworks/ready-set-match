import React from 'react';
import { Button } from "@mui/material";

interface MatcherItemProps {
  id: string;
  text: string;

  isCorrect?: boolean;
  isSelected?: boolean;
  isLarge?: boolean;
  selectedLeft?: string;
  selectedRight?: string;

  onClick: (id: string) => void;
}

export function MatcherItem({ id, text, isSelected, isCorrect, selectedLeft, selectedRight, isLarge, onClick}: MatcherItemProps) {
  const isWrong = isSelected
    && selectedLeft !== undefined
    && selectedRight !== undefined
    && selectedLeft !== selectedRight;

  const variant = isSelected || isCorrect ? 'contained' : 'outlined';
  const color = (isCorrect ? "success" : undefined) ?? (isWrong ? "error" : undefined);

  return (
    <Button
      size="large"
      onClick={!isCorrect ? () => { onClick(id); } : undefined}
      variant={variant}
      color={color}
      fullWidth
      sx={{ ml:6, textTransform: 'none', marginLeft: 0 }}
    >
      {isLarge
        ? <span style={{ fontSize: 35, lineHeight: 1 }}>{text}</span>
        : text
      }
    </Button>
  );
}