import React from "react";
import "./Home.css";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";



export default function Home(){ 
  
    return (
      <>
      <div className="content">
        <Row>
          <Col lg="12" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag='h1'>Welcome to Project Relo</CardTitle>
                <CardTitle tag="h4">Recent Clients</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" bordered>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Select for detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>12</td>
                      <td>Jackson</td>
                      <td>In Progress</td>
                      <td><Button href="/ClientDetail" color="warning">Detail</Button></td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>Price</td>
                      <td>In Progress</td>
                      <td><Button href="/ClientDetail" color="warning">Detail</Button></td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>Allen</td>
                      <td>In Progress</td>
                      <td><Button href="/ClientDetail" color="warning">Detail</Button></td>
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
                <CardTitle tag="h4">Recent Mortgage Requests</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" bordered>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Select for detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>23</td>
                      <td>Jackson</td>
                      <td>Quicken Loans</td>
                      <td>In Progress</td>
                      <td><Button href="/CompanyDetail" color="warning">Detail</Button></td>

                    </tr>
                    <tr>
                      <td>21</td>
                      <td>Jackson</td>
                      <td>Chase</td>
                      <td>In Progress</td>
                      <td><Button href="/CompanyDetail" color="warning">Detail</Button></td>

                    </tr>
                    <tr>
                      <td>20</td>
                      <td>Price</td>
                      <td>PNC Bank</td>
                      <td>In Progress</td>
                      <td><Button href="/CompanyDetail" color="warning">Detail</Button></td>

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

