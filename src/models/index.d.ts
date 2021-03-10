import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class RelocationAgent {
  readonly id: string;
  readonly agentName?: string;
  readonly relocationId?: string;
  readonly companyId?: string;
  constructor(init: ModelInit<RelocationAgent>);
  static copyOf(source: RelocationAgent, mutator: (draft: MutableModel<RelocationAgent>) => MutableModel<RelocationAgent> | void): RelocationAgent;
}

export declare class Agent {
  readonly id: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly companyName?: string;
  readonly email?: string;
  constructor(init: ModelInit<Agent>);
  static copyOf(source: Agent, mutator: (draft: MutableModel<Agent>) => MutableModel<Agent> | void): Agent;
}

export declare class Company {
  readonly id: string;
  readonly name?: string;
  readonly email?: string;
  constructor(init: ModelInit<Company>);
  static copyOf(source: Company, mutator: (draft: MutableModel<Company>) => MutableModel<Company> | void): Company;
}

export declare class MortgageRequest {
  readonly id: string;
  readonly status?: number;
  readonly relocationId?: string;
  readonly mortgageId?: string;
  constructor(init: ModelInit<MortgageRequest>);
  static copyOf(source: MortgageRequest, mutator: (draft: MutableModel<MortgageRequest>) => MutableModel<MortgageRequest> | void): MortgageRequest;
}