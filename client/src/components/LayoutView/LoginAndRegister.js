import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom'


function LoginAndRegister() {

    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    
    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRetype, setPasswordRetype] = useState('')

    const showSignUp = () => {
        setShow1(false);
        setShow2(true);
    }

    const showLogin = () => {
        setShow2(false);
        setShow1(true);
    }

    const handleSubmitSignUp = async (e) => {
      e.preventDefault();
      console.log(email, password);
    }

    const handleSubmitLogin = async (e) => {
      e.preventDefault();
      console.log(username, password);
    }


    return (
      <>
        <Link to="" onClick={handleShow1} className="nav-link active">
          Login
        </Link>
  
        <Modal show={show1} onHide={handleClose1} centered>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmitLogin}>
              Login
            </Button>
            <Button variant="secondary" onClick={showSignUp}>
              Sign Up
            </Button>
          </Modal.Footer>
        </Modal>


        <Modal show={show2} onHide={handleClose2} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create an Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                <Form.Label>Re-type Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPasswordRetype(e.target.value)}
                  value={passwordRetype}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmitSignUp}>
              Create
            </Button>
            <Button variant="secondary" onClick={showLogin}>
              Login to existing account
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default LoginAndRegister