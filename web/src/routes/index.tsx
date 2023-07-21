import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routesConfig, { IMenuBase, IMenu } from './config';

const Loading = () => {
  return (
    <div>加载中。。。</div>
  )
}

const createRoute = (r: IMenu) => {
  const Comp = r.component!
  return (
    <Route key={r.path} path={r.path} element={
      <React.Suspense fallback={<Loading></Loading>}>
        <Comp />
      </React.Suspense>
    }></Route>
  );
}

const createMenu = (r: IMenu) => {
  return r.component ? createRoute(r) : r.subs?.map(v => createRoute(v))
}

const routes = () => {
  return (
    <Routes>
      {routesConfig.map(r => createMenu(r))}
    </Routes>
  );
}

export default routes;