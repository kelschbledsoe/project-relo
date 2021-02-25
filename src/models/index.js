// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Post, Authors } = initSchema(schema);

export {
  Post,
  Authors
};