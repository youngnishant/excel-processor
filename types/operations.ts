export enum OperationType {
  ADD_COLUMN = "ADD_COLUMN",
  UNDO_ADD_COLUMN = "UNDO_ADD_COLUMN",
  COMBINE_COLUMNS = "COMBINE_COLUMNS",
}

export interface OperationRequest {
  operationType: OperationType;
  userId: string;
  undo: boolean;
  params: {
    column1: string;
    column2: string;
    newColumnName: string;
  };
}

export interface OperationParams {
  fileId: string;
  userId: string;
  column1: string;
  column2: string;
  newColumnName: string;
  db: any;
}
