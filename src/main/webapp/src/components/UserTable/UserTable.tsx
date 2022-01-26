import React from "react";
import {
  createStyles,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Typography,
  IconButton,
  Chip,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { User } from "../../data/models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      padding: "8px",
      marginTop: "1em",
    },
    table: {},
  })
);

interface UserTableProps {
  users: Array<User>;
  delete: (userId: string) => void;
  edit: (userId: string) => void;
  roleOverflowLimit?: number;
}

const UserTable: React.FC<UserTableProps> = (props: UserTableProps) => {
  const classes = useStyles();
  const { users } = props;
  const roleOverflowLimit = props.roleOverflowLimit ?? 10;

  interface HeadCell {
    id: String;
    label: string;
  }

  const headerCells: HeadCell[] = [
    { id: "user", label: "User" },
    { id: "account", label: "Account" },
    { id: "database", label: "Database" },
    { id: "roles", label: "Roles" },
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
      <Typography variant="h6" id="tableTitle" component="div">
        Users
      </Typography>
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        aria-label="user table"
      >
        <TableHeader />
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.userId}</TableCell>
              <TableCell></TableCell>
              <TableCell>
                {user.roles &&
                  user.roles
                    .sort()
                    .slice(0, roleOverflowLimit)
                    .map((r, i) => <Chip key={i} label={r} />)}
                {user.roles && user.roles.length > roleOverflowLimit && (
                  <Chip
                    label={
                      "+" + (user.roles.length - roleOverflowLimit) + "..."
                    }
                  />
                )}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="edit"
                  onClick={() => props.edit(user.userId)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => props.delete(user.userId)}
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

export default UserTable;
