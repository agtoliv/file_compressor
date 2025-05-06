import { useState } from "react";

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Arquivo selecionado:", selectedFile.name);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 p-6 rounded-xl text-center">
      <label className="cursor-pointer">
        <p className="text-gray-700 mb-2">Clique para escolher um PDF</p>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {file && (
        <p className="mt-4 text-sm text-green-600">
          Arquivo selecionado: {file.name}
        </p>
      )}
    </div>
  );
}
