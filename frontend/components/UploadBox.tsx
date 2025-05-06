export default function UploadBox() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-lg font-semibold mb-4">Upload your PDF</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => alert('Upload button clicked (fake)')}
        >
          Select PDF
        </button>
      </div>
    );
  }
  