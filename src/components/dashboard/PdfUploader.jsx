import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const PdfUploader = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [fileSizeError, setFileSizeError] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf' && file.size <= 10485760) { // Limit to 10 MB
      setPdfFile(file);
      setFileSizeError(false);
    } else {
      setPdfFile(null);
      setFileSizeError(true);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {fileSizeError && <p style={{ color: 'red' }}>File size exceeds the limit (10MB)</p>}
      {pdfFile && (
        <div style={{ marginTop: '20px' }}>
          <Document
            file={pdfFile}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      )}
    </div>
  );
};

export default PdfUploader;
