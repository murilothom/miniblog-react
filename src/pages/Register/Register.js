import styles from './Register.module.css';

import { useState, useEffect } from 'react';

import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    const user = {
      displayName,
      email,
      password
    };

    if(password !== confirmPassword){
      setError("Senhas precisam ser iguais!");
      return;
    }

    const res = await createUser(user);

  };

  useEffect(() => {

    if(authError) {
      setError(authError);
    }

  }, [ authError ])

  return (
    <div className={styles.register}>
      <h1>Cadastre-se</h1>
      <p>Crie seu usuário e comece a postar.</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input type="text"
          name="displayName"
          required
          placeholder='Digite seu nome'
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input type="email"
          name="email"
          required
          placeholder='E-mail do usuário'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input type="password"
          name="password"
          required
          placeholder='Insira sua senha'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Confirme sua senha:</span>
          <input type="password"
          name="confirmPassword"
          required
          placeholder='Confirme sua senha'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {!loading && <button className='btn'>Cadastrar</button>}
        {loading && <button className='btn' disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Register