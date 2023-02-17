import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert"
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import { useLogin } from "../../hooks/useLogin";

function LoginAndRegister() {
  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  
  const {signup, errorSignup, isLoadingSignup} = useSignup();
  const {login, errorLogin, isLoadingLogin} = useLogin();

  const showSignUp = () => {
    setShow1(false);
    setShow2(true);
  };

  const showLogin = () => {
    setShow2(false);
    setShow1(true);
  };
  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    setPasswordNotMatch(false)

    if (password !== passwordRetype) {
      setPasswordNotMatch(true)
    } else { 
      await signup(email, username, password);
    }
    //console.log(email, username, password, passwordRetype);

    //TODO: close modal when successful
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    await login(username, password)

    //console.log(username, password);
  };

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
          <Button 
          variant="primary" 
          onClick={handleSubmitLogin}
          disabled={isLoadingLogin}>
            Login
          </Button>
          <Button variant="secondary" onClick={showSignUp}>
            Sign Up
          </Button>
        </Modal.Footer>
        {errorLogin && 
          <Alert variant="danger" style={{marginBottom: 0}}>
            {errorLogin}
        </Alert>}
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
          <Button
            variant="primary"
            onClick={handleSubmitSignUp}
            disabled={isLoadingSignup}
          >
            Create
          </Button>
          <Button variant="secondary" onClick={showLogin}>
            Login to existing account
          </Button>
        </Modal.Footer>
        {errorSignup && 
          <Alert variant="danger" style={{marginBottom: 0}}>
            {errorSignup}
        </Alert>}

         {passwordNotMatch && 
          <Alert variant="danger" style={{marginBottom: 0}}>
            {"Passwords do not match"}
        </Alert>} 

        
          

      </Modal>
    </>
  );
}

//test account
//email - test@outlook.ca
//username - testAccount3
//pw - test@ccounT3

export default LoginAndRegister;
