import React from 'react';
import {Card, CardHeader, 
  CardBody, Row, Col, Button, 
  Form, FormGroup, Label, Input} from 'reactstrap';

function NewRequest() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="card-plain">
                <CardHeader tag='h2'>New Request</CardHeader>
                <CardHeader>Please complete all fields to submit your request.</CardHeader>
                <CardBody>
                  <div
                    id="NewRequest"
                    className="NewRequest"
                    style={{ position: "relative", overflow: "hidden" }}
                  >
                    <Form>
                    <Row form>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="Name">First Name</Label>
                          <Input type="text" name="firstName" id="firstName" placeholder="First Name" required/>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="Name">Last Name</Label>
                          <Input type="text" name="lastName" id="lastName" placeholder="Last Name" required/>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Phone">Phone Number</Label>
                          <Input type="text" name="password" id="examplePassword" placeholder="Phone Number" maxLength="10" required/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="Email">Email</Label>
                            <Input type="email" name="email" id="Email" placeholder="Email" required/>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="CurrentAddress">Current Address</Label>
                            <Input type="text" name="address" id="CurrentAddress" placeholder="Current Address" required/>
                          </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleCity">City</Label>
                          <Input type="text" name="city" id="City" placeholder="City" required/>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="exampleState">State</Label>
                          <Input type="text" name="state" id="State" placeholder="State" maxLength="2" required/>
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <FormGroup>
                          <Label for="exampleZip">Zip</Label>
                          <Input type="text" name="zip" id="Zip" placeholder="Zip" maxLength="5" required/>
                        </FormGroup>  
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup> 
                          <Label for="NewAddress">New Location</Label>
                          <Input type="text" name="address2" id="NewAddress" placeholder="New Address" required/>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                  <FormGroup row>
                    <Label for="SelectCompany" sm={2}>Select companies to start a mortgage request with. More than one can be selected by holding the CTRL button.</Label>
                    <Col sm={10}>
                      <Input type="select" name="selectCompany" id="SelectCompany" multiple required>
                        <option>Chase</option>
                        <option>PNC Bank</option>
                        <option>Quicken Loans</option>
                        <option>Rocket Mortgage</option>
                        <option>USAA</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <Button color="warning" href='/'>Back</Button>{' '}
                  <Button onClick={()=>alert('Your request has been submitted') } color="warning" href='/'>Submit</Button>
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