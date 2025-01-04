import { Operation } from "@/types/excel";

const buildMongoFilter = (key: string, value: any, operation: Operation) => {
  const filters = {
    equals: { [`data.${key}`]: value },
    gt: { [`data.${key}`]: { $gt: value } },
    lt: { [`data.${key}`]: { $lt: value } },
    gte: { [`data.${key}`]: { $gte: value } },
    lte: { [`data.${key}`]: { $lte: value } },
    contains: { [`data.${key}`]: { $regex: value, $options: "i" } },
  };

  return filters[operation] || {};
};

export { buildMongoFilter };
