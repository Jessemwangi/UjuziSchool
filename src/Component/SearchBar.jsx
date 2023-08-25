import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, IconButton, TextField } from '@mui/material';

const SearchBar = ({setSearchQuery}) => {
    return (
        <Grid container xs={12} spacing={1} alignItems="flex-end" >
        <Grid xs={11}  item>
          <TextField
          sx={{width:"100%",
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#BA68C8',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#BA68C8',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#BA68C8',
    },
  }}
         
            id="search-bar"
            label="Search"
            variant="outlined"
            size="large"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
        <Grid item>
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
};

export default SearchBar;