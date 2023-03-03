import { Provider } from "react-redux";
import { AuthProvider } from "./auth/context/AuthProvider";
import { ConfigProvider } from "./shared/context/ConfigProvider";

import { AppRouter } from "./router/AppRouter";

import { store } from "./store/store";

// Componente principal de la aplicación.
const App = () => {

  // Mostramos la aplicación
  return (
    <main>
      <Provider store={ store }>
        <ConfigProvider>
          <AppRouter />
        </ConfigProvider>
      </Provider>
    </main>
  );
};

export default App;
