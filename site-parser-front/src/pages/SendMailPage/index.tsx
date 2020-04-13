import React, {
  useState, useRef, FormEvent, ChangeEvent,
} from 'react';
import {
  TextField, Button, Grid, Snackbar, Input,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import './styles.scss';


type FormParamsType = {
    [key: string]: string;
}

type SnackBarMessagesType = {
    success?: any;
    error?: any;
};

const SendMailPage: React.FC<any> = () => {
  const [formParams, setFormParams] = useState({} as FormParamsType);
  const [snackBarMessage, setSnackBarMessages] = useState<SnackBarMessagesType | undefined>(undefined);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const readFileAsync = (file: File) => new Promise((success, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      success(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });

  const convertFilesBase64 = (files: FileList | undefined | null) => files && files?.length > 0 && Array.from(files)
    .reduce(async (acc, file) => {
      const document = await readFileAsync(file);
      const newAcc = await acc;
      return document ? [...newAcc, { content: document, fileName: file.name }] : newAcc;
    }, Promise.resolve([] as any));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.keys(formParams).length < 1) { return; }

    const attachments = await convertFilesBase64(fileInputRef.current?.files);
    const body = JSON.stringify({ ...formParams, attachments });
    try {
      const response = await fetch('/mail-sender',
        {
        //   mode: 'no-cors',
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        });
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setSnackBarMessages({ success: true });
      } else {
        setSnackBarMessages({ error: true });
      }
    } catch (err) {
      setSnackBarMessages({ error: true });
    }
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setFormParams({ ...formParams, [event.target.name]: event.target.value });
  };

  const Alert = (props: any) => <MuiAlert elevation={6} variant="filled" {...props} />;

  const handleSnackBarClose = () => {
    setSnackBarMessages(undefined);
  };

  return (
    <>
      { snackBarMessage && snackBarMessage?.success
        && (
        <Snackbar open={!!snackBarMessage} autoHideDuration={6000} onClose={handleSnackBarClose}>

          <Alert onClose={handleSnackBarClose} severity="success">
            Успешно отправлено!
          </Alert>
        </Snackbar>
        )}
      { snackBarMessage && snackBarMessage?.error
        && (
        <Snackbar open={!!snackBarMessage} autoHideDuration={6000} onClose={handleSnackBarClose}>
          <Alert onClose={handleSnackBarClose} severity="error">
            Ошибка отправки!
          </Alert>
        </Snackbar>
        )}

      <Grid className="container" justify="space-between" direction="column" lg={5} sm={5} xl={6}>
        <h2 className="container__title">Отпрвка сообщения email</h2>
        <form className="submit__form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            className="submit__input"
            onChange={handleChangeInput}
            name="host"
            label="Введите сервер:"
            variant="standard"
          />
          <TextField
            type="number"
            required
            fullWidth
            className="submit__input"
            onChange={handleChangeInput}
            name="port"
            label="введите порт"
            variant="standard"
          />
          <TextField
            required
            fullWidth
            className="submit__input"
            onChange={handleChangeInput}
            name="user"
            label="введите пользователя"
            variant="standard"
          />
          <TextField
            required
            fullWidth
            className="submit__input"
            onChange={handleChangeInput}
            name="password"
            label="Введите пароль"
            variant="standard"
          />
          <TextField
            required
            fullWidth
            className="submit__input"
            onChange={handleChangeInput}
            name="email"
            label="Введите email"
            variant="standard"
          />
          <TextField
            required
            fullWidth
            className="submit__input"
            onChange={handleChangeInput}
            name="subject"
            label="Введите тему"
            variant="standard"
          />
          <TextField
            required
            fullWidth
            className="submit__input"
            onChange={handleChangeInput}
            name="text"
            label="Введите текст"
            variant="standard"
          />
          <div className="submit__input">
            <label htmlFor="fileInput">
              Файлы для прикрепления
              <input ref={fileInputRef} id="fileInput" type="file" multiple />
            </label>
          </div>
          <Button
            className="submit__button"
            type="submit"
            variant="contained"
            color="primary"
          >
            Отправить
          </Button>
        </form>
      </Grid>
    </>
  );
};
export default SendMailPage;
