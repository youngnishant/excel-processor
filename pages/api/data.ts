import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/db/mongodb";
import { IExcelRow, Operation } from "@/types/excel";
import { buildMongoFilter } from "@/utils/queryBuilder";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { fileId, userId, filterKey, filterValue, filterOperation } = req.query;

  const page = parseInt(req.query.page as string);
  const limit = parseInt(req.query.limit as string) || 10;

  const dynamicFilter = filterKey
    ? buildMongoFilter(
        filterKey as string,
        parseInt(filterValue as string),
        filterOperation as Operation
      )
    : {};

  const rowsfilter = { fileId, userId, ...dynamicFilter };

  try {
    const { db } = await connectToDatabase();

    const fileData = await db
      .collection("excel_sheet_data")
      .findOne({ userId, fileId });

    if (!fileData) {
      return res.status(404).json({ message: "File not found" });
    }
    const rowsData = await db
      .collection("excel_sheet_rows")
      .find(rowsfilter)
      .skip(page * limit)
      .limit(limit)
      .toArray();

    const totalRecordsCount = await db
      .collection("excel_sheet_rows")
      .countDocuments(rowsfilter);

    return res.status(200).json({
      data: rowsData.map((row: IExcelRow) => row.data),
      columns: fileData.columns,
      pagination: {
        currentPage: page,
        totalRecordsCount,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching data" });
  }
};

export default handler;
