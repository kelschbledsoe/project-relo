import React, { useReducer, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from './../graphql/mutations';
import { listCompanys } from './../graphql/queries'

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

  const formReducer = (state, event) => {
    if(event.reset) {
      return {
        ClientId: '',
        AgentId: '',
        Company: '',
      }
    }
    return {
      ...state,
      [event.name]: event.value
    }
  }

function AdditionalRequest() {
  const [companys, setCompanys] = useState([])
  let listofcompanys;
  async function queryCompany(){
    /* make page take longer to load await new Promise(x=>setTimeout(x,10000)) */
    const models = await API.graphql(graphqlOperation(listCompanys))
    listofcompanys = models.data.listCompanys.items
    if(listofcompanys){
      setCompanys(listofcompanys);
    }
  }
  queryCompany()

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

  async function makeRequest(){
    let companyId;
    companys.map(function(company){
      if(!company.companyId){
        return;
      }
      if(String(formData.Company) === String(company.name)){
      companyId = company.companyId;
      }
    })
    const createMortgageRequest =
      {
        status: 1,
        clientId: formData.ClientId,
        agentId: formData.AgentId,
        companyId: companyId,
      }
      const newMortgageRequest = await API.graphql({ query: mutations.createMortgageRequest, variables:{input: createMortgageRequest}});

  }

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader tag='h2'>
                  Add Additional Mortgage Request
                </CardHeader>
                <CardHeader>Please complete all fields to submit your request.</CardHeader>
                <CardHeader>Enter your ID and the ID of the client you would like to make additional mortgage request for, then select the company you would like to send the request to.</CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Client ID</label>
                          <Input type="text" name="ClientId" id="ClientId" placeholder="Client ID" 
                          onChange={handleChange}
                          value={formData.ClientId || ''}
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>Agent ID</label>
                          <Input type="text" name="AgentId" id="AgentId" placeholder="Agent ID" 
                          onChange={handleChange}
                          value={formData.AgentId || ''}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup row>
                    <Label for="SelectCompany" sm={2}>Select one company to send a mortgage request to.</Label>
                    <Col sm={10}>
                    <Input type="select" name="Company" id="SelectCompany"
                      onChange={handleChange}
                      value={formData.Company || ''}>
                        <option></option>
                        {
                        companys.map(function(company)
                        {
                          if(!company.companyId){
                            return;
                          }
                          return(<option>{company.name}</option>)})}
                      </Input>
                    </Col>
                  </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button color="warning" href='/'>Back</Button>{' '}
                  <Button onClick={()=>makeRequest()} className="btn-fill" color="warning" type="submit" href='/'>
                    Submit
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
  
  export default AdditionalRequest;