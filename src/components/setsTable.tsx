import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowEditStopReasons,
  GridSlots,
} from '@mui/x-data-grid';
import { Set } from 'src/types';
import { setsAtom, SetReducerAction } from 'src/data/setReducer';
import { useAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

const NEW_ITEM_ID = 'newItem';

const EditToolbar = (props: EditToolbarProps) => {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    setRows((oldRows) => [{ id: NEW_ITEM_ID, }, ...oldRows]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [NEW_ITEM_ID]: { mode: GridRowModes.Edit, fieldToFocus: 'a' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

interface TableProps {
  collectionId: string;
  sets: Set[];
}

export default function SetsTable({ collectionId, sets }: TableProps) {
  const [rows, setRows] = React.useState<Set[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [, setSet] = useAtom(setsAtom);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
    setSet({ action: SetReducerAction.DELETE_SET, collectionId, setId: id as string });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.id === NEW_ITEM_ID) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (set: Set) => {
    if (set.id === NEW_ITEM_ID) {
      const newSet = { ...set, id: uuidv4() }
      setSet({ action: SetReducerAction.CREATE_SET, collectionId, set: newSet });
      setRows([...rows.filter((row) => row.id !== NEW_ITEM_ID), ]);
    } else {
      setSet({ action: SetReducerAction.UPDATE_SET, collectionId, set });
    }
    return  { ...set };
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'a', headerName: 'Value A', width: 250, editable: true },
    { field: 'b', headerName: 'Value B', width: 250, editable: true },
    {
      field: 'practiced',
      headerName: 'Practiced',
      type: 'number',
      width: 100,
      align: 'right',
      headerAlign: 'right',
      editable: false,
    },
    {
      field: 'mistakes',
      headerName: 'Mistakes',
      type: 'number',
      width: 100,
      align: 'right',
      headerAlign: 'right',
      editable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        // It actually is necessary
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
            key={id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
          key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
          key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={[...rows, ...sets]}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar as GridSlots['toolbar'],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}