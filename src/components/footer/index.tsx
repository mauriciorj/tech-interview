import React from 'react';
import {
  Grid,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { translations } from '../../translations';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  sessionWrap: {
    flexGrow: 1,
    marginTop: '30px',
    marginBottom: '30px',
    justifyContent: 'center',
  },
  footerTitle: {
    color: theme.palette.white.main,
  },
  footerTechList: {
    color: theme.palette.white.main,
  },
  links: {
    textDecoration: 'none',
    color: theme.palette.white.main,
  }
}));

const Footer: React.FC = () => {
  const classes = useStyles();

  const {
    en: { logo, contactEmail, techList, footer },
  } = translations;

  return (
    <>
      <Grid container item xs={12} spacing={2} className={classes.sessionWrap}>
        <Grid item md={3} xs={10}>
          <Link to='/' className={classes.links}>
            <Typography variant='h5' className={classes.footerTitle}>
              {logo}
            </Typography>
          </Link>
        </Grid>
        <Grid item md={3} xs={10} className={classes.footerTechList}>
          <Typography variant='h6'>{footer.techList}</Typography>
          <List dense>
            {techList.map((item, index) => (
              <ListItem key={`tech-item-${index}`}>
                <Link to={item.link} className={classes.links}>
                  <Typography variant='h5' className={classes.footerTitle}>
                    <ListItemText primary={item.title} />
                  </Typography>
                </Link>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item md={3} xs={10}>
          <Typography variant='subtitle1' className={classes.footerTechList}>
            <strong>{footer.contactUs}</strong>{' '}
            <Link to={'mailto:' + contactEmail} className={classes.links}>{contactEmail}</Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
