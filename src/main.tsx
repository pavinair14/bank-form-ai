import "@/App.css";
import "@/lib/pdfWorker";
import React from 'react';
import ReactDOM from "react-dom/client";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
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