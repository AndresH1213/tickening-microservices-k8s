import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const signup = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group mb-2">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sgn Up</button>
    </form>
  );
};

export default signup;
