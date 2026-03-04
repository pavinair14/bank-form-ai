
import { useLoadFormData } from "@/features/document-ai/useLoadFormData";
import { lazy, Suspense } from "react";
import Layout from "@/app/Layout";

const PdfViewer = lazy(() => import("@/features/pdf/PdfViewer"));
const DynamicForm = lazy(() => import("@/features/form/DynamicForm"));

const App = () => {
  const { status, error } = useLoadFormData();

  return (
    <Layout>
      <section className="flex-1 flex flex-col m-4 min-h-0 lg:border-gray-300 overflow-auto">
        <h2 className="text-2xl font-semibold my-4 text-center lg:text-left">
          Uploaded Document
        </h2>
        <Suspense fallback={<div className="p-6">Loading PDF...</div>}>
          <div className="flex-1 flex justify-center items-center">
            <PdfViewer />
          </div>
        </Suspense>
      </section>

      {/* vertical divider for large screens */}
      <div className="hidden lg:block w-px bg-gray-300 mx-2" />

      <aside className="flex-1 flex flex-col m-4 min-h-0 overflow-auto">
        <h2 className="text-2xl font-semibold my-4 text-center lg:text-left">
          Extracted Details
        </h2>
        {status === "error" && (
          <div className="p-6 text-red-500">
            Error: {error}
          </div>
        )}

        <Suspense fallback={<div className="p-6">Loading form data...</div>}>
          <DynamicForm />
        </Suspense>
      </aside>
    </Layout>
  );
}

export default App;