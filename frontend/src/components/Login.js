import useForm from '../hooks/useForm';

const Login = ({ onLogin }) => {
  const { enteredValues, errors, handleChange } = useForm({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!enteredValues.email || !enteredValues.password) {
      return;
    }
    onLogin(enteredValues);
  };

  return (
    <div className="auth">
      <h2 className="auth__heading">Вход</h2>
      <form className="auth__form form" onSubmit={handleSubmit} noValidate>
        <input
          name="email"
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          value={enteredValues.email || ''}
          onChange={handleChange}
          required
        />
        <span className="auth__error">{errors.email}</span>
        <input
          name="password"
          id="password"
          type="password"
          autoComplete="password"
          placeholder="Пароль"
          minLength="8"
          value={enteredValues.password || ''}
          onChange={handleChange}
          required
        />
        <span className="auth__error">{errors.password}</span>
        <button type="submit">Войти</button>
        <span className="auth__login-hint"></span>
      </form>
    </div>
  )
};

export default Login;
