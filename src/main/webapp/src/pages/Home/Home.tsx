import React, { useEffect } from "react";
import {
  Button,
  CircularProgress,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Fab,
  makeStyles,
  Theme,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import UserTable from "../../components/UserTable";
import { User, Role } from "../../data/models";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser as apiDeleteUser,
} from "../../data/userAPI";
import CreateUserPopover from "../../components/CreateUserPopup/CreateUserPopover";
import { getAllRoles } from "../../data/roleAPI";
import SearchBox from "../../components/SearchBox/SearchBox";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    addUser: {
      position: "fixed",
      bottom: "1em",
      right: "1em",
    },
    userContainer: {
      width: "70%",
      [theme.breakpoints.down("md")]: {
        width: "90%",
      },
    },
  })
);

const Home: React.FC = () => {
  const classes = useStyles();
  const [users, setUsers] = React.useState<Array<User>>([]);
  const [displayUsers, setDisplayUsers] = React.useState<Array<User>>([]);
  const [roles, setRoles] = React.useState<Array<Role>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [userPopoverIsOpen, setUserPopoverOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<User>();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await getAllUsers();
      setUsers(users);
      setDisplayUsers(users);
      setIsLoading(false);
    };

    const fetchAllRoles = async () => {
      const roles = await getAllRoles();
      setRoles(roles);
    };

    fetchAllRoles();
    fetchAllUsers();
  }, []);

  useEffect(() => {
    setDisplayUsers(users);
  }, [users]);

  const handleUserPopoverClose = (isNew: boolean, user?: User) => {
    setUserPopoverOpen(false);
    if (user) {
      if (isNew) {
        createUser(user);
      } else {
        updateUser(user);
        const index = users.findIndex((u) => u.userId === user.userId);
        users[index] = user;
        setUsers(users);
      }
    }
    setCurrentUser(undefined);
  };

  const searchFilter = (term: string) => {
    const filteredUsers = users.filter(
      (u) =>
        u.userId.toLocaleLowerCase().includes(term.toLocaleLowerCase()) ||
        u.username.toLocaleLowerCase().includes(term.toLocaleLowerCase()) ||
        u.roles.filter((r) =>
          r.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        ).length > 0
    );
    setDisplayUsers(filteredUsers);
  };

  const editUser = (userId: string) => {
    setUserPopoverOpen(true);
    setCurrentUser(users.find((u) => u.userId === userId));
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmOpen(false);
  };

  const deleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.userId !== userId));
    apiDeleteUser(userId);
    closeDeleteConfirmation();
  };

  const confirmDeleteUser = (userId: string) => {
    setCurrentUser(users.find((u) => u.userId === userId));
    setDeleteConfirmOpen(true);
  };

  const DeleteConfirmation = () => {
    return (
      <Dialog
        open={deleteConfirmOpen}
        onClose={closeDeleteConfirmation}
        aria-labelledby="delete-confirmation-title"
      >
        <DialogContent>
          <DialogContentText id="delete-confirmation-title">
            {`Are you sure you want to delete ${currentUser?.username}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeDeleteConfirmation}
            color="primary"
            aria-label="cancel delete"
          >
            Cancel
          </Button>
          <Button
            onClick={() =>
              currentUser
                ? deleteUser(currentUser?.userId)
                : closeDeleteConfirmation()
            }
            color="primary"
            aria-label="confirm delete"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // TODO:
  //   - add tests for the search filter
  //   - add validation tests to the create/edit user form
  //   - add CRUD tests for Roles page (and implement bits to make them work)

  return (
    <div className={classes.root}>
      <div className={classes.userContainer}>
        <SearchBox filter={searchFilter} />
        <UserTable
          users={displayUsers}
          delete={(userId) => confirmDeleteUser(userId)}
          edit={(userId) => editUser(userId)}
        />
        {isLoading && <CircularProgress aria-label="loading" />}
      </div>
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
      <DeleteConfirmation />
    </div>
  );
};

export default Home;
