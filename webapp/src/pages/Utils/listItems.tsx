import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NetworkPingIcon from '@mui/icons-material/NetworkPing';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton href="/home">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton href="/play">
            <ListItemIcon>
                <NetworkPingIcon />
            </ListItemIcon>
            <ListItemText primary="Play" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
        </ListSubheader>
        <ListItemButton href="/messagerie">
            <ListItemIcon>
                <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Messaging" id='messagerie-menu' />
        </ListItemButton>
        <ListItemButton href="/chat">
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Chat" />
        </ListItemButton>
        <ListItemButton  href="/friends">
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Friends" />
        </ListItemButton>
        <ListItemButton href="/user">
            <ListItemIcon>
                <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="User" />
        </ListItemButton>
    </React.Fragment>
);