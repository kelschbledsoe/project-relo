import React, { useReducer, useState, Component } from 'react';
import {Card, CardHeader, 
  CardBody, Row, Col, Button, 
  Form, FormGroup, Label, Input} from 'reactstrap';
import emailjs from 'emailjs-com';




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
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
}


function NewRequest() {
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

      var confirmationMessage = 'Please confirm all the information filled is correct.\nYou are submitting the following \n\n' + 
                                'First Name: ' + firstName + '\n' + 
                                'Last Name: ' + lastName + '\n' + 
                                'Phone Number: ' + phone + '\n' +
                                'Email Address: ' + email + '\n' +
                                'Address: ' + address + ' ' + city + ', ' + state + zip + '\n' + 
                                'New Location: ' + newLocation + '\n' +
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
      //call to send email with the employee info
      sendFeedback(templateId, {message: "We have a new relocation mortgage request", from_name: "Project Relo", firstName: firstName, lastName: lastName, 
                                phone: phone, email: email, address: address, city: city, state: state, 
                                zip: zip, newLocation: newLocation, company: company, reply_to: "jishwan2164@gmail.com"})
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
                          <Label for="Phone">Phone Number</Label>
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
                          <Label for="NewAddress">New Location</Label>
                          <Input type="text" name="New" id="NewAddress" placeholder="New Location" 
                          onChange={handleChange}
                          value={formData.New || ''}
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
                        <option>Chase</option>
                        <option>PNC Bank</option>
                        <option>Quicken Loans</option>
                        <option>Rocket Mortgage</option>
                        <option>USAA</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <Button color="warning" href='/'>Back</Button>{' '}
                  <Button onClick={() => { if (window.confirm(confirmationTemplate())) emailSubmit() }} color="warning" type="submit">Submit</Button>
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