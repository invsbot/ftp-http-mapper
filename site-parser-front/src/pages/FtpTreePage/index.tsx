import React, { FormEvent, useState, ChangeEvent } from 'react';
import { TextField, Button , Grid}  from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import TabPanel from '../../components/TabPanel';

import * as H from 'history';

import './styles.scss';

interface RenderTree {
    id: string;
    name: string;
    children?: RenderTree[];
}

export type DirectoryItem = {
    type: string;
    perms: string;
    items: number;
    owner: string;
    group: string;
    size: number;
    date: string;
    name: string;
    data?: DirectoryItem[];
  }

interface FTPTreePageProps {
    history: H.History;
}
// const resp = {"ftpTree":[{"type":"d","perms":"rwxr-xr-x","items":2,"owner":"1228","group":"1000","size":4096,"date":"Nov 24 13:01","name":".log"},{"type":"d","perms":"rwxrw----","items":3,"owner":"1228","group":"1000","size":4096,"date":"Dec 12 10:24","name":"TEST","data":[{"type":"d","perms":"rwxr-xr-x","items":2,"owner":"1228","group":"1000","size":4096,"date":"Dec 12 10:24","name":"newfolder"}]},{"type":"d","perms":"rwxr-x---","items":4,"owner":"1227","group":"1000","size":4096,"date":"Dec 07  2016","name":"htdocs","data":[{"type":"d","perms":"rwxr-xr-x","items":2,"owner":"1227","group":"1000","size":4096,"date":"Nov 22  2016","name":"123"},{"type":"d","perms":"rwxr-xr--","items":2,"owner":"1227","group":"1000","size":4096,"date":"Dec 07  2016","name":"qwerty"}]},{"type":"d","perms":"r-xr-xr--","items":2,"owner":"1227","group":"1000","size":4096,"date":"Dec 21  2016","name":"test.test"},{"type":"d","perms":"rwxr-x---","items":2,"owner":"1227","group":"1000","size":4096,"date":"Nov 21  2016","name":"tmp"}]}
type FormParamsType = {
    [key: string]: string;
}

const FtpTreePage: React.FC<FTPTreePageProps> = () => {

    const [formParams, setFormParams] = useState({} as FormParamsType);

    const [treeData, setTreeData] = useState({} as RenderTree);

    const renderTree = (nodes: RenderTree) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
          {Array.isArray(nodes.children) ? nodes.children.map(node => renderTree(node)) : null}
        </TreeItem>
      );
    

      const createAsyncConvertRecursion = (items: DirectoryItem[] | undefined) : Promise<RenderTree[]> => new Promise((success) => {
            setTimeout(async () => {
                success(await Promise.all(items?.map(async (val) => (
                    {
                        id: `${val.name}_${val.date}`,
                        name: val.name,
                        children: val?.data && await createAsyncConvertRecursion(val.data)
                    })
            ) as any))}, 0)
        });


      const convertFtpTreeItems = async (items: DirectoryItem[]): Promise<RenderTree> => {
        return { id: 'root_id', name: '/', children: await createAsyncConvertRecursion(items)}
      }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log('Test')
        try{
            const response = await fetch('/ftpMapper', 
            {   mode: 'same-origin', // no-cors, *cors, same-origin
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formParams)
            });
            const json = await response.json();
            setTreeData(await convertFtpTreeItems(json?.ftpTree as any));
        }
        catch(err) {
            console.log(err);
        }
    }

    const handleChangeText = (event: ChangeEvent<HTMLInputElement> ) => {
        setFormParams({...formParams, [event.target.name]: event.target.value});
    }

    return (
        <Grid className="container" justify="space-between" direction="column" lg={3} sm={5} xl={6}>
            <h2 className="container__title">Построение карты Ftp сервера</h2>
            <form className="submit__form" onSubmit={handleSubmit}>
                <TextField 
                    fullWidth 
                    required
                    className="submit__input" 
                    onChange={handleChangeText} 
                    name="ip"
                    label="Введите ip:" 
                    variant="standard" 
                />
                <TextField 
                    required
                    fullWidth 
                    className="submit__input" 
                    onChange={handleChangeText} 
                    name="user"
                    label="Введите пользователя:" 
                    variant="standard" 
                />
                <TextField
                    fullWidth 
                    required
                    className="submit__input" 
                    onChange={handleChangeText} 
                    name="password"
                    label="Введите пароль:" 
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
            <TreeView
            className="root_tree"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
            >
            {renderTree(treeData)}
            </TreeView>
        </Grid>
    )
}
export default FtpTreePage;