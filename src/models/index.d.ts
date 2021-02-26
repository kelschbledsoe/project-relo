import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Agent {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly companyName: string;
  readonly email: string;
  constructor(init: ModelInit<Agent>);
  static copyOf(source: Agent, mutator: (draft: MutableModel<Agent>) => MutableModel<Agent> | void): Agent;
}