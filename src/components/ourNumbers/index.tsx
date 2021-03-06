import React from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { translations } from '../../translations';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const useStyles = makeStyles((theme) => ({
  sessionTitle: {
    textAlign: 'center',
    marginTop: '40px',
    marginBottom: '40px',
    color: theme.palette.themeGrey.dark,
  },
  title: {
    marginBottom: '10px',
  },
  ourNumbersSession: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  ourNumberNumbers: {
    color: theme.palette.primary.main,
    marginTop: '10px',
  },
  ourNumbersCard: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '20px',
    },
  },
}));

const OurNumbers: React.FC = () => {
  const classes = useStyles();

  const {
    en: { ourNumbers },
  } = translations;

  return (
    <>
      <Box className={classes.sessionTitle}>
        <Typography variant='h4' className={classes.title}>
          {ourNumbers.title}
        </Typography>
      </Box>
      <Grid
        container
        item
        xs={12}
        spacing={2}
        className={classes.ourNumbersSession}
      >
        {ourNumbers.numbers.map((number, index) => (
          <Grid
            item
            md={3}
            xs={10}
            key={`cardKey-${index}`}
            className={classes.ourNumbersCard}
          >
            <Box>
              <img
                src={require(`../../assets/icons/${number.icon}`)}
                alt={number.title}
                width={100}
                height={100}
              />
            </Box>
            <Box>
              <Typography variant='h5'>{number.title}</Typography>
              <Typography variant='h6' className={classes.ourNumberNumbers}>
                <CountUp
                  start={0}
                  end={number.number}
                  duration={2.75}
                  redraw={true}
                >
                  {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                      <span ref={countUpRef}>
                        {number.title !== 'Techs' && '+'}
                      </span>
                    </VisibilitySensor>
                  )}
                </CountUp>
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default OurNumbers;
