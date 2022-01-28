import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Role } from "../../data/models";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    table: {},
  })
);

interface RoleTableProps {
  roles: Array<Role>;
  delete: (userId: string) => void;
  edit: (userId: string) => void;
}

const RoleTable: React.FC<RoleTableProps> = (props: RoleTableProps) => {
  const classes = useStyles();
  const { roles } = props;

  interface HeadCell {
    id: String;
    label: string;
  }

  const headerCells: HeadCell[] = [
    { id: "roleName", label: "Role" },
    { id: "database", label: "Database" },
    { id: "description", label: "Description" },
  ];

  const TableHeader = () => (
    <TableHead>
      <TableRow>
        {headerCells.map((cell, i) => (
          <TableCell key={i}>{cell.label}</TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );

  return (
    <Paper className={classes.root}>
      <Typography variant="h6" id="tableTitle" aria-label="Role table title">
        Roles
      </Typography>
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        aria-label="role table"
      >
        <TableHeader />
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.roleId}>
              <TableCell>{role.shortName}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="edit"
                  onClick={() => props.edit(role.roleId)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => props.delete(role.roleId)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default RoleTable;
