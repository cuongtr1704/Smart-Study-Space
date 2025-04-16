import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ Fix here
import { logout } from './users/userSlice';

export const useAuthRedirect = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = () => {
      if (!user || !user.token) {
        navigate('/login');
        return;
      }

      try {
        const decoded = jwtDecode(user.token); // ✅ Fix here
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          dispatch(logout());
          navigate('/login');
        }
      } catch (err) {
        console.error('Invalid token:', err);
        dispatch(logout());
        navigate('/login');
      }
    };

    checkToken();
  }, [user, navigate, dispatch]);
};
