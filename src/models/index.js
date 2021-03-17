// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Update, Client, MortgageRequest, RelocationAgent, Agent, Company } = initSchema(schema);

export {
  Update,
  Client,
  MortgageRequest,
  RelocationAgent,
  Agent,
  Company
};