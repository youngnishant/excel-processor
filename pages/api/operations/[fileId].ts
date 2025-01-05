import { connectToDatabase } from "@/db/mongodb";
import {
  OperationParams,
  OperationRequest,
  OperationType,
} from "@/types/operations";
import { NextApiRequest, NextApiResponse } from "next";

const handleAddColumn = async ({
  fileId,
  userId,
  column1,
  column2,
  db,
}: OperationParams) => {
  await db.collection("excel_sheet_rows").updateMany({ fileId, userId }, [
    {
      $set: {
        "data.Total": {
          $add: [
            { $toDouble: `$data.${column1}` },
            { $toDouble: `$data.${column2}` },
          ],
        },
      },
    },
  ]);
};

const handleUndoAddColumn = async ({
  fileId,
  userId,
  newColumnName,
  db,
}: OperationParams) => {
  await db.collection("excel_sheet_rows").updateMany(
    { fileId, userId },
    {
      $unset: { [newColumnName]: "" },
    }
  );
};

const handleCombineColumns = async ({
  fileId,
  userId,
  column1,
  column2,
  newColumnName,
  db,
}: OperationParams) => {
  await db.collection("excel_sheet_rows").updateMany({ userId, fileId }, [
    {
      $set: {
        [`data.${newColumnName}`]: {
          $concat: [`$data.${column1}`, " ", `$data.${column2}`],
        },
      },
    },
    {
      $unset: [`data.${column1}`, `data.${column2}`],
    },
  ]);
};

const executeOperation = async (
  operationType: string,
  params: OperationParams
) => {
  switch (operationType) {
    case OperationType.ADD_COLUMN:
      await handleAddColumn(params);
      break;
    case OperationType.UNDO_ADD_COLUMN:
      await handleUndoAddColumn(params);
      break;
    case OperationType.COMBINE_COLUMNS:
      await handleCombineColumns(params);
      break;
    default:
      throw new Error("Invalid operation type");
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { fileId } = req.query;
  const { operationType, userId, params }: OperationRequest = req.body;
  const { column1, column2, newColumnName } = params;

  if (!fileId) {
    return res.status(400).json({ message: "fileId is required" });
  }

  try {
    const { db } = await connectToDatabase();
    const operationParams = {
      fileId: fileId as string,
      userId,
      column1,
      column2,
      newColumnName,
      db,
    };

    await executeOperation(operationType, operationParams);

    return res.status(200).json({ status: "success" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error processing operation", error });
  }
}
