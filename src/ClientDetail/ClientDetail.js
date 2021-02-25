import React from "react";

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
    CardTitle,
    Table,
    Label
  } from "reactstrap";

function ClientDetail(){
    return (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader tag='h2'>
                    Client Detail
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="pr-md-1" md="5">
                          <FormGroup>
                            <label>First Name</label>
                            <Input
                              placeholder="John"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="5">
                          <FormGroup>
                            <label>Last Name</label>
                            <Input
                              placeholder="Price"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md='2'>
                          <FormGroup>
                            <label>ID</label>
                            <Input
                              placeholder="31"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <FormGroup>
                            <label>Current Address</label>
                            <Input
                              placeholder="1050 Woodward Ave"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <FormGroup>
                            <Label for="City">City</Label>
                            <Input type="text" name="city" id="City" placeholder="Detroit" disabled/>
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <FormGroup>
                            <Label for="State">State</Label>
                            <Input type="text" name="state" id="State" placeholder="MI" maxLength="2" disabled/>
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <FormGroup>
                            <Label for="Zip">Zip</Label>
                            <Input type="text" name="zip" id="Zip" placeholder="48226" maxLength="5" disabled/>
                          </FormGroup>  
                        </Col>
                        <Col md={2}>
                          <FormGroup>
                            <Label for="requestDate">Request Made</Label>
                            <Input type="text" name="date" id="date" placeholder="1/23/2021" disabled/>
                          </FormGroup> 
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <FormGroup>
                            <label>Email Address</label>
                            <Input
                              placeholder="john_price@quickenloans.com"
                              type="email"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                              <label>Phone Number</label>
                              <Input
                                placeholder="(248)563-4459"
                                type="text"
                                disabled
                              />
                          </FormGroup>
                        </Col>
                        <Col md='4'>
                          <FormGroup>
                              <label>New Location</label>
                              <Input
                                placeholder="Dallas, TX"
                                type="text"
                                disabled
                              />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button href='/' className="btn-fill" color="warning" type="submit">
                      Leave
                    </Button>
                    {' '}
                    <Button className="btn-fill" color="warning" type="submit">
                      Mark as Complete
                      </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
        <Row>
          <Col lg="12" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Company Requests</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" bordered>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>12</td>
                      <td>Quicken Loans</td>
                      <td>Ready</td>
                      <td>
                      <Button onClick={()=>alert('You clicked on Detail')} color="warning">Detail</Button>
                      {' '}
                      <Button onClick={()=>alert('You have selected this as your final company')} color="warning">Select as final company</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>Bank of America</td>
                      <td>In Progress</td>
                      <td>
                      <Button onClick={()=>alert('You clicked on Detail')} color="warning">Detail</Button>
                      {' '}
                      <Button onClick={()=>alert('You have selected this as your final company')} color="warning">Select as final company</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>Chase</td>
                      <td>In Progress</td>
                      <td>
                      <Button onClick={()=>alert('You clicked on Detail')} color="warning">Detail</Button>
                      {' '}
                      <Button onClick={()=>alert('You have selected this as your final company')} color="warning">Select as final company</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
          </div>
        </>
      );
}

export default ClientDetail;