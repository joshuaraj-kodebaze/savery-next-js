// Import libraries
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/pro-regular-svg-icons';

// Import components
import { Username, Role } from './user-card.styles';

type UserCardProps = {
  username: string;
  role: string;
  backgroundColor?: string;
};

const UserCard = (props: UserCardProps) => {
  const { username, role = '', backgroundColor = '#E9EEFF' } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        marginBottom: '8px',
      }}
    >
      <FontAwesomeIcon
        icon={faRobot}
        style={{
          fontSize: 12,
          backgroundColor: backgroundColor,
          padding: 10,
          borderRadius: '100px',
        }}
      />
      <Box>
        <Username>{username}</Username>
        <Role>{role}</Role>
      </Box>
    </Box>
  );
};

export default UserCard;
