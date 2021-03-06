import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EvergreenNavbar from './EvergreenNavbar';
import { Link } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import { set } from 'mongoose';
import { newQuestion } from '../util/question';
import questions from '../evergreen_data/questions';

const Signup = () => {
    const [showToast, setShowToast] = useState(false);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [url, setURL] = useState('');
    const [isMarkdownDescription, setIsMarkdownDescription] = useState(false);
    const [description, setDescription] = useState('');
    const [isMarkdownSolution, setIsMarkdownSolution] = useState(false);
    const [solution, setSolution] = useState('');
    const [isMarkdownNotes, setIsMarkdownNotes] = useState(false);
    const [notes, setNotes] = useState('');

    const handleChange = ({ target }) => {
        const { name, value } = target;
        let booleanValue;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'url':
                setURL(value);
                break;
            case 'isMarkdownDescription':
                booleanValue = value === 'true';
                setIsMarkdownDescription(!booleanValue);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'isMarkdownSolution':
                booleanValue = value === 'true';
                setIsMarkdownSolution(!booleanValue);
                break;
            case 'solution':
                setSolution(value);
                break;
            case 'isMarkdownNotes':
                booleanValue = value === 'true';
                setIsMarkdownNotes(!booleanValue);
                break;
            case 'notes':
                setNotes(value);
                break;
        }
    };

    const handleSubmit = async () => {
        const question = {
            title,
            category,
            url,
            isMarkdownDescription,
            description,
            isMarkdownSolution,
            solution,
            isMarkdownNotes,
            notes,
        };
        try {
            const newQuestions = await newQuestion(question);
            console.log(newQuestion);
            setTitle('');
            setCategory('');
            setURL('');
            setIsMarkdownDescription(false);
            setDescription('');
            setIsMarkdownSolution(false);
            setSolution('');
            setIsMarkdownNotes(false);
            setNotes('');
        } catch (err) {}
    };

    return (
        <div>
            <EvergreenNavbar />
            <Container>
                <Row>
                    <Col>
                        <Form
                            className="Form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                                return false;
                            }}
                        >
                            <div className="page-header">
                                <h1>Add A Question</h1>
                            </div>

                            <Form.Group controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    name="title"
                                    value={title}
                                    onChange={handleChange}
                                    type="input"
                                    placeholder="Title"
                                />
                            </Form.Group>

                            <Form.Group controlId="formCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    name="category"
                                    value={category}
                                    onChange={handleChange}
                                    type="input"
                                    placeholder="Category"
                                />
                            </Form.Group>

                            <Form.Group controlId="formURL">
                                <Form.Label>URL</Form.Label>
                                <Form.Control
                                    name="url"
                                    value={url}
                                    onChange={handleChange}
                                    type="input"
                                    placeholder="URL"
                                />
                            </Form.Group>

                            <Form.Check
                                name="isMarkdownDescription"
                                value={isMarkdownDescription}
                                onChange={handleChange}
                                type="switch"
                                id="is-markdown-description"
                                label="Render Text As MarkDown"
                            />

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    name="description"
                                    value={description}
                                    onChange={handleChange}
                                    className="Textbox-control"
                                    as="textarea"
                                    rows="3"
                                />
                            </Form.Group>

                            <Form.Check
                                name="isMarkdownSolution"
                                value={isMarkdownSolution}
                                onChange={handleChange}
                                type="switch"
                                id="is-markdown-solution"
                                label="Render Text As MarkDown"
                            />

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Solution</Form.Label>
                                <Form.Control
                                    name="solution"
                                    value={solution}
                                    onChange={handleChange}
                                    className="Textbox-control"
                                    as="textarea"
                                    rows="3"
                                />
                            </Form.Group>

                            <Form.Check
                                name="isMarkdownNotes"
                                value={isMarkdownNotes}
                                onChange={handleChange}
                                type="switch"
                                id="is-markdown-notes"
                                label="Render Text As MarkDown"
                            />

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Notes</Form.Label>
                                <Form.Control
                                    name="notes"
                                    value={notes}
                                    onChange={handleChange}
                                    className="Textbox-control"
                                    as="textarea"
                                    rows="3"
                                />
                            </Form.Group>

                            <Button
                                className="btn btn-success"
                                variant="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Signup;
