import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const getArchive = async (req: NextApiRequest, res: NextApiResponse) => {
  // const { category, page } = req.query;
  const prisma = new PrismaClient();

  try {
    const result = await prisma.post.findMany({});
    await prisma.$disconnect();
    return res.status(200).json(result);
  } catch (e) {
    await prisma.$disconnect();
    return res.status(404);
  }
};

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return getArchive(req, res);
    case 'POST':
    case 'PUT':
    case 'DELETE':
      break;
    default:
      throw new Error();
  }
  return res.status(404);
};

export default handle;
