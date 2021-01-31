import React, { useState } from 'react';
import { InputGroup, FormControl, Button, DropdownButton, Dropdown, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTasks } from '../../Store/task/taskActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';
import "react-datepicker/dist/react-datepicker.css";
import classes from './style.module.css';

const statusOptions = [
    {
        label: 'Unset',
        value: ''
    },
    {
        label: 'Active',
        value: 'active'
    },
    {
        label: 'Done',
        value: 'done'
    },
];

const sortOptions = [
    {
        label: 'Unset',
        value: ''
    },
    {
        label: 'A-Z',
        value: 'a-z'
    },
    {
        label: 'Z-A',
        value: 'z-a'
    },
    {
        label: 'Creation date oldest',
        value: 'creation_date_oldest'
    },
    {
        label: 'Creation date newest',
        value: 'creation_date_newest'
    },
    {
        label: 'Completion date oldest',
        value: 'completion_date_oldest'
    },
    {
        label: 'Completion date newest',
        value: 'completion_date_newest'
    }
];

const dateOptions = [
    {
        label: 'Create lte',
        value: 'create_lte'
    },
    {
        label: 'Create gte',
        value: 'create_gte'
    },
    {
        label: 'Complete lte',
        value: 'complete_lte'
    },
    {
        label: 'Complete gte',
        value: 'complete_gte'
    }

];

function Search(props) {

    const [dateSearch, setDateSerach] = useState(false);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState({
        label: '',
        value: ''
    });

    const [sort, setSort] = useState({
        label: '',
        value: ''
    });

    const [dates, setDates] = useState({
        create_lte: null,
        create_gte: null,
        complete_lte: null,
        complete_gte: null
    });


    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSubmit = () => {
        const searchData = {
            search,
            status: status.value,
            sort: sort.value
        };

        for (let key in dates) {
            let val = dates[key];
            if (val) {
                searchData[key] = val.toString().slice(0, 10);
            }
        }

        props.getTasks(searchData);
    };

    return (
        <>
            <div className={classes.serchContent}>
                <InputGroup className={`mb-3 ${classes.search}`}>
                    <FormControl
                        placeholder="Search for a task..."
                        aria-describedby="basic-addon2"
                        onChange={handleInputChange}
                        value={search}
                    />
                    <InputGroup.Append>
                        <Button
                            className="bg-aquaBlue"
                            onClick={handleSubmit}
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
                <InputGroup>
                    <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-primary"
                        title={status.value ? status.label : "Status"}
                    >
                        {
                            statusOptions.map((option, index) =>
                                <Dropdown.Item
                                    key={index}
                                    active={status.value === option.value}
                                    onClick={() => setStatus(option)}
                                >
                                    {option.label}
                                </Dropdown.Item>
                            )
                        }

                    </DropdownButton>


                    <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-primary"
                        title={sort.value ? sort.label : "Sort"}
                    >
                        {
                            sortOptions.map((option, index) =>
                                <Dropdown.Item
                                    key={index}
                                    active={sort.value === option.value}
                                    onClick={() => setSort({ ...option })}
                                >
                                    {option.label}
                                </Dropdown.Item>
                            )
                        }

                    </DropdownButton>
                    <Button variant='outline-primary' 
                        onClick={() => {
                            setDateSerach(!dateSearch);
                            setDates({
                                create_lte: null,
                                create_gte: null,
                                complete_lte: null,
                                complete_gte: null
                            });
                        }}>
                        <FontAwesomeIcon icon={faCalendar} />
                    </Button>
                </InputGroup>
            </div>
            {
                dateSearch ?
                <div className='mb-4 mt-4'>
                <Container>
                    <Row>
                        {
                            dateOptions.map(option =>
                                <Col
                                    key={option.value}
                                    className='mb-2 d-flex flex-column'
                                    lg={3}
                                    md={6}
                                    sm={12}
                                >
                                    <span className='ml-2' style={{color: '#59ACF9'}}>{option.label}</span>
                                    <input
                                        type='date'
                                        className={`ml-2 ${classes.searchDate}`}
                                        value={dates[option.value]}
                                        onChange={(e) => setDates({
                                            ...dates,
                                            [option.value]: e.target.value
                                        })}
                                    />

                                </Col>
                            )
                        }
                    </Row>
                </Container>

            </div>
            : null
            }

        </>
    )
}

const mapDispatchToProps = {
    getTasks
};

export default connect(null, mapDispatchToProps)(Search);