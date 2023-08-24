import * as React from 'react';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { allCountries } from '../../../Data/countries';
import TextField from './TextField';
import PropTypes from 'prop-types';

const CountrySelect =(props) => {
      const {
    autoComplete,
    input,
    InputProps,
    meta: { touched, error, submitError },
    ...other
  } = props;
  
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={allCountries}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.abbr.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.abbr.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.name} ({option.abbr}) +{option.code}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
         error={Boolean(!!touched && (error || submitError))}
          {...input}
      {...other}
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
              helperText={touched ? error || submitError : ''}
      variant="standard"
        />
      )}
      onChange={(event, value) => input.onChange(value ? value.name : '')}
    />
  );
}
CountrySelect.propTypes = {
  autoComplete: PropTypes.string,
  input: PropTypes.shape({
    checked: PropTypes.bool,
    multiple: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
  }).isRequired,
  InputProps: PropTypes.object,
  meta: PropTypes.shape({
    active: PropTypes.bool,
    data: PropTypes.object,
    dirty: PropTypes.bool,
    dirtySinceLastSubmit: PropTypes.bool,
    error: PropTypes.any,
    initial: PropTypes.string,
    invalid: PropTypes.bool,
    length: PropTypes.number,
    modified: PropTypes.bool,
    modifiedSinceLastSubmit: PropTypes.bool,
    pristine: PropTypes.bool,
    submitError: PropTypes.any,
    submitFailed: PropTypes.bool,
    submitSucceeded: PropTypes.bool,
    submitting: PropTypes.bool,
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    validating: PropTypes.bool,
    visited: PropTypes.bool,
  }).isRequired,
};

export default CountrySelect