import PdfViewer from "@/features/pdf/PdfViewer";
import DynamicForm from "@/features/form/DynamicForm";
import { useLoadFormData } from "@/features/document-ai/useLoadFormData";
import { Card } from "@/components/ui/card";

const App = () => {
  const { status, error } = useLoadFormData();

  return (
    <div className="flex h-screen">
      <div className="flex-1 border-r">
        <PdfViewer />
      </div>

      <div className="flex-1 flex items-center justify-center">
        {status === "loading" && (
          <Card className="p-6">Loading form data...</Card>
        )}

        {status === "error" && (
          <Card className="p-6 text-red-500">
            Error: {error}
          </Card>
        )}

        {status === "success" && <DynamicForm />}
      </div>
    </div>
  );
}

export default App;