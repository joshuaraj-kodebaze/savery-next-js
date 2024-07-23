// Import libraries
import { useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons';

// Import components
import { CircularLoader } from './loader.styles';

const Loader = () => {
  const theme = useTheme();

  return (
    <CircularLoader>
      <FontAwesomeIcon
        icon={faSpinner}
        style={{ color: theme.palette.primary.main }}
      />
    </CircularLoader>
  );
};

export default Loader;
