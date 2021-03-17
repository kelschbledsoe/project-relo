/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUpdate = /* GraphQL */ `
  subscription OnCreateUpdate {
    onCreateUpdate {
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
export const onUpdateUpdate = /* GraphQL */ `
  subscription OnUpdateUpdate {
    onUpdateUpdate {
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
export const onDeleteUpdate = /* GraphQL */ `
  subscription OnDeleteUpdate {
    onDeleteUpdate {
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
export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient {
    onCreateClient {
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
export const onUpdateClient = /* GraphQL */ `
  subscription OnUpdateClient {
    onUpdateClient {
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
export const onDeleteClient = /* GraphQL */ `
  subscription OnDeleteClient {
    onDeleteClient {
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
export const onCreateRelocationAgent = /* GraphQL */ `
  subscription OnCreateRelocationAgent {
    onCreateRelocationAgent {
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
export const onUpdateRelocationAgent = /* GraphQL */ `
  subscription OnUpdateRelocationAgent {
    onUpdateRelocationAgent {
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
export const onDeleteRelocationAgent = /* GraphQL */ `
  subscription OnDeleteRelocationAgent {
    onDeleteRelocationAgent {
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
export const onCreateAgent = /* GraphQL */ `
  subscription OnCreateAgent {
    onCreateAgent {
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
export const onUpdateAgent = /* GraphQL */ `
  subscription OnUpdateAgent {
    onUpdateAgent {
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
export const onDeleteAgent = /* GraphQL */ `
  subscription OnDeleteAgent {
    onDeleteAgent {
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
export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany {
    onCreateCompany {
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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany {
    onUpdateCompany {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany {
    onDeleteCompany {
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
export const onCreateMortgageRequest = /* GraphQL */ `
  subscription OnCreateMortgageRequest {
    onCreateMortgageRequest {
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
export const onUpdateMortgageRequest = /* GraphQL */ `
  subscription OnUpdateMortgageRequest {
    onUpdateMortgageRequest {
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
export const onDeleteMortgageRequest = /* GraphQL */ `
  subscription OnDeleteMortgageRequest {
    onDeleteMortgageRequest {
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
