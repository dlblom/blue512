import React from 'react';
import {
  createMuiTheme,
  withStyles,
  makeStyles
} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircle from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { Grow, Fab, Snackbar, SnackbarContent } from '@material-ui/core/';
import moment from 'moment';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}));


export default function CardMaker({
  event,
  animationTime,
  handleCardActionClick,
  isSignedIn,
  path,
  handlePageClick,
  handleMicroCardClick,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const imageFallbacks = [
    'https://img.freepik.com/free-photo/smooth-dark-blue-with-black-vignette-studio-well-use-as-background-business-report-digital-website-template_1258-748.jpg?size=626&ext=jpg',
    'https://wallpapercave.com/wp/AdQaK85.jpg',
    'https://img.freepik.com/free-vector/white-textured-paper_53876-86282.jpg?size=626&ext=jpg',
    'https://i.pinimg.com/originals/d3/32/28/d33228dd741723a0c66b221e36f2aaaf.jpg',
    'https://images.clipartlogo.com/files/istock/previews/1012/101248891-dark-green-abstract-background.jpg',
    'https://cdn.pixabay.com/photo/2015/03/26/09/48/landscape-690345_960_720.jpg'
  ];

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function renderSnackBar() {
    setOpen(true);
  }

  function clickToDetail() {
    handlePageClick("/detailed");
    handleMicroCardClick(event);
  }

  function closeSnackBar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  const noEventFound = () => {
    return (
      <Grow in={true} timeout={animationTime}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={
              'https://cdn4.wpbeginner.com/wp-content/uploads/2016/01/best404pluginswp.jpg'
            }
          />

          {/* Adding minimum height to CardContent allows all cards to be the same size
        Even on cards where event titles wrap to the next line */}
          <CardContent style={{ minHeight: 140 }}>
            <Typography variant="h6">Sorry! No events found</Typography>
            <Typography variant="body2" color="textSecondary">
              Try modifying your category interests and/or editing your
              unavailable times from the Settings page
            </Typography>
          </CardContent>
        </Card>
      </Grow>
    );
  };

  if (!event) {
    return noEventFound();
  }

  return (
    <Grow in={true} timeout={animationTime}>
      <Card className={classes.card}>
        {/* <CardHeader
        // Stuff above the image would go here
        /> */}
        <CardMedia
          className={classes.media}
          image={
            event.img ||
            imageFallbacks[Math.floor(Math.random() * imageFallbacks.length)]
          }
        />

        {/* Adding minimum height to CardContent allows all cards to be the same size
        Even on cards where event titles wrap to the next line */}
        <CardContent style={{ minHeight: 140 }}>
          <Typography variant="h6">

            <Link color="textPrimary" onClick={clickToDetail} to="/detailed" component={RouterLink} >
              {event.name}
            </Link>

          </Typography>
          <Typography variant="body2" color="textSecondary">
            {moment(event.time_start).format('ddd, MMM DD, h:mm a')}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {event.venue}, {event.location}
          </Typography>
        </CardContent>

        <CardActions>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              handleCardActionClick(event, true);
              renderSnackBar();
            }}
          >
            <CalendarIcon />
          </Fab>

          {/* This themeprovider overrides the default theme colors at this component level
          Using it to get the red color without using that color at the global level */}

          <Fab
            color="secondary"
            aria-label="add"
            onClick={() => {
              handleCardActionClick(event, false);
            }}
          >
            <CloseIcon />
          </Fab>


          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        {/* Collapse Section */}

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{event.description}</Typography>
          </CardContent>
        </Collapse>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={open}
          autoHideDuration={4000}
          onClose={closeSnackBar}
          color="primary"
        >
          {isSignedIn ?
            <SnackbarContent
              onClose={closeSnackBar}
              variant="success"
              message="Event successfully added to your Google calendar!"
            /> :
            <SnackbarContent
              onClose={closeSnackBar}
              variant="success"
              message="Please sign in to add events to your Google calendar"
            />
          }
        </Snackbar>
      </Card>
    </Grow>
  );
}
