import React, { useEffect, FormEvent } from "react";
import { Privilege, Role } from "../../data/models";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RolePrivilegeTable from "../RolePrivilegeTable/RolePrivilegeTable";
import Slide from "@material-ui/core/Slide";

interface CreateRolePopoverProps {
  open: boolean;
  handleClose: () => void;
  submit: (role: Role) => void;
  role: Role;
  isNew: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formRoot: {
    display: "flex",
    flexDirection: "column",
    padding: "2em",
  },
  privilegeContainer: {
    display: "flex",
    flexDirection: "column",
    height: "300px",
  },
  roleName: {
    display: "flex",
    flexGrow: 1,
  },
  roleDescription: {
    display: "flex",
    flexGrow: 1,
  },
}));

const CreateRolePopover: React.FC<CreateRolePopoverProps> = (
  props: CreateRolePopoverProps
) => {
  const classes = useStyles();
  const [role, setRole] = React.useState<Role>(props.role);

  useEffect(() => {
    const { role } = props;
    console.log("popover role", role);
    setRole(Object.assign({}, role));
  }, [props]);

  const handleClose = (shouldSubmit: boolean) => {
    if (shouldSubmit) {
      props.submit(role);
    } else {
      props.handleClose();
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClose(true);
  };

  const updatePrivileges = (privileges: Array<Privilege>) => {
    setRole({ ...role, privileges: privileges });
  };

  return (
    <Popover
      open={props.open}
      anchorReference={"none"}
      onClose={() => handleClose(false)}
      className={classes.root}
      PaperProps={{
        style: { width: "50%" },
      }}
      TransitionComponent={Slide}
    >
      <Box m={1}>
        <Typography variant="h6">
          {props.isNew ? "Create Role" : "Edit Role"}
        </Typography>
      </Box>
      <form autoComplete="off" className={classes.formRoot} onSubmit={submit}>
        <Box m={1}>
          <TextField
            id="rolename"
            label="Role Name"
            onChange={(e) => {
              setRole({ ...role, roleName: e.target.value });
            }}
            helperText="Name for the role"
            value={role.roleName ?? ""}
            className={classes.roleName}
          />
        </Box>
        <Box m={1}>
          <TextField
            id="roledescription"
            label="Description"
            multiline
            onChange={(e) => {
              setRole({ ...role, description: e.target.value });
            }}
            helperText="Description of the role"
            value={role.description ?? ""}
            className={classes.roleDescription}
          />
        </Box>
        <Box m={1} className={classes.privilegeContainer}>
          <Typography variant="subtitle1">Privileges</Typography>
          <RolePrivilegeTable
            privileges={role.privileges ?? []}
            updatePrivileges={updatePrivileges}
          />
        </Box>
        <Box m={2}>
          <Button variant="contained" type="submit" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Popover>
  );
};

export default CreateRolePopover;
