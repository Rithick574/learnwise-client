import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { Toaster } from "react-hot-toast";



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <Provider store={store}>
    <Toaster position="top-center" />
      <App />
    </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
