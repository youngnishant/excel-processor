import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { connectToDatabase } from "@/db/mongodb";
import formidable from "formidable";
import { getData } from "@/utils/excel";
import { IExcelRow } from "@/types/excel";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = formidable();

  try {
    const [, files] = await form.parse(req);
    const file = files.file?.[0];

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const data: IExcelRow[] = getData(file.filepath);

    const { db } = await connectToDatabase();

    const fileId = uuidv4();
    await db.collection("excel_sheet_data").insertOne({
      userId: "guest",
      fileId,
      createdAt: new Date(),
    });

    await db.collection("excel_sheet_rows").bulkWrite(
      data.map((row, index) => ({
        insertOne: {
          document: {
            fileId,
            userId: "guest",
            data: { rowNumber: index + 1, ...row },
          },
        },
      }))
    );

    return res.status(200).json({ fileId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error processing file" });
  }
};

export default handler;
