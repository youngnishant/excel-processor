import { useDropzone } from "react-dropzone";
import { IFileUploadProps } from "@/types/fileupload";

const FileUpload = ({ onUpload }: IFileUploadProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onUpload,
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
};

export default FileUpload;
