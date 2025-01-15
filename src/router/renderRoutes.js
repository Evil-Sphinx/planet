import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PageLoading from 'src/components/pageLoading';
const renderRoutes = (routes, extraProps = {}, switchProps = {}) => {
  if (routes) {
    return (
      <Suspense fallback={PageLoading}>
        <Switch {...switchProps}>
          {routes.map((route, i) => (
            <Route
              key={route.key || i}
              path={route.path}
              exact={route.exact}
              strict={route.strict}
              highlight={route.highlight}
              breadcrumb={route.breadcrumb}
              render={(props) => {
                const {
                  location: { state = {} }
                } = props;
                props.location.state = {
                  ...state,
                  breadcrumb: route.breadcrumb,
                  highlight: route.highlight
                };

                if (route.redirect) {
                  return <Redirect to={{ pathname: route.redirect.path }} />;
                }
                return <route.component {...props} {...extraProps} route={route} />;
              }}
            />
          ))}
        </Switch>
      </Suspense>
    );
  }
  return null;
};
export default renderRoutes;
