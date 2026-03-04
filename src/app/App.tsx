
import { useLoadFormData } from "@/features/document-ai/useLoadFormData";
import { Card } from "@/components/ui/card";
import { lazy, Suspense } from "react";
import Layout from "@/app/Layout";

const PdfViewer = lazy(() => import("@/features/pdf/PdfViewer"));
const DynamicForm = lazy(() => import("@/features/form/DynamicForm"));

const App = () => {
  const { status, error } = useLoadFormData();

  return (
    <Layout>
      <section className="flex-1 m-6 min-h-[80vh] lg:border-r">
        <Suspense fallback={<Card className="p-6">Loading PDF...</Card>}>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold my-4">Uploaded Document</h2>
            <PdfViewer />
          </div>
        </Suspense>
      </section >

      <aside className="flex-1 m-6 flex flex-col items-center w-full min-h-[80vh]">
        <h2 className="text-2xl font-semibold my-4">Extracted Details</h2>
        {status === "error" && (
          <Card className="p-6 text-red-500">
            Error: {error}
          </Card>
        )}

        <Suspense fallback={<Card className="p-6">Loading form data...</Card>}><DynamicForm /></Suspense>
      </aside>
    </Layout>
  );
}

export default App;