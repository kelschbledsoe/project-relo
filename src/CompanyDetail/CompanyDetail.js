import React from "react";

import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    CardTitle,
    Table,
    CardFooter,
    Button,
  } from "reactstrap";

function CompanyDetail(){
    return(
        <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader tag='h2'>
                  
                  Company Detail (Under Development)
                </CardHeader>
                <CardBody>
                  <Form>
  
                    
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label>Company</label>
                          <Input
                            placeholder="Quicken Loans"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label>Email Address</label>
                          <Input
                            placeholder="relocation@quickenloans.com"
                            type="email"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col md="6">
                        <FormGroup>
                          <label>Request Method</label>
                          <Input
                            placeholder="Email"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                
              </Card>
            </Col>
          </Row>

          <Row>
          <Col lg="12" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Updates</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" bordered>
                  <thead className="text-primary">
                    <tr>
                      <th>Detail</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      
                      <td>Company will accept client if request submitted</td>
                      <td>2/2/2021</td>
                    </tr>
                    <tr>
                      <td>Company has contacted client</td>
                      <td>2/1/2021</td>
                    </tr>
                    <tr>
                      <td>Company has received request.</td>
                      <td>1/30/2021</td>
                    </tr>
                    
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Updates</CardTitle>
              </CardHeader>
              <CardBody>
                  <CardFooter>
                    <Button className="btn-fill" color="warning" type="submit">
                      Add New Message
                      </Button>
                    

                  </CardFooter>
              </CardBody>
            </Card>
          </Col>
        </Row>
        </div>
      </>
    );
}

export default CompanyDetail;