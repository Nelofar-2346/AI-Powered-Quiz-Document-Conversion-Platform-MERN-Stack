import React, { useState } from "react";
import api from "../services/api";

export default function Converter() {
  const [docFile, setDocFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfText, setPdfText] = useState("");

  // DOCX → PDF
  const handleDocToPdf = async () => {
    if (!docFile) return alert("Upload a DOC/DOCX file");
    const formData = new FormData();
    formData.append("file", docFile);

    const res = await api.post("/convert/doc-to-pdf", formData, {
      responseType: "blob", // important to handle file download
      headers: { "Content-Type": "multipart/form-data" },
    });

    downloadFile(res.data, "converted.pdf");
  };

  // Images → PDF
  const handleImagesToPdf = async () => {
    if (!imageFiles.length) return alert("Upload at least one image");
    const formData = new FormData();
    imageFiles.forEach((img) => formData.append("images", img));

    const res = await api.post("/convert/image-to-pdf", formData, {
      responseType: "blob",
      headers: { "Content-Type": "multipart/form-data" },
    });

    downloadFile(res.data, "images.pdf");
  };

  // PDF → Text
  const handlePdfToText = async () => {
    if (!pdfFile) return alert("Upload a PDF file");
    const formData = new FormData();
    formData.append("file", pdfFile);

    const res = await api.post("/convert/pdf-to-text", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setPdfText(res.data.text);
  };

  // Helper: Download file
  const downloadFile = (data, filename) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">File Converter</h1>

      {/* DOCX → PDF */}
      <div className="border p-4 rounded-lg">
        <h2 className="font-semibold mb-2">DOC/DOCX to PDF</h2>
        <input type="file" accept=".doc,.docx" onChange={(e) => setDocFile(e.target.files[0])} />
        <button
          onClick={handleDocToPdf}
          className="ml-2 bg-blue-600 text-white px-3 py-1 rounded"
        >
          Convert
        </button>
      </div>

      {/* Images → PDF */}
      <div className="border p-4 rounded-lg">
        <h2 className="font-semibold mb-2">Images to PDF</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImageFiles(Array.from(e.target.files))}
        />
        <button
          onClick={handleImagesToPdf}
          className="ml-2 bg-green-600 text-white px-3 py-1 rounded"
        >
          Convert
        </button>
      </div>

      {/* PDF → Text */}
      <div className="border p-4 rounded-lg">
        <h2 className="font-semibold mb-2">PDF to Text</h2>
        <input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files[0])} />
        <button
          onClick={handlePdfToText}
          className="ml-2 bg-purple-600 text-white px-3 py-1 rounded"
        >
          Extract Text
        </button>

        {pdfText && (
          <div className="mt-4 p-2 border rounded bg-gray-50 max-h-60 overflow-y-auto">
            <h3 className="font-medium">Extracted Text:</h3>
            <pre className="text-sm whitespace-pre-wrap">{pdfText}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
