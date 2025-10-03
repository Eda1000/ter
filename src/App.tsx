import AppRoutes from "./routes";
import AppProvider from "./hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./styles/global";

function App() {
  return (
    <AppProvider>
      <AppRoutes />
      <GlobalStyle />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
