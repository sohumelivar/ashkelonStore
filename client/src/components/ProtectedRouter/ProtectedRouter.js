import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const ProtectedRouter = observer(({user, redirectPath = '/' }) => {

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return (
    <Outlet />
  );
})

export default ProtectedRouter;
