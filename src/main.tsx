import "@/App.css";
import React from 'react';
import ReactDOM from "react-dom/client";
import App from '@/app/App.tsx'
import { FieldProvider } from '@/context/FieldContext.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* FieldProvider manages form field state globally */}
    <FieldProvider>
      <App />
    </FieldProvider>
  </React.StrictMode>
);