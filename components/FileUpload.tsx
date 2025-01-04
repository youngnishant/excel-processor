"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { getParsedExcelData } from "@/utils/excel";
import { IFileUploadProps } from "@/types/fileupload";

export default function FileUpload({ onUpload }: IFileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const excelBinaryData = event.target?.result;
        const { data, columns } = getParsedExcelData(excelBinaryData);

        onUpload({ columns, data });
      };

      reader.readAsArrayBuffer(acceptedFiles[0]);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the Excel file here...</p>
      ) : (
        <p>Drag & drop an Excel file here, or click to select</p>
      )}
    </div>
  );
}
