import { collectionSchema } from './collection';
import { productSchema } from './product';
import { journalArticleSchema } from './journalArticle';
import { configuratorPartSchema } from './configuratorPart';
import { orderSchema } from './order';

export const schemas = [
  collectionSchema,
  productSchema,
  journalArticleSchema,
  configuratorPartSchema,
  orderSchema,
];
