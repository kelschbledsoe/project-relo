// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { RelocationAgent, Agent, Company, MortgageRequest } = initSchema(schema);

export {
  RelocationAgent,
  Agent,
  Company,
  MortgageRequest
};