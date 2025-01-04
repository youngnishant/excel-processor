import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { connectToDatabase } from "@/db/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { columns, data, userId } = req.body;
  const fileId = uuidv4();

  try {
    const { db } = await connectToDatabase();

    await db.collection("excel-data").insertOne({
      userId,
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
