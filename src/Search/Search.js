import React ,{ useState } from 'react';
import { Table, Button, Navbar, Container, 
  Nav, Form, FormGroup, Input, Card, 
  CardHeader, Row, Col, CardBody } from 'reactstrap';


  
function Search(){
  const [rSelected, setRSelected] = useState(null);
  const [cSelected, setCSelected] = useState(null);

    return(
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Admin Search Section (Under Development)</h5>
                  <Navbar expand="lg">
                    <Container>
                      <Nav className="justify-content-left">
                        <label>
                          <h5 className="title">Search by:</h5>
                        </label>
                        <Col className="ml-auto">
                          <Button color="warning" onClick={() => setRSelected("Name")} active={rSelected === 'Name'}>Name</Button>
                        </Col>
                        <Col className="ml-auto">
                          <Button color="warning" onClick={() => setRSelected("ID")} active={rSelected === 'ID'}>ID</Button>
                        </Col>
                        <label>
                          <h5 className="title">Search for:</h5>
                        </label>
                        <Col className="ml-auto">
                          <Button color="warning" onClick={() => setCSelected("Company")} active={cSelected === 'Company'}>Company</Button>
                        </Col>
                        <Col className="ml-auto">
                          <Button color="warning" onClick={() => setCSelected("Agent")} active={cSelected === 'Agent'}>Agent</Button>
                        </Col>
                        <Col>
                          <Form inline className="ml-auto" size="lg">
                            <FormGroup className="no-border">
                              <Input type="text" placeholder="Search"/>
                            </FormGroup>
                          </Form>
                        </Col>
                        <Col>
                          <Button color="warning">Submit</Button>
                        </Col>
                      </Nav>
                    </Container>
                  </Navbar>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        <CardBody>
          <h3>Relocation Agent Results</h3>
          <Table bordered>
            <thead>
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">First Name</th>
                <th className="text-center">Last Name</th>
                <th className="text-center">Company</th>
                <th className="text-center">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                  <td className="text-center">1</td>
                  <td className="text-center">Andrew</td>
                  <td className="text-center">Mike</td>
                  <td className="text-center">Quicken Loans</td>
                  <td className="text-center">andrew.mike@quickenloans.com</td>
              </tr>
              <tr>
                  <td className="text-center">2</td>
                  <td className="text-center">Manuel</td>
                  <td className="text-center">Rico</td>
                  <td className="text-center">Chase</td>
                  <td className="text-center">manuel.rico@chase.com</td>
              </tr>
              <tr>
                  <td className="text-center">3</td>
                  <td className="text-center">Jane</td>
                  <td className="text-center">Smith</td>
                  <td className="text-center">MSUFCU</td>
                  <td className="text-center">jane.smith@msufcu.com</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
        <CardBody>
          <h3>Mortgage Company Results</h3>
          <Table bordered>
            <thead>
              <tr>
                <th className="text-center">Name</th>
                <th className="text-center">Email</th>
                <th className="text-center">Method</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                  <td className="text-center">PNC</td>
                  <td className="text-center">mortgages@pnc.com</td>
                  <td className="text-center">API</td>
              </tr>
              <tr>
                  <td className="text-center">JPMorgan</td>
                  <td className="text-center">mortgagerequest@jpmorgan.com</td>
                  <td className="text-center">Email</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </div>
        
    );
}

export default Search;