/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
