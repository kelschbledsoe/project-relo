// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Update, Client, RelocationAgent, Agent, Company, MortgageRequest } = initSchema(schema);

export {
  Update,
  Client,
  RelocationAgent,
  Agent,
  Company,
  MortgageRequest
};