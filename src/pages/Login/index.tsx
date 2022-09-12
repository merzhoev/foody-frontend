import React from 'react';
import clsx from 'clsx';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchLogin, setErrorAction } from '../../redux/actions/auth';
import { IAuthData } from '../../redux/reducers/auth/types';

const schema = yup.object().shape({
  username: yup.string().min(2, 'Должно быть не меньше 2 символов'),
  password: yup.string().min(8, 'Должно быть не меньше 8 символов'),
});

export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IAuthData>({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useAppSelector(({ auth }) => auth);
  const isAuth = !!data;

  const handleSubmitForm = (values: IAuthData) => {
    dispatch(fetchLogin(values));
  };

  React.useEffect(() => {
    dispatch(setErrorAction(null));
  }, []);

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="auth">
      <h1 className="auth__title">Вход</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="auth__form">
        <div className="auth__username">
          <label htmlFor="auth__username-text-field" className="auth__label label">
            Username*
          </label>
          <input
            {...register('username')}
            id="auth__username-text-field"
            className="auth__text-field"
            type="text"
            placeholder="Введите имя пользователя"
          />
          {!!errors.username && (
            <p
              className={clsx(
                'auth__helper-text',
                !!errors.username && 'auth__helper-text--error',
              )}>
              {errors.username?.message}
            </p>
          )}
        </div>
        <div className="auth__password">
          <label htmlFor="auth__password-text-field" className="auth__label label">
            Password*
          </label>
          <input
            {...register('password')}
            id="auth__password-text-field"
            className="auth__text-field"
            type="password"
            placeholder="Введите пароль"
          />
          {!!errors.password && (
            <p className="auth__helper-text auth__helper-text--error">{errors.password?.message}</p>
          )}
        </div>
        {error && (
          <p style={{ textAlign: 'center' }} className="auth__helper-text auth__helper-text--error">
            {error.message}
          </p>
        )}
        <button
          disabled={isLoading}
          className={clsx('auth__btn btn-primary', isLoading && 'btn-primary--disabled')}
          type="submit">
          Войти
        </button>
      </form>
      <p className="auth__additional">
        Нет аккаунта?{' '}
        <Link className="auth__additional-link" to="/register">
          Регистрация
        </Link>
      </p>
    </div>
  );
};