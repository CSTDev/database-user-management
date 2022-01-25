import React, { useEffect } from "react";
import {
  CircularProgress,
  createStyles,
  Fab,
  makeStyles,
  Theme,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import UserTable from "../../components/UserTable";
import { User, Role } from "../../data/models";
import { createUser, getAllUsers, updateUser } from "../../data/userAPI";
import CreateUserPopover from "../../components/CreateUserPopup/CreateUserPopover";
import { getAllRoles } from "../../data/roleAPI";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },
    addUser: {
      position: "fixed",
      bottom: "1em",
      right: "1em",
    },
  })
);

const Home: React.FC = () => {
  const classes = useStyles();
  const [users, setUsers] = React.useState<Array<User>>([]);
  const [roles, setRoles] = React.useState<Array<Role>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [userPopoverIsOpen, setUserPopoverOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<User>();

  const deleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.userId !== userId));
  };

  const editUser = (userId: string) => {
    setUserPopoverOpen(true);
    setCurrentUser(users.find((u) => u.userId === userId));
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await getAllUsers();
      setUsers(users);
      setIsLoading(false);
    };

    const fetchAllRoles = async () => {
      const roles = await getAllRoles();
      setRoles(roles);
    };

    fetchAllRoles();
    fetchAllUsers();
  }, []);

  const handleUserPopoverClose = (isNew: boolean, user?: User) => {
    setUserPopoverOpen(false);
    if (user) {
      if (isNew) {
        createUser(user);
      } else {
        updateUser(user);
      }
    }
    setCurrentUser(undefined);
  };

  return (
    <div className={classes.root}>
      <UserTable
        users={users}
        delete={(userId) => deleteUser(userId)}
        edit={(userId) => editUser(userId)}
      />
      {isLoading && <CircularProgress aria-label="loading" />}
      <Fab
        color="secondary"
        aria-label="createUser"
        className={classes.addUser}
        onClick={() => setUserPopoverOpen(true)}
      >
        <AddIcon />
      </Fab>
      {!isLoading && (
        <CreateUserPopover
          open={userPopoverIsOpen}
          user={currentUser}
          handleClose={handleUserPopoverClose}
          roles={roles}
        />
      )}
    </div>
  );
};

export default Home;
