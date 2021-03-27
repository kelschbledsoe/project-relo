import React, { useReducer, useState } from "react";
import { API, graphqlOperation } from 'aws-amplify';
import { Company } from './../models';
import { listCompanys } from './../graphql/queries';
import * as mutations from './../graphql/mutations';

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Label
  } from "reactstrap";

// State object logic
const formReducer = (state, event) => {
  if(event.reset) {
    return {
      Company: '',
      Email: '',
      Method: '',
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
}

function AddCompany() {
  
  //Setting Confirmation Statement for adding new company
  function confirmationTemplate(){
    const company = formData.Company;
    const email = formData.Email;
    const method = formData.Method;

    var confirmationMessage = 'Please confirm all the information filled is correct.\nYou are submitting the following \n\n' + 
                              'Company: ' + company + '\n' + 
                              'Email Address: ' + email + '\n' +
                              'Method of Receiving Request: ' + method;
    return confirmationMessage;
  }

  async function createCompany()
  {
      const createCompany = 
      {
        name: formData.Company,
        email: formData.Email,
        requestMethod: formData.Method,
        // Need to add a field here to create an ID b/c of how the back-end set up the mutation
      };

      const newCompany = await API.graphql({ query: mutations.createCompany, variables:{input: createCompany}});
  }

  async function queryCompany()
  {
    //const models = await DataStore.query(Agent);
    const models = await API.graphql(graphqlOperation(listCompanys))
    const listofCompanies = models.data.listCompanys.items
    console.log("Co.");
    console.log(listofCompanies);
  }

  const [formData, setFormData] = useReducer(formReducer, {});
  // This event is the Submit button behavior. Has a cool down period to let the API catch up then has a JS alert box.
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormData({
        reset: true
      })
    }, 3000)
  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader tag='h2'>
                  Add New Company
                </CardHeader>
                <CardHeader>Please complete all fields to submit your request.</CardHeader>
                {/* {submitting &&
                  <div>
                  You are submitting the following:
                  <ul>
                    {Object.entries(formData).map(([name, value]) => (
                      <li key={name}><strong>{name}</strong>:{value.toString()}</li>
                    ))}
                  </ul>
                </div>
                } */}
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>Company Name</label>
                          <Input
                            placeholder="Company Name"
                            type="text"
                            name="Company"
                            onChange={handleChange}
                            value={formData.Company || ''}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>Company Email</label>
                          <Input
                            placeholder="Company Email"
                            type="text"
                            name="Email"
                            onChange={handleChange}
                            value={formData.Email || ''}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup row>
                    <Label sm={2}>Select your request method:</Label>
                    <Col sm={10}>
                      <Input type="select" name="Method"
                      onChange={handleChange}
                      value={formData.Method || ''}>
                        <option></option>
                        <option>API</option>
                        <option>Email</option>
                      </Input>
                    </Col>
                  </FormGroup>
                    <CardFooter>
                      <Button color="warning" href='/'>Back</Button>{' '}
                      <Button className="btn-fill" color="warning" type="submit" onClick={() => { if (window.confirm(confirmationTemplate())) createCompany() }}>
                        Submit
                      </Button>
                    </CardFooter>
                  </Form>
                </CardBody>
                
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
  
  export default AddCompany;
  