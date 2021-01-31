import React from 'react';
import Image from '../../Images/1.jpg';
import { Button, Row, Col, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function About() {
    return(
        <div className='content-min-height d-flex align-items-center justify-content-center flex-column'>
            <h1 className='pt-4 pb-3'>About Us</h1>
            <Container fluid={true}>
                <Row>
                    <Col md={6} sm={12} className='d-flex flex-column justify-content-center'>
                        <div className='mx-sm-4'>
                            <h1>
                                why do you need this application?
                            </h1>
                            <h6>
                            With this application you can organize your daily tasks. Add edit or delete easily with our user friendly interface. Save time and be more productive with  ToDo
                            </h6>
                            <Link to='/'>
                            <Button className='bg-aquaBlue mt-3 mb-3'>
                            Learn more
                            </Button>
                            </Link>
                        </div>
                    </Col>
                    <Col md={6} sm={12}>
                        <img src={Image} alt="" className='w-100 mb-3' />
                    </Col>
                </Row>
            </Container>
        </div>
    )
};
