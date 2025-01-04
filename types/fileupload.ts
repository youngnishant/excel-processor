import { IDataTableProps } from "./excel";

export interface IFileUploadProps {
  onUpload: (data: IDataTableProps) => void;
}
