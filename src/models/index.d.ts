import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Update {
  readonly id: string;
  readonly detai?: string;
  readonly date?: string;
  readonly updateId?: number;
  readonly mortgagerequestID?: string;
  constructor(init: ModelInit<Update>);
  static copyOf(source: Update, mutator: (draft: MutableModel<Update>) => MutableModel<Update> | void): Update;
}

export declare class Client {
  readonly id: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly clientId?: number;
  readonly agentId?: number;
  readonly phone?: string;
  readonly email?: string;
  readonly curAddress?: string;
  readonly curCity?: string;
  readonly curState?: string;
  readonly curZip?: number;
  readonly newLocation?: string;
  readonly status?: number;
  readonly MortgageRequests?: (MortgageRequest | null)[];
  readonly agentID?: string;
  constructor(init: ModelInit<Client>);
  static copyOf(source: Client, mutator: (draft: MutableModel<Client>) => MutableModel<Client> | void): Client;
}

export declare class MortgageRequest {
  readonly id: string;
  readonly status?: number;
  readonly relocationId?: string;
  readonly mortgageId?: string;
  readonly clientId?: string;
  readonly agentId?: string;
  readonly clientID?: string;
  readonly Updates?: (Update | null)[];
  constructor(init: ModelInit<MortgageRequest>);
  static copyOf(source: MortgageRequest, mutator: (draft: MutableModel<MortgageRequest>) => MutableModel<MortgageRequest> | void): MortgageRequest;
}

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
  readonly Clients?: (Client | null)[];
  readonly status?: number;
  readonly agentId?: number;
  constructor(init: ModelInit<Agent>);
  static copyOf(source: Agent, mutator: (draft: MutableModel<Agent>) => MutableModel<Agent> | void): Agent;
}

export declare class Company {
  readonly id: string;
  readonly name?: string;
  readonly email?: string;
  readonly requestMethod?: string;
  readonly companyId?: number;
  constructor(init: ModelInit<Company>);
  static copyOf(source: Company, mutator: (draft: MutableModel<Company>) => MutableModel<Company> | void): Company;
}