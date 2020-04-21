import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { block } from 'bem-cn';

import './style.css';

const blockName = block('item');

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition(props) {
  const classes = useStyles();
  const {activeFilter, onChange} = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <MenuList>
          <MenuItem
            className={activeFilter === 0 ? blockName('enabled').toString() : blockName('disabled').toString()}
            onClick={e => onChange( activeFilter === 0 ? 0 : activeFilter === 1 ? 0 : 1 )}
          >Temperature</MenuItem>
          <MenuItem onClick={e =>  onChange( activeFilter === 0 ? 1 : activeFilter === 1 ? 1 : 0 )} className={activeFilter === 1 ? blockName('enabled').toString() : blockName('disabled').toString()}>Precipitation</MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}
