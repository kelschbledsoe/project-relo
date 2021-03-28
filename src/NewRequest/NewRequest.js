import React, { useReducer, useState, Component } from 'react';
import {Card, CardHeader, 
  CardBody, Row, Col, Button, 
  Form, FormGroup, Label, Input} from 'reactstrap';
import emailjs from 'emailjs-com';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from './../graphql/mutations';
import { listCompanys } from './../graphql/queries'


  // State object logic
const formReducer = (state, event) => {
  if(event.reset) {
    return {
      First: '',
      Last: '',
      Phone: '',
      Email: '',
      Address: '',
      City: '',
      State: '',
      Zip: '',
      New: '',
      Company: '',
      AgentId: '',
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
}


function NewRequest() {
  // Query list of companies to fill that part of new request
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
  // Create both the client and the mortgage request. Not sure if this should be split into two functions or not
  async function createRequest()
  {
    // First grab the company ID. I know this is the wrong way, but again, I don't have proper queries to work with
    let companyId;
    companys.map(function(company){
      if(!company.companyId){
        return;
      }
      if(String(formData.Company) === String(company.name)){
      companyId = company.companyId;
      }
    })
      const createClient = 
      {
        firstName: formData.First,
        lastName: formData.Last,
        // Need to add a field here to create an ID b/c of how the back-end set up the mutation
        agentId: formData.AgentId,
        phone: formData.Phone,
        email: formData.Email,
        curAddress: formData.Address,
        curCity: formData.City,
        curState: formData.State,
        curZip: formData.Zip,
        newLocation: formData.New,
        status: 1,
      };

      const newClient = await API.graphql({ query: mutations.createClient, variables:{input: createClient}});

      const createMortgageRequest =
      {
        // Again, I have no way of actually implementing website functionality because back-end didn't do this right
        // A mortgage request needs multiple ID fields and I have no way of getting any of them
        status: 1,
        companyId: companyId,
        agentId: formData.AgentId,
      }
      const newMortgageRequest = await API.graphql({ query: mutations.createMortgageRequest, variables:{input: createMortgageRequest}});

  }
  //Setting Confirmation Statement for adding new request
    function confirmationTemplate(){
      const firstName = formData.First;
      const lastName = formData.Last;
      const phone = formData.Phone;
      const email = formData.Email;
      const address = formData.Address;
      const city = formData.City;
      const state = formData.State;
      const zip = formData.Zip;
      const newLocation = formData.New;
      const company = formData.Company;
      const agentId = formData.AgentId;
      var confirmationMessage = 'Please confirm all the information filled is correct.\nYou are submitting the following \n\n' + 
                                'First Name: ' + firstName + '\n' + 
                                'Last Name: ' + lastName + '\n' + 
                                'Phone Number: ' + phone + '\n' +
                                'Email Address: ' + email + '\n' +
                                'Address: ' + address + ' ' + city + ', ' + state + zip + '\n' + 
                                'New Location: ' + newLocation + '\n' +
                                'Your Agent ID: ' + agentId + '\n' +
                                'Sending Request to: ' + company;
      return confirmationMessage;
    }
    

    //email functionality
    function emailSubmit (event) {
      //email template for new request
      const templateId = 'template_gqywhbk';
      // info from form being sent
      const firstName = formData.First;
      const lastName = formData.Last;
      const phone = formData.Phone;
      const email = formData.Email;
      const address = formData.Address;
      const city = formData.City;
      const state = formData.State;
      const zip = formData.Zip;
      const newLocation = formData.New;
      const company = formData.Company;
      const agentId = formData.AgentId;
      //call to send email with the employee info
      sendFeedback(templateId, {message: "We have a new relocation mortgage request", from_name: "Project Relo", firstName: firstName, lastName: lastName, 
                                phone: phone, email: email, address: address, city: city, state: state, 
                                zip: zip, newLocation: newLocation, agentId: agentId, company: company, reply_to: "jishwan2164@gmail.com"})
      }
    
    function sendFeedback (templateId, variables) {
      //send requires service ID, template ID, variables, and user ID
      emailjs.send(
        'service_nwwf8mp', templateId,
        variables, "user_2LtqO9jdrkvzl5Bgazia8"
        ).then(res => {
          console.log('Email successfully sent!')
        })
        // Handle errors here however you like, or use a React error boundary
        .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
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
              <Card className="card-plain">
                <CardHeader tag='h2'>New Request</CardHeader>
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
                  <div
                    id="NewRequest"
                    className="NewRequest"
                    style={{ position: "relative", overflow: "hidden" }}
                  >
                  <Form onSubmit={handleSubmit}>
                    <Row form>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="Name">First Name</Label>
                          <Input type="text" name="First" id="firstName" placeholder="First Name" 
                          onChange={handleChange}
                          value={formData.First || ''}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="Name">Last Name</Label>
                          <Input type="text" name="Last" id="lastName" placeholder="Last Name" 
                          onChange={handleChange}
                          value={formData.Last || ''}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Phone">Phone Number (Only digits. No hyphens or other characters.)</Label>
                          <Input type="text" name="Phone" id="examplePassword" placeholder="Phone Number" maxLength="10" 
                          onChange={handleChange}
                          value={formData.Phone || ''}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="Email">Email</Label>
                            <Input type="email" name="Email" id="Email" placeholder="Email" 
                            onChange={handleChange}
                            value={formData.Email || ''}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="CurrentAddress">Current Address</Label>
                            <Input type="text" name="Address" id="CurrentAddress" placeholder="Current Address" 
                            onChange={handleChange}
                            value={formData.Address || ''}
                            />
                          </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleCity">City</Label>
                          <Input type="text" name="City" id="City" placeholder="City" 
                          onChange={handleChange}
                          value={formData.City || ''}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="exampleState">State Initials</Label>
                          <Input type="text" name="State" id="State" placeholder="State" maxLength="2" 
                          onChange={handleChange}
                          value={formData.State || ''}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <FormGroup>
                          <Label for="exampleZip">Zip</Label>
                          <Input type="text" name="Zip" id="Zip" placeholder="Zip" maxLength="5" 
                          onChange={handleChange}
                          value={formData.Zip || ''}
                          />
                        </FormGroup>  
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup> 
                          <Label for="NewAddress">New Location (City, State)</Label>
                          <Input type="text" name="New" id="NewAddress" placeholder="New Location" 
                          onChange={handleChange}
                          value={formData.New || ''}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup> 
                          <Label for="AgentId">Your Agent ID</Label>
                          <Input type="text" name="AgentId" id="AgentId" placeholder="Your Agent ID" 
                          onChange={handleChange}
                          value={formData.AgentId || ''}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup row>
                    <Label for="SelectCompany" sm={2}>Select one company to start a mortgage request with. More can be created later.</Label>
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
                  <Button color="warning" href='/'>Back</Button>{' '}
                  <Button onClick={() => { if (window.confirm(confirmationTemplate())) emailSubmit(); createRequest()}} color="warning" type="submit">Submit</Button>
                  </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        
      </>
    );
  }

export default NewRequest;