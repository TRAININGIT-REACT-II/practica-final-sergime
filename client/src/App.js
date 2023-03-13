import { Provider } from "react-redux";
import { ConfigProvider } from "./shared/context/ConfigProvider";

import { AppRouter } from "./router/AppRouter";

import { store } from "./store/store";
import ErrorBoundary from "./shared/components/ErrorBoundary";

// Componente principal de la aplicación.
const App = () => {

  const handleReset = () => {
    navigate('/notes', {
      replace: true,
    })
  }

  // Mostramos la aplicación
  return (
    <main>
      <ErrorBoundary
        message="Algo ha salido mal"
        onReset={ handleReset }
      >
        <Provider store={ store }>
          <ConfigProvider>
            <AppRouter />
          </ConfigProvider>
        </Provider>
      </ErrorBoundary>
    </main>
  );
};

export default App;
