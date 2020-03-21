import React, { FormEvent } from 'react';
import { TextField, Button , Grid, List, Tabs, Tab, ListItem, ListItemText, Typography  }  from '@material-ui/core';
import TabPanel from '../../components/TabPanel';

import './styles.scss';
import { useHistory } from 'react-router-dom';

const MainPage: React.FC<any> = () => {

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    }
    let history = useHistory();
    return (
        <Grid className="container" justify="space-between" direction="column" lg={3} sm={5} xl={6}>
            <h2 className="container__title">Выберите раздел: </h2>
            <div className="main-page__container">
                <Button 
                    className="submit__button"
                    variant="contained"
                    color="primary"
                    onClick={() => {history.push('/mapper')}}
                >
                    Карта сайта
                </Button>
                <Button 
                    className="submit__button"
                    variant="contained"
                    color="primary"
                    onClick={() => {history.push('/ftp-mapper')}}
                >
                    Карта Ftp
                </Button>
            </div>
        </Grid>
    )
}
export default MainPage;