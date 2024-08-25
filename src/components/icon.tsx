import React from 'react'
import { Checklist, Science, Translate, CellTower, Flag } from '@mui/icons-material'
import { SvgIconOwnProps } from '@mui/material'

interface Props extends SvgIconOwnProps {
  iconName: string
}

export enum ENABLED_ICON {
  SCIENCE = 'Science',
  TRANSLATE = 'Translate',
  CELL_TOWER = 'CellTower',
  CHECKLIST = 'Checklist',
  FLAG = 'Flag',
}

export default function Icon({ iconName, ...props }: Props) {
  let Icon = Checklist

  switch (iconName as ENABLED_ICON) {
    case ENABLED_ICON.SCIENCE:
      Icon = Science
      break
    case ENABLED_ICON.TRANSLATE:
      Icon = Translate
      break
    case ENABLED_ICON.CELL_TOWER:
      Icon = CellTower
      break
    case ENABLED_ICON.FLAG:
      Icon = Flag
      break
    default:
      break
  }

  return <Icon {...props} />
}
