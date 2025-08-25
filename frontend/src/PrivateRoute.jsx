import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { isSignedIn } = useSelector((state) => state.user || {});
  return isSignedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;