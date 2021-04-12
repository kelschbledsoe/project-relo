import React, { useReducer, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from './../graphql/mutations';
import { listCompanys } from './../graphql/queries';
import emailjs from 'emailjs-com';


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
    const models = await API.graphql(graphqlOperation(listCompanys))
    listofcompanys = models.data.listCompanys.items
    if(listofcompanys){
      setCompanys(listofcompanys);
    }
  }
  queryCompany()

  const [formData, setFormData] = useReducer(formReducer, {});
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
    // I know this isn't how this should work, but the backend team never gave me a way to pull a singluar entry
    // in a database, so I have to do it this way
    companys.map(function(company){
      if(String(formData.Company) === String(company.name)){
        companyId = company.companyId;
        return;
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

  //Setting Confirmation Statement for adding new request
  function confirmationTemplate(){
    // Data from the form fields
    const clientId = formData.ClientId;
    const agentId = formData.AgentId;
    const company = formData.Company;
    // Message displayed on pop-up
    var confirmationMessage = 'Please confirm all the information filled is correct.\nYou are submitting the following \n\n' + 
                              'Client ID: ' + clientId + '\n' + 
                              'Agent ID:: ' + agentId + '\n' + 
                              'Sending Request To: ' + company + '\n'
    return confirmationMessage;
  }

  //email functionality
  function emailSubmit (event) {
    //email template for new request
    const templateId = 'template_t03vez5';
    // info from form being sent
    const clientId = formData.ClientId;
    const agentId = formData.AgentId;
    const company = formData.Company;
    //call to send email with the employee info
    sendFeedback(templateId, {message: "We have a new relocation mortgage request", from_name: "Project Relo", clientId: clientId, agentId: agentId, company: company, reply_to: "jishwan2164@gmail.com"})
    }
  
  function sendFeedback (templateId, variables) {
    //send requires in order: service ID, template ID, variables, and user ID
    emailjs.send(
      'service_nwwf8mp', templateId,
      variables, "user_2LtqO9jdrkvzl5Bgazia8"
      ).then(res => {
        console.log('Email successfully sent!')
      })
      // Error message on console
      .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
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
                {/* Overall Form for the request */}
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
                  <Button onClick={() => { if (window.confirm(confirmationTemplate())){
                      companys.map(function(company)
                        {
                          if(String(company.name) === String(formData.Company)){
                            /* Create the request based on the company's method then exit the loop. */
                            if(String(company.requestMethod) === "API"){
                              makeRequest();
                              return;
                            }
                            else if(String(company.requestMethod) === "Email"){
                              emailSubmit(); 
                              makeRequest();
                              return;
                            }
                          }
                        })}}} className="btn-fill" color="warning" type="submit">
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