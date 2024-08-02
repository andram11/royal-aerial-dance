// src/pages/auth/Callback.tsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setUser } from '../../state/user/userSlice';

const Callback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userParam = searchParams.get('user');
    const redirectParam = searchParams.get('redirect') || '/';

    if (userParam) {
      const user = JSON.parse(decodeURIComponent(userParam));
      dispatch(setUser(user));
      navigate(redirectParam);
    } else {
      navigate('/login');
    }
  }, [location, navigate, dispatch]);

  return <div>Loading...</div>;
};

export default Callback;
