// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Agent } = initSchema(schema);

export {
  Agent
};