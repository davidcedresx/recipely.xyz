import { Button, Col, Input, Row, Typography, Form, message, Tabs } from "antd"
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"
import Api from "../api/client"
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

function CustomForm(props: { action: string; title: string }) {
  const history = useHistory()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function onSubmit() {
    try {
      const { token } = (await Api.post("/auth/" + props.action, {
        username,
        password
      })) as { token: string }

      localStorage.setItem("token", token)
      history.push("/home")
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <>
      <Row justify="center">
        <Col>
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
                required
              />
            </Form.Item>

            <Form.Item name="password">
              <Input
                placeholder="password"
                type="password"
                size="large"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Item>

            <Form.Item>
              <Button size="large" type="primary" htmlType="submit">
                {props.title}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default function Auth() {
  return (
    <>
      <Row justify="center">
        <Col xs={20} sm={16} lg={10}>
          <Navbar />
          <Row justify="center">
            <Col>
              <Tabs defaultActiveKey="login" size="large">
                <Tabs.TabPane tab="Login" key="login">
                  <CustomForm action="signin" title="Sign in" />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Register" key="register">
                  <CustomForm action="signup" title="Sign up" />
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}
