// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "normalize.css";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider } from "antd";
import zh_CN from "antd/es/locale/zh_CN";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConfigProvider locale={zh_CN}>
        <App />
      </ConfigProvider>
    </PersistGate>
  </Provider>
  // </StrictMode>
);
