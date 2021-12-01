import { makeStyles } from '@mui/styles';


export const useStyles = makeStyles(() => ({
    container: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      minHeight: '100vh',
    },
    title:{
      color: 'white',
      padding: '30px 0',
    },
    avatar: {
      padding: '10px 0 0 10px',
    },
    textGreen: {
      color: 'green',
    },
    textRed: {
      color: 'red',
    }
  }));