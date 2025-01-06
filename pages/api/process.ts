import { IExcelRow } from "@/types/excel";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { data, operation } = req.body;

  switch (operation) {
    case "addTotal":
      const processedData = data.map((row: IExcelRow) => ({
        ...row,
        Total: Number(row.Price || 0) + Number(row.Tax || 0),
      }));
      return res.status(200).json({ data: processedData });

    case "filter":
      const filteredData = data.filter(
        (row: IExcelRow) => Number(row.Price) > 100
      );
      return res.status(200).json({ data: filteredData });

    default:
      return res.status(400).json({ message: "Invalid operation" });
  }
}
