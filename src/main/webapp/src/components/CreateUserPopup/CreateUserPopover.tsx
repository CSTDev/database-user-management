import { makeStyles, Typography } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import React, { FormEvent, useEffect, useState } from "react";
import { User, Role } from "../../data/models";

interface CreateUserPopoverProps {
  open: boolean;
  handleClose: (isNew: boolean, user?: User) => void;
  user?: User;
  roles: Array<Role>;
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
}));

const CreateUserPopover: React.FC<CreateUserPopoverProps> = (
  props: CreateUserPopoverProps
) => {
  const classes = useStyles();
  const [errors, setErrors] = useState<FormErrors>();
  const [user, setUser] = useState<User>({} as User);
  const [newUser, setNewUser] = useState(true);

  interface FormErrors {
    userId?: string;
    username?: string;
    database?: string;
    roles?: boolean;
  }

  useEffect(() => {
    setUser(props.user ? Object.assign({}, props.user) : ({} as User));
    setNewUser(props.user ? false : true);
  }, [props]);

  const getRolesForUser = (): Array<Role> => {
    if (!user.roles) {
      return [];
    }
    const roles: Array<Role> = [];
    user.roles.forEach((ur) => {
      const role: Role | undefined = props.roles.find((r) => r.roleName === ur);
      if (role) {
        roles.push(role);
      }
    });
    return roles;
  };

  const RoleEntry = () => {
    return (
      <div>
        <Autocomplete
          multiple
          value={getRolesForUser()}
          id="role-input"
          aria-label="user-role"
          options={props.roles ?? []}
          getOptionLabel={(option) => option.roleName}
          onChange={(e, newValue) => {
            if (newValue !== null) {
              setUser({ ...user, roles: newValue.map((r) => r.roleName) });
            }
          }}
          renderInput={(params) => (
            <TextField {...params} label="Role" error={errors?.roles} />
          )}
          ChipProps={{
            deleteIcon: <CancelIcon aria-label={"delete role"} />,
          }}
        />
      </div>
    );
  };

  const isUserEmpty = (user: User) => {
    return !user.userId && !user.username;
  };

  const handleClose = (shouldSubmit: boolean) => {
    setErrors({});
    if (shouldSubmit && !isUserEmpty(user)) {
      props.handleClose(newUser, user);
    } else {
      props.handleClose(false);
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = true;
    if (!ok) {
      const newErrors = {
        ...errors,
        userId: "User Account is required",
        username: "Username is required",
      };
      setErrors(newErrors);
    } else {
      handleClose(true);
    }
  };

  return (
    <Popover
      open={props.open}
      anchorReference={"none"}
      onClose={() => handleClose(false)}
      className={classes.root}
    >
      <Box m={1}>
        <Typography variant="h6">
          {newUser ? "Create User" : "Edit User"}
        </Typography>
      </Box>
      <form autoComplete="off" className={classes.formRoot} onSubmit={submit}>
        <Box m={1}>
          <TextField
            id="userId"
            label="User Account"
            helperText={"Account Name in the format L123456"}
            error={errors?.userId ? true : false}
            onChange={(e) => {
              setErrors({ ...errors, userId: undefined });
              setUser({ ...user, userId: e.target.value });
            }}
            value={user.userId ?? ""}
            disabled={!newUser}
          />
        </Box>
        <Box m={1}>
          <TextField
            id="username"
            label="Username"
            error={errors?.username ? true : false}
            onChange={(e) => {
              setErrors({ ...errors, username: undefined });
              setUser({ ...user, username: e.target.value });
            }}
            helperText="User's name"
            value={user.username ?? ""}
          />
        </Box>
        <Box m={1}>
          <TextField
            id="database"
            label="Database"
            error={errors?.database ? true : false}
            onChange={() => setErrors({ ...errors, database: undefined })}
            helperText="Database to create the user in"
            value={"mongo"}
            disabled
          />
        </Box>
        <Box m={1}>
          <RoleEntry />
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

export default CreateUserPopover;
