import React, { useEffect } from "react";
import { Privilege } from "../../data/models";
import {
  DataGrid,
  GridApi,
  GridColDef,
  GridEditRowsModel,
  GridRowId,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CancelIcon from "@material-ui/icons/Cancel";
import TextField from "@material-ui/core/TextField";
import { getAvailableActions } from "../../data/roleAPI";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

interface RolePrivilegeTableProps {
  privileges: Array<Privilege>;
  updatePrivileges: (privileges: Array<Privilege>) => void;
}

const RolePrivilegeTable: React.FC<RolePrivilegeTableProps> = (
  props: RolePrivilegeTableProps
) => {
  const [availableActions, setAvailableActions] = React.useState<Array<String>>(
    []
  );
  const [privileges, setPrivileges] = React.useState<Array<Privilege>>([]);
  const [editRowsModel, setEditRowsModel] = React.useState<GridEditRowsModel>(
    {}
  );

  useEffect(() => {
    setPrivileges(props.privileges);
  }, [props]);

  useEffect(() => {
    setAvailableActions(getAvailableActions());
  }, []);

  const addAction = (rowId: number, actions: Array<String>) => {
    const rowsModel = editRowsModel;
    rowsModel[rowId] = { ...rowsModel[rowId], actions: { value: actions } };
    setEditRowsModel(rowsModel);
  };

  const ActionAutoComplete = (props: {
    actions: Array<string>;
    rowId: number;
    api: any;
  }) => {
    const { api, rowId, actions } = props;
    return (
      <Autocomplete
        multiple
        id="role-actions"
        aria-label="role-actions"
        options={availableActions}
        ChipProps={{
          deleteIcon: <CancelIcon aria-label={"delete role"} />,
        }}
        defaultValue={actions ?? []}
        renderInput={(params) => <TextField {...params} />}
        onChange={(e, newValue) => addAction(props.rowId, newValue)}
        onBlur={() => {
          api.commitRowChange(rowId);
        }}
      />
    );
  };

  interface RowMenuProps {
    api: GridApi;
    id: GridRowId;
  }

  const RowMenuCell = (rowProps: RowMenuProps) => {
    const { api, id } = rowProps;
    const handleDeleteClick = (event: any) => {
      event.stopPropagation();
      api.updateRows([{ id, _action: "delete" }]);
      props.updatePrivileges(privileges.filter((p) => p.id !== id));
    };

    return (
      <IconButton
        color="inherit"
        size="small"
        aria-label="delete"
        onClick={handleDeleteClick}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    );
  };

  const columns: GridColDef[] = [
    { field: "database", headerName: "Database", width: 150, editable: true },
    {
      field: "collection",
      headerName: "Collection",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      editable: true,
      renderEditCell: (cellValues) => (
        <ActionAutoComplete
          actions={cellValues.row.actions}
          rowId={cellValues.row.id}
          api={cellValues.api}
        />
      ),
    },
    {
      field: "userActions",
      headerName: " ",
      renderCell: RowMenuCell,
      sortable: false,
      width: 100,
      filterable: false,
      disableColumnMenu: true,
      disableReorder: true,
    },
  ];

  const handleAddClick = () => {
    const p = Object.assign([], privileges);
    p.push({ id: p.length, database: "", collection: "", actions: [] });
    setPrivileges(p);
  };

  const EditToolbar = () => {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add privilege
        </Button>
      </GridToolbarContainer>
    );
  };

  const handleRowCommit = (id: number | string, event: any) => {
    const i: number = +id;
    const p: Array<Privilege> = Object.assign([], privileges);
    const newRow = editRowsModel[i];
    const actions: Array<string> =
      (newRow.actions.value as Array<string>) ?? [];
    const priv: Privilege = {
      id: i,
      database: newRow.database.value + "",
      collection: newRow.collection.value + "",
      actions: actions,
    };
    p[i] = priv;
    setPrivileges(p);
    props.updatePrivileges(p);
    setEditRowsModel({});
  };

  const handleEditRowsModelChange = React.useCallback(
    (model: GridEditRowsModel) => {
      setEditRowsModel(model);
    },
    []
  );

  return (
    <DataGrid
      editMode="row"
      columns={columns}
      rows={privileges}
      components={{
        Toolbar: EditToolbar,
      }}
      editRowsModel={editRowsModel}
      onEditRowsModelChange={handleEditRowsModelChange}
      onRowEditCommit={handleRowCommit}
    />
  );
};

export default RolePrivilegeTable;
