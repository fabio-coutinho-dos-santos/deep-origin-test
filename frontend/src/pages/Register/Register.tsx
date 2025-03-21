import { useEffect, useState } from 'react'
import './Register.sass'
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../../hooks/useHttp';
import { CONSTANTS } from '../../config/constants';
import { useAuth } from '../../contexts/AuthContext';
import { LoginInterface } from '../../interfaces/login.interface';
import { useHttpErrors } from '../../hooks/useHttpErrors';

const Register = () => {

  const { post } = useHttp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, accessToken, userId, userName } = useAuth();

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');


  const { registerErrorHandling } = useHttpErrors();

  useEffect(() => {
    if (accessToken && userId && userName) {
      navigate('/home')
    }
  }, [accessToken, userId, userName])


  const handlerSubmit = async (event: any) => {
    try {
      event.preventDefault();
      setLoading(true)
      const response: LoginInterface = await post(`${CONSTANTS.url.host}/api/v1/users/register`, { email, password, name })
      login(response.accessToken, response.user.id, response.user.name);
      setLoading(false)
      navigate('/home')
    } catch (e: any) {
      setLoading(false)
      setError(true)
      setErrorText(registerErrorHandling(e.status))
    }
  }

  return (
    <>
      <div className="container col-11 col-sm-9 " >
        <div id='form-container'>
          <div className="row align-items-center gx-5">
            <div className="col-md-6 order-md-2">
              <h2>Register</h2>
              <form onSubmit={handlerSubmit}>
                <div className='form-floating mb-3'>
                  <input type="text" minLength={5} required onChange={(e) => setName(e.target.value)} className='form-control' value={name} id='name' name='name' placeholder='Digite seu nome' />
                  <label htmlFor="label" className='form-label'>Full Name</label>
                </div>
                <div className='form-floating mb-3'>
                  <input type="email" minLength={5} required onChange={(e) => setEmail(e.target.value)} className='form-control' value={email} id='email' name='email' placeholder='Digite seu email' />
                  <label htmlFor="label" className='form-label'>Email</label>
                </div>
                <div className='form-floating mb-3'>
                  <input type="password" minLength={5} required onChange={(e) => setPassword(e.target.value)} className='form-control' value={password} id='password' name='password' placeholder='Digite a sua senha' />
                  <label htmlFor="label" className='form-label'>Password</label>
                </div>
                {error && <div className="row text-start text-error">
                  <p>{errorText}</p>
                </div>}
                <div className="row text-end">
                  <a href="/login">Login</a>
                </div>
                <div className="row">
                  <div className="col-6 col-sm-3">
                    <input type="submit" className='btn btn-primary' value={'Register'} />
                  </div>
                  {loading && <div className="col-3">
                    <div className="spinner-border" role="status"></div>
                  </div>}
                </div>
              </form>
            </div>

            <div className="col-md-6 order-md-2 d-none d-md-block">
              <div className="col-12">
                <img src="images/register-image.png" alt="Entrar no Sistema" className='img-fluid' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register