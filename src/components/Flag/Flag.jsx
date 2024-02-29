

import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LabelIcon from '@mui/icons-material/Label';
import ListIcon from '@mui/icons-material/List';
import './Flag.scss'
import Flagi_json from '../../data/Flag.json'


export default function Flag() {
    const [value, setValue] = useState('1');
    const [filteredMessages, setFilteredMessages] = useState(Flagi_json);

    const handleNavigationChange = (event, newValue) => {
        setValue(newValue);
        filterMessages(newValue);
    };

    const filterMessages = (label) => {
        const filtered = Flagi_json.filter(message => message.label === label);
        setFilteredMessages(filtered);
    };

    useEffect(() => {
        filterMessages(value);
    }, []);

    return (
        <div>
            <div className="flag">
                <div className="flag__dash">
                    <Box className="flag__dash-box" sx={{ overflow: 'scroll' }}>
                        <List>
                            {filteredMessages.map(({ label, primary, secondary, person }, index) => (
                                <ListItemButton key={index + person}>
                                    <ListItemAvatar>
                                        {/* Jeśli person zawiera link, wyświetl zdjęcie */}
                                        {person.includes('link_') ? (
                                            <Avatar alt="Profile Picture" src={person} />
                                        ) : (
                                            <Avatar alt="Profile Picture" />
                                        )}
                                    </ListItemAvatar>
                                    <ListItemText primary={primary} secondary={secondary} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Box>
                    <Paper sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: '30px' }} elevation={3}>
                        <BottomNavigation
                            showLabels
                            value={value}
                            onChange={handleNavigationChange}
                        >
                            <BottomNavigationAction label="Flaga 1" icon={<PermContactCalendarIcon />} onClick={() => filterMessages('1')} />
                            <BottomNavigationAction label="Flaga 2" icon={<LabelIcon />} onClick={() => filterMessages('2')} />
                            <BottomNavigationAction label="Flaga 3" icon={<ListIcon />} onClick={() => filterMessages('3')} />
                        </BottomNavigation>
                    </Paper>
                </div>
            </div>
        </div>
    );
}


