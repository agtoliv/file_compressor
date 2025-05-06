import { useState } from "react";

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const fileName = selectedFile.name.toLowerCase();
      const isPdf = selectedFile.type === "application/pdf" || fileName.endsWith(".pdf");

      if (!isPdf) {
        setError("Only PDF files are allowed.");
        setFile(null);
        console.warn("Rejected file:", selectedFile.name);
      } else {
        setFile(selectedFile);
        setError(null);
        console.log("Selected file:", selectedFile.name);
      }
    }
  };

  const formatFileSize = (sizeInBytes: number) => {
    return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="border-2 border-dashed border-gray-300 p-6 rounded-xl text-center">
      <label className="cursor-pointer">
        <p className="text-gray-700 mb-2">Click to select a PDF file</p>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {file && (
        <div className="mt-4 text-sm text-green-700">
          <p><strong>File:</strong> {file.name}</p>
          <p><strong>Size:</strong> {formatFileSize(file.size)}</p>
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
