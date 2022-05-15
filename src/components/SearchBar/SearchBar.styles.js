import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const SearchButton = styled(Button, {})`
  background-color: rgb(2, 186, 253);
  &:hover {
    background-color: rgba(2, 186, 253, 0.9);
  }
  &:disabled {
    background-color: rgba(2, 186, 253, 0.2);
  }
`;

export const SearchField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'rgb(2, 186, 253)',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'rgb(2, 186, 253)',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgb(2, 186, 253)',
    },
    '&:hover fieldset': {
      borderColor: 'rgb(2, 186, 253)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgb(2, 186, 253)',
    },
  },
});
