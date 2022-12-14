import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { login, clearError } from "../../action/usersAction";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  // Application
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const Alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const { authenticatedUser, loading, error } = useSelector(
    (state) => state.auth
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (authenticatedUser) {
      navigate(redirect);
    }

    if (error) {
      if (error === "Login first to access this page") {
        return;
      }
      Alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, Alert, authenticatedUser, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />
          <div className="login-screen">
            <Row className="d-flex justify-content-center align-items-center">
              <Col md={8} lg={6} xs={12}>
                <Card>
                  <Card.Header className="bg-primary text-white text-center">
                    Masuk TOSERBA
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Masukan Email kamu"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <Row>
                        <Col>
                          <div className="text-center my-2 d-grid gap-2">
                            <Button type="submit" className="btn btn-login">
                              Login
                            </Button>
                          </div>
                        </Col>
                        <Col>
                          <Link to="/daftar" className="register">
                            <div className="text-center my-2 d-grid gap-2">
                              <Button type="button" className="btn btn-login">
                                Daftar
                              </Button>
                            </div>
                          </Link>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Link to="/forgot">
                            <div className="btn-forgot text-end">
                              <Button className="btn btn-light" type="button">
                                Lupa Password
                              </Button>
                            </div>
                          </Link>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Login;
