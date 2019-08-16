import React from 'react';
import { ListItem, ListItemText, Slider, Divider } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    marginLeft: 40,
    justifyItems: 'center'
  },
  margin: {
    height: theme.spacing(3)
  }
}));

const valueLabelFormat = value =>
  marks.findIndex(mark => mark.value === value) + 1;

const marks = [
  {
    value: 0,
    label: 'Not Interested'
  },
  {
    value: 50,
    label: 'No Preference'
  },
  {
    value: 100,
    label: 'Interested'
  }
];

export default function PreferencesContainer({
  cat,
  userPreference,
  userToken,
  handleChange
}) {
  const classes = useStyles();
  // if the user has a preference for the category, userPreference will be an object that references the category ID and their preference
  const defaultuserPreferenceSliderValue = !userPreference
    ? 50
    : userPreference.preferred
    ? 100
    : 0;
  return (
    <>
      <ListItem
        style={{ marginTop: 10, marginBottom: 15, textAlign: 'center' }}
      >
        <ListItemText
          primary={cat}
          secondary={
            <div className={classes.root}>
              <Slider
                valueLabelFormat={valueLabelFormat}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
                defaultValue={defaultuserPreferenceSliderValue}
                value={defaultuserPreferenceSliderValue}
                onChangeCommitted={(event, value) => {
                  const category = cat;
                  const id = userPreference ? userPreference['id'] : null;
                  const token = userToken;
                  const preferred =
                    value === 100 ? true : value === 0 ? false : null;
                  handleChange({ category, id, token, preferred });
                }}
              />
            </div>
          }
        />
      </ListItem>
      <Divider />
    </>
  );
}