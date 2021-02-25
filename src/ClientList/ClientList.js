import React, { useState } from 'react';
import { Table, Button, Navbar, Container, Nav, 
  Form, FormGroup, Input, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';


function ClientList(){

  
  const [rSelected, setRSelected] = useState(null);
  
    
  
    return(
        <div className="content">
            <Row>
              <Col lg="12" md="12">
                <Card>
                  <CardHeader tag='h2'>
                    Client List Search 
                    <Navbar expand="lg" color="pink">
                      <Container>
                        <Nav className="justify-content-left">
                          <Col className="ml-auto">
                            <Form inline className="ml-auto">
                              
                              <FormGroup className="no-border">
                                  <Input type="text" placeholder="Search"/>
                              </FormGroup>
                            </Form>
                          </Col>
                          <h3 className="title">Select one: </h3>
                          <Col className="ml-auto">
                            <Button color="warning" onClick={() => setRSelected("Name")} active={rSelected === 'Name'}>Name</Button>
                          </Col>
                          <Col className="ml-auto">
                            <Button color="warning" onClick={() => setRSelected("ID")} active={rSelected === 'ID'}>ID</Button>
                          </Col>
                          <Col><Button color="warning">Submit</Button></Col>
                          
                        </Nav>
                      </Container>
                    </Navbar>
                  </CardHeader>
                </Card>
              </Col>
            </Row>
          <CardBody>
            <h3>Client Results</h3>
            <Table bordered size="sm" responsive>
              <thead >
                <tr>
                  <th className="text-center">Request ID</th>
                  <th className="text-center">Last Name</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Created</th>
                  <th className="text-center" width="10%">Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td className="text-center">11</td>
                    <td className="text-center">Price</td>
                    <td className="text-center">In Progress</td>
                    <td className="text-center">1/2/21</td>
                    <td className="text-center"><Button href="/ClientDetail" color="warning">Detail</Button></td>
                </tr>
                <tr>
                    <td className="text-center">5</td>
                    <td className="text-center">Price</td>
                    <td className="text-center">Ready to Select</td>
                    <td className="text-center">12/23/20</td>
                    <td className="text-center"><Button href="/ClientDetail" color="warning">Detail</Button></td>
                </tr>
                <tr>
                    <td className="text-center">3</td>
                    <td className="text-center">Price</td>
                    <td className="text-center">Completed</td>
                    <td className="text-center">6/3/19</td>
                    <td className="text-center"><Button href="/ClientDetail" color="warning">Detail</Button></td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
          
        </div>
        
    );
}

export default ClientList;