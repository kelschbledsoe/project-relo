/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUpdate = /* GraphQL */ `
  mutation CreateUpdate(
    $input: CreateUpdateInput!
    $condition: ModelUpdateConditionInput
  ) {
    createUpdate(input: $input, condition: $condition) {
      id
      detai
      date
      updateId
      mortgagerequestID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateUpdate = /* GraphQL */ `
  mutation UpdateUpdate(
    $input: UpdateUpdateInput!
    $condition: ModelUpdateConditionInput
  ) {
    updateUpdate(input: $input, condition: $condition) {
      id
      detai
      date
      updateId
      mortgagerequestID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteUpdate = /* GraphQL */ `
  mutation DeleteUpdate(
    $input: DeleteUpdateInput!
    $condition: ModelUpdateConditionInput
  ) {
    deleteUpdate(input: $input, condition: $condition) {
      id
      detai
      date
      updateId
      mortgagerequestID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createClient = /* GraphQL */ `
  mutation CreateClient(
    $input: CreateClientInput!
    $condition: ModelClientConditionInput
  ) {
    createClient(input: $input, condition: $condition) {
      id
      firstName
      lastName
      clientId
      agentId
      phone
      email
      curAddress
      curCity
      curState
      curZip
      newLocation
      status
      agentID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      MortgageRequests {
        nextToken
        startedAt
      }
    }
  }
`;
export const updateClient = /* GraphQL */ `
  mutation UpdateClient(
    $input: UpdateClientInput!
    $condition: ModelClientConditionInput
  ) {
    updateClient(input: $input, condition: $condition) {
      id
      firstName
      lastName
      clientId
      agentId
      phone
      email
      curAddress
      curCity
      curState
      curZip
      newLocation
      status
      agentID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      MortgageRequests {
        nextToken
        startedAt
      }
    }
  }
`;
export const deleteClient = /* GraphQL */ `
  mutation DeleteClient(
    $input: DeleteClientInput!
    $condition: ModelClientConditionInput
  ) {
    deleteClient(input: $input, condition: $condition) {
      id
      firstName
      lastName
      clientId
      agentId
      phone
      email
      curAddress
      curCity
      curState
      curZip
      newLocation
      status
      agentID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      MortgageRequests {
        nextToken
        startedAt
      }
    }
  }
`;
export const createRelocationAgent = /* GraphQL */ `
  mutation CreateRelocationAgent(
    $input: CreateRelocationAgentInput!
    $condition: ModelRelocationAgentConditionInput
  ) {
    createRelocationAgent(input: $input, condition: $condition) {
      id
      agentName
      relocationId
      companyId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateRelocationAgent = /* GraphQL */ `
  mutation UpdateRelocationAgent(
    $input: UpdateRelocationAgentInput!
    $condition: ModelRelocationAgentConditionInput
  ) {
    updateRelocationAgent(input: $input, condition: $condition) {
      id
      agentName
      relocationId
      companyId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteRelocationAgent = /* GraphQL */ `
  mutation DeleteRelocationAgent(
    $input: DeleteRelocationAgentInput!
    $condition: ModelRelocationAgentConditionInput
  ) {
    deleteRelocationAgent(input: $input, condition: $condition) {
      id
      agentName
      relocationId
      companyId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createAgent = /* GraphQL */ `
  mutation CreateAgent(
    $input: CreateAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    createAgent(input: $input, condition: $condition) {
      id
      firstName
      lastName
      companyName
      email
      status
      agentId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Clients {
        nextToken
        startedAt
      }
    }
  }
`;
export const updateAgent = /* GraphQL */ `
  mutation UpdateAgent(
    $input: UpdateAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    updateAgent(input: $input, condition: $condition) {
      id
      firstName
      lastName
      companyName
      email
      status
      agentId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Clients {
        nextToken
        startedAt
      }
    }
  }
`;
export const deleteAgent = /* GraphQL */ `
  mutation DeleteAgent(
    $input: DeleteAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    deleteAgent(input: $input, condition: $condition) {
      id
      firstName
      lastName
      companyName
      email
      status
      agentId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Clients {
        nextToken
        startedAt
      }
    }
  }
`;
export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
      id
      name
      email
      requestMethod
      companyId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
      id
      name
      email
      requestMethod
      companyId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
      id
      name
      email
      requestMethod
      companyId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createMortgageRequest = /* GraphQL */ `
  mutation CreateMortgageRequest(
    $input: CreateMortgageRequestInput!
    $condition: ModelMortgageRequestConditionInput
  ) {
    createMortgageRequest(input: $input, condition: $condition) {
      id
      status
      relocationId
      mortgageId
      clientId
      agentId
      clientID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Updates {
        nextToken
        startedAt
      }
    }
  }
`;
export const updateMortgageRequest = /* GraphQL */ `
  mutation UpdateMortgageRequest(
    $input: UpdateMortgageRequestInput!
    $condition: ModelMortgageRequestConditionInput
  ) {
    updateMortgageRequest(input: $input, condition: $condition) {
      id
      status
      relocationId
      mortgageId
      clientId
      agentId
      clientID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Updates {
        nextToken
        startedAt
      }
    }
  }
`;
export const deleteMortgageRequest = /* GraphQL */ `
  mutation DeleteMortgageRequest(
    $input: DeleteMortgageRequestInput!
    $condition: ModelMortgageRequestConditionInput
  ) {
    deleteMortgageRequest(input: $input, condition: $condition) {
      id
      status
      relocationId
      mortgageId
      clientId
      agentId
      clientID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Updates {
        nextToken
        startedAt
      }
    }
  }
`;
