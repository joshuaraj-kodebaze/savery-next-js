// Import libraries
import {
  InputAdornment,
  type TextFieldProps,
  useTheme,
} from '@mui/material';
import {
  faSearch,
  faXmark,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import components
import { SearchFieldInput } from './search-field.styles';

type TSearchField = {
  onClose?: () => void;
} & Omit<TextFieldProps, 'InputProps'>;

const SearchField = (props: TSearchField) => {
  const theme = useTheme();
  const { value, onClose } = props;

  return (
    <SearchFieldInput
      id="search-textfield"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FontAwesomeIcon
              icon={faSearch}
              style={{
                fontSize: 12,
                color: theme.palette.text.secondary,
              }}
            />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <FontAwesomeIcon
              icon={faXmark}
              style={{
                fontSize: 12,
                color: theme.palette.text.secondary,
                cursor: 'pointer',
              }}
              onClick={onClose}
            />
          </InputAdornment>
        ) : (
          <></>
        ),
      }}
      autoComplete="off"
      {...props}
    />
  );
};

export default SearchField;
