import { Checklist, MoreHoriz, Science, Translate } from '@mui/icons-material';

interface Props {
  iconName: string;
}

export default function Icon({iconName}: Props) {
  let Icon = Checklist;

  switch (iconName) {
    case "Science":
      Icon = Science;
      break;
    case "Translate":
      Icon = Translate;
      break;
    case "MoreHoriz":
      Icon = MoreHoriz;
      break;
    default:
      break;
  }

  return <Icon />;
}
