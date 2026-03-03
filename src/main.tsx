import "@/App.css";
import React from 'react';
import ReactDOM from "react-dom/client";
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import App from '@/app/App.tsx'
import { FieldProvider } from '@/context/FieldContext.tsx';

// configures PDF.js worker for client-side PDF processing
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* FieldProvider manages form field state globally */}
    <FieldProvider>
      <App />
    </FieldProvider>
  </React.StrictMode>
);