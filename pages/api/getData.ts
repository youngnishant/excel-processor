import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 10
  const userId = req.query.userId as string
  const fileId = req.query.fileId as string

  try {
    const { db } = await connectToDatabase()
    const collection = db.collection('excel-data')

    const file = await collection.findOne({ userId, fileId })
    
    if (!file) {
      return res.status(404).json({ message: 'File not found' })
    }

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const paginatedData = file.data.slice(startIndex, endIndex)
    const totalRecords = file.data.length

    return res.status(200).json({
      data: paginatedData,
      columns: file.columns,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalRecords / limit),
        totalRecords,
      }
    })
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching data' })
  }
}
