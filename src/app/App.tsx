
import { useLoadFormData } from "@/features/document-ai/useLoadFormData";
import { Card } from "@/components/ui/card";
import { lazy, Suspense } from "react";

const PdfViewer = lazy(() => import("@/features/pdf/PdfViewer"));
const DynamicForm = lazy(() => import("@/features/form/DynamicForm"));

const App = () => {
  const { status, error } = useLoadFormData();

  return (
    <main className="flex lg:flex-row flex-col lg:h-screen h-full p-4 bg-gray-800 items-center">
      <section className="flex-1 flex justify-center items-center bg-white m-6 rounded-xl min-h-[400px]">
        <Suspense fallback={<Card className="p-6">Loading PDF...</Card>}>
          <PdfViewer />
        </Suspense>
      </section >

      <aside className="lg:flex-2 flex-1 flex items-center justify-center w-full lg:border-l min-h-[400px]">

        {status === "error" && (
          <Card className="p-6 text-red-500">
            Error: {error}
          </Card>
        )}

        <Suspense fallback={<Card className="p-6">Loading form data...</Card>}><DynamicForm /></Suspense>
      </aside>
    </main>
  );
}

export default App;