import PdfViewer from "@/features/pdf/PdfViewer";
import DynamicForm from "@/features/form/DynamicForm";
import { useLoadFormData } from "@/features/document-ai/useLoadFormData";
import { Card } from "@/components/ui/card";


const App = () => {
  const { status, error } = useLoadFormData();

  return (
    <main className="flex lg:flex-row flex-col lg:h-screen h-full p-4 bg-gray-800 items-center">
      <section className="flex-1 flex justify-center items-center bg-white m-6 rounded-xl">
        <PdfViewer />
      </section >

      <aside className="lg:flex-2 flex-1 flex items-center justify-center w-full lg:border-l">
        {status === "loading" && (
          <Card className="p-6">Loading form data...</Card>
        )}

        {status === "error" && (
          <Card className="p-6 text-red-500">
            Error: {error}
          </Card>
        )}

        {status === "success" && <DynamicForm />}
      </aside>
    </main>
  );
}

export default App;