import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import RoleTable from "../../components/RoleTable/RoleTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Role } from "../../data/models";
import {
  getAllRoles,
  deleteRole as apiDeleteRole,
  createRole,
  updateRole,
} from "../../data/roleAPI";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CreateRolePopover from "../../components/CreateRolePopover/CreateRolePopover";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    rolesContainer: {},
    addRole: {
      position: "fixed",
      bottom: "1em",
      right: "1em",
    },
  })
);

const Roles: React.FC = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(true);
  const [roles, setRoles] = React.useState<Array<Role>>([]);
  const [editPopoverOpen, setEditPopoverOpen] = React.useState(false);
  const [currentRole, setCurrentRole] = React.useState<Role>();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);

  useEffect(() => {
    const fetchAllRoles = async () => {
      const roles = await getAllRoles();
      setRoles(roles);
      setIsLoading(false);
    };

    fetchAllRoles();
  }, []);

  const editRole = (roleId: string) => {
    setCurrentRole(roles.find((r) => r.roleId === roleId));
    setEditPopoverOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmOpen(false);
  };

  const deleteRole = (roleId: string) => {
    setRoles(roles.filter((r) => r.roleId !== roleId));
    apiDeleteRole(roleId);
    closeDeleteConfirmation();
  };

  const confirmDeleteRole = (roleId: string) => {
    setCurrentRole(roles.find((r) => r.roleId === roleId));
    setDeleteConfirmOpen(true);
  };

  const submitRole = async (role: Role) => {
    setEditPopoverOpen(false);
    let r: Array<Role>;
    if (currentRole) {
      r = await updateRole(role);
    } else {
      r = await createRole(role);
    }
    setRoles(r);
    setCurrentRole(undefined);
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
            {`Are you sure you want to delete ${currentRole?.roleName}`}
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
              currentRole
                ? deleteRole(currentRole?.roleId)
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

  return (
    <div className={classes.root}>
      {isLoading ? (
        <CircularProgress aria-label="loading" />
      ) : (
        <div className={classes.rolesContainer}>
          <RoleTable
            roles={roles}
            edit={(roleId) => editRole(roleId)}
            delete={(roleId) => confirmDeleteRole(roleId)}
          />
          <DeleteConfirmation />
          {editPopoverOpen && (
            <CreateRolePopover
              open={editPopoverOpen}
              handleClose={() => setEditPopoverOpen(false)}
              submit={submitRole}
              role={currentRole ?? ({} as Role)}
              isNew={currentRole ? false : true}
            />
          )}
        </div>
      )}
      <Fab
        color="secondary"
        aria-label="createRole"
        className={classes.addRole}
        onClick={() => {
          setCurrentRole(undefined);
          setEditPopoverOpen(true);
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Roles;
