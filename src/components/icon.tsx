import { Checklist, Science, Translate, CellTower } from '@mui/icons-material';
import { SvgIconOwnProps } from '@mui/material';

interface Props extends SvgIconOwnProps {
  iconName: string;
}

export default function Icon({ iconName, ...props }: Props) {
  let Icon = Checklist;

  switch (iconName) {
    case "Science":
      Icon = Science;
      break;
    case "Translate":
      Icon = Translate;
      break;
    case "CellTower":
      Icon = CellTower;
      break;
    default:
      break;
  }

  return <Icon {...props} />;
}
