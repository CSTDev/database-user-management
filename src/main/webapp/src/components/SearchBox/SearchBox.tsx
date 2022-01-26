import {
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";
import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

interface SearchBoxProps {
  filter: (term: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      marginTop: "1em",
    },
    table: {},
  })
);

const SearchBox: React.FC<SearchBoxProps> = (props: SearchBoxProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormControl variant="outlined">
        <InputLabel htmlFor="filter">Search</InputLabel>
        <OutlinedInput
          id="filter"
          aria-label="filter"
          endAdornment={
            <InputAdornment position="end" aria-label="search icon">
              <SearchIcon />
            </InputAdornment>
          }
          onChange={(e) => props.filter(e.target.value)}
        />
      </FormControl>
    </div>
  );
};

export default SearchBox;
