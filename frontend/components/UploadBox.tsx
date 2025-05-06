import { useState } from "react";
import axios from "axios";

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);

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
        setUploadResult(null);
        console.log("Selected file:", selectedFile.name);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const response = await axios.post("/api/compress", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadResult("Upload successful!");
      console.log("Upload response:", response.data);
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
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
        <p className="mt-4 text-sm text-red-500">{error}</p>
      )}

      {uploadResult && (
        <p className="mt-4 text-sm text-blue-600">{uploadResult}</p>
      )}

      {file && !error && (
        <button
        onClick={handleUpload}
        disabled={uploading}
        className={`mt-4 px-4 py-2 flex items-center justify-center gap-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${uploading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {uploading && (
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        )}
        {uploading ? "Uploading..." : "compress PDF"}
      </button>
      )}
    </div>
  );
}
