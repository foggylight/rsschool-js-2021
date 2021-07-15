import React, { FormEventHandler, ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Routes } from '../models/app';
import { changeAuthState } from '../redux/actions';
import { AUTH_URL } from '../utils';

interface IModalProps {
  closeHandler: () => void;
}

const ModalBox = ({ closeHandler }: IModalProps): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    password: '',
    name: '',
  });

  const { password, name } = inputs;

  const onChange: FormEventHandler = e => {
    const data = e.target as HTMLFormElement;
    setInputs({ ...inputs, [data.name]: data.value });
  };

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();

    try {
      const body = { name, password };
      const res = await fetch(`${AUTH_URL}login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const parseRes = await res.json();

      if (parseRes.token) {
        localStorage.setItem('token', parseRes.token);
        dispatch(changeAuthState(true));
        history.push(Routes.admin);
        // eslint-disable-next-line no-alert
        alert(
          `Токен для входа будет действителен 1 час, после этого при попытке открыть /admin должно перебрасывать на главную страницу. После истечения срока годности токена просто залогинься под теми же данными снова`,
        );
      } else {
        dispatch(changeAuthState(false));
        // eslint-disable-next-line no-alert
        alert(parseRes);
        closeHandler();
        history.push(Routes.main);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={onSubmit} className="modal__form" action="aut" method="POST">
        <div className="modal__form-comments">
          <p className="ru">Данные для входа в админ-панель:</p>
          <p>login: admin</p>
          <p>password: admin</p>
        </div>
        <input
          onChange={e => onChange(e)}
          className="form-input"
          name="name"
          type="text"
          placeholder="login"
          value={inputs.name}
          required
        />
        <input
          onChange={e => onChange(e)}
          className="form-input"
          name="password"
          type="password"
          placeholder="password"
          value={inputs.password}
          required
        />
        <div className="btn-container">
          <button onClick={closeHandler} className="btn" type="button">
            Cancel
          </button>
          <button className="btn" type="submit">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalBox;
