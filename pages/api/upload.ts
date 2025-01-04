import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { connectToDatabase } from "@/db/mongodb";
import formidable from "formidable";
import { getParsedExcelData } from "@/utils/excel";

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

    const { data, columns } = getParsedExcelData(file.filepath);

    const { db } = await connectToDatabase();

    const fileId = uuidv4();
    await db.collection("excel-data").insertOne({
      userId: "guest",
      fileId,
      columns,
      data,
      createdAt: new Date(),
    });

    return res.status(200).json({ fileId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error processing file" });
  }
};

export default handler;
