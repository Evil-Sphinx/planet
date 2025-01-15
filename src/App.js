import './App.css';
import { HashRouter } from 'react-router-dom';
import Wrapper from './layouts/wrapper';
import renderRoutes from 'src/router/renderRoutes';
import routes from 'src/router';

function App() {
  return (
    <HashRouter>
      <Wrapper>{renderRoutes(routes)}</Wrapper>
    </HashRouter>
  );
}

export default App;
