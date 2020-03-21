import React, { FormEvent, useState, ChangeEvent } from 'react';
import { TextField, Button , Grid, List, Tabs, Tab, ListItem, ListItemText, Typography  }  from '@material-ui/core';
import TabPanel from '../components/TabPanel';

import * as H from 'history';

import './styles.scss';
interface ParserPageProps {
    history: H.History;
}

type SizePageType = {
    pageSize: string;
    pageName: string;
}

type FormParamsType = {
    [key: string]: string;
}

const ParserPage: React.FC<ParserPageProps> = () => {

    const [formParams, setFormParams] = useState({} as FormParamsType);

    const [maxSizePage, setMaxSizePage] = useState({} as SizePageType);
    const [parsedUrls, setParsedUrls] = useState<SizePageType[]>([]);
    const [minSizePage, setMinSizePage] = useState({} as SizePageType);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(Object.keys(formParams).length !== 2)
            return;

        try{
            const response = await fetch('http://localhost:8080/mapper', 
            {   mode: 'no-cors',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formParams)
            });
            const json = await response.json();
            setMaxSizePage(json.maxSizePage);
            setParsedUrls(json.urlArray);
            setMinSizePage(json.minSizePage);
        }
        catch(err) {
            console.log(err);
        }
    }

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement> ) => {
        setFormParams({...formParams, [event.target.name]: event.target.value});
    }

    const [tabPanelPosition, setValue] = React.useState('one');

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
      setValue(newValue);
    };

    const renderListItems = (data: SizePageType[]) => {
        return(
            <List>
            {data.map(val => 
            <>
                <ListItem button component="a" target="_blank" href={`${formParams.url}/${val.pageName}`}>
                    <Typography variant="inherit" noWrap>
                        {val.pageName}
                    </Typography>
                </ListItem>
            </> )}
        </List>
        )

    }

    return (
        <Grid className="container" justify="space-between" direction="column" lg={5} sm={5} xl={6}>
            <h2 className="container__title">Построение карты сайта</h2>
            <form className="submit__form" onSubmit={handleSubmit}>
                <TextField 
                    fullWidth 
                    required
                    className="submit__input" 
                    onChange={handleChangePassword} 
                    name="url" id="urlInput" 
                    label="Введите ссылку:" 
                    variant="standard" 
                />
                <TextField 
                    type="number"
                    required
                    fullWidth 
                    className="submit__input" 
                    onChange={handleChangePassword} 
                    name="deep" id="deepLevelInput" 
                    label="Введите уровень вложенности:" 
                    variant="standard" 
                />
                <Button 
                    className="submit__button"
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Построить
                </Button>
            </form>
            {parsedUrls.length > 0 && 
            <>
                <Tabs value={tabPanelPosition} onChange={handleChange} centered>
                    <Tab
                        value="one"
                        label={`Все страницы: ${parsedUrls.length}`}
                        wrapped
                    />
                    <Tab value="two" label="Максимальная" />
                    <Tab value="three" label="Минимальная" />
                </Tabs>
                <TabPanel value={tabPanelPosition} index="one">
                    <p className="page-size-count">Общее количество: {parsedUrls.reduce((acc, pageItem) => acc + Number(pageItem.pageSize), 0)}</p>
                    {renderListItems(parsedUrls)}
                </TabPanel>
                <TabPanel value={tabPanelPosition} index="two">
                    {renderListItems([maxSizePage])}
                </TabPanel>
                <TabPanel value={tabPanelPosition} index="three">
                    {renderListItems([minSizePage])}
                </TabPanel>
            </>
            }
        </Grid>
    )
}
export default ParserPage;