import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import RoleTable from "../../components/RoleTable/RoleTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Role } from "../../data/models";
import { getAllRoles } from "../../data/roleAPI";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    rolesContainer: {},
  })
);

const Roles: React.FC = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(true);
  const [roles, setRoles] = React.useState<Array<Role>>([]);
  const [editPopoverOpen, setEditPopoverOpen] = React.useState(false);
  const [currentRole, setCurrentRole] = React.useState<Role>();

  useEffect(() => {
    const fetchAllRoles = async () => {
      const roles = await getAllRoles();
      setRoles(roles);
      setIsLoading(false);
    };

    fetchAllRoles();
  }, []);

  const editRole = (roleId: string) => {
    setEditPopoverOpen(true);
    setCurrentRole(roles.find((r) => r.roleId === roleId));
  };

  const confirmDeleteRole = (roleId: string) => {};

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
        </div>
      )}
    </div>
  );
};

export default Roles;
