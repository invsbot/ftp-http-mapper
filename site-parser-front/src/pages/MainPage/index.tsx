import React, { FormEvent } from 'react';
import { Button, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import './styles.scss';

const MainPage: React.FC<any> = () => {
  const history = useHistory();
  return (
    <Grid className="container" justify="space-between" direction="column" lg={3} sm={5} xl={6}>
      <h2 className="container__title">Выберите раздел: </h2>
      <div className="main-page__container">
        <Button
          className="submit__button"
          variant="contained"
          color="primary"
          onClick={() => { history.push('/mapper'); }}
        >
          Карта сайта
        </Button>
        <Button
          className="submit__button"
          variant="contained"
          color="primary"
          onClick={() => { history.push('/ftp-mapper'); }}
        >
          Карта Ftp
        </Button>
        <Button
          className="submit__button"
          variant="contained"
          color="primary"
          onClick={() => { history.push('/mail-sender'); }}
        >
          Отправить на почту данные
        </Button>
      </div>
    </Grid>
  );
};
export default MainPage;
