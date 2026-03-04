import "@/App.css";
import { StrictMode } from 'react';
import ReactDOM from "react-dom/client";
import App from '@/app/App.tsx'
import { FieldProvider } from "@/context/FieldProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* FieldProvider manages form field state globally */}
    <FieldProvider>
      <App />
    </FieldProvider>
  </StrictMode>
);