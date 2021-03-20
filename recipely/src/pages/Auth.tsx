import { Button, Col, Input, Row, Typography, Form, message } from "antd"
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"
import * as Api from "../api"
import LogoUrl from "../assets/logo.svg"
import styled from "styled-components"

const NavbarStyles = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;

  button {
    margin-right: 2rem;
  }
`

function Navbar() {
  return (
    <NavbarStyles>
      <Row align="middle">
        <Col>
          <Link to="/">
            <img src={LogoUrl} alt="biscuits" width={64} />
          </Link>
        </Col>
      </Row>
    </NavbarStyles>
  )
}

const HeaderStyles = styled.div`
  padding-top: 5rem;

  h1 {
    font-size: 4rem;
    margin-right: 2rem;
  }
`

function LoginForm() {
  const history = useHistory()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function onSubmit() {
    try {
      const { token } = await Api.Auth.login(username, password)
      localStorage.setItem("token", token)
      history.push("/home")
    } catch (error) {
      console.log(error)
      message.error(error.message)
    }
  }

  return (
    <>
      <HeaderStyles>
        <Row justify="center">
          <Col flex="0">
            <Typography.Title>Login</Typography.Title>
            <Typography.Paragraph>
              Put your credentials below
            </Typography.Paragraph>

            <Form onFinish={onSubmit}>
              <Form.Item name="username">
                <Input
                  placeholder="username"
                  type="text"
                  size="large"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>

              <Form.Item name="password">
                <Input
                  placeholder="password"
                  type="password"
                  size="large"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button size="large" type="primary" htmlType="submit">
                  Enter
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </HeaderStyles>
    </>
  )
}

export default function Auth() {
  return (
    <>
      <Row justify="center">
        <Col xs={20} sm={16} lg={10}>
          <Navbar />
          <LoginForm />
        </Col>
      </Row>
    </>
  )
}
