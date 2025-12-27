import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ToastContainer } from './components/common/ToastContainer';
import { AppRoutes } from './routes';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
