import { lazy } from 'react';
// import Loadable from 'react-loadable';
// import PageLoading from 'src/components/pageLoading';
// const asyncLoad = (importFn) => {
//   return Loadable({
//     loader: importFn,
//     loading: () => <PageLoading />
//   });
// };

const routes = [
  {
    path: '/',
    exact: true,
    redirect: {
      path: '/index'
    }
  },
  {
    path: '/index',
    component: lazy(() => import('src/views/index')),
    breadcrumb: [
      {
        name: '我的工作台'
      }
    ]
  },
  {
    path: '*',
    component: lazy(() => import('src/views/errorPage'))
  }
];

export default routes;
