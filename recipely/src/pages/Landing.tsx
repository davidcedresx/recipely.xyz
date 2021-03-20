import { Button, Col, Row, Typography } from "antd"
import { Link } from "react-router-dom"
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
      <Row justify="space-between" align="middle">
        <Col>
          <Link to="/">
            <img src={LogoUrl} alt="biscuits" width={64} />
          </Link>
        </Col>
        <Col>
          <Button size="large" type="link">
            About
          </Button>
          <Button size="large" type="link">
            Product
          </Button>
          <Button size="large" type="primary">
            <Link to="/start">Start</Link>
          </Button>
        </Col>
      </Row>
    </NavbarStyles>
  )
}

const HeaderStyles = styled.div`
  padding-top: 10rem;

  h1 {
    font-size: 4rem;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: lighter;
    margin-bottom: 2rem;
  }
`

function Header() {
  return (
    <HeaderStyles>
      <Typography.Title>Recipely</Typography.Title>
      <Typography.Title level={4}>
        Managament software for the home cook
      </Typography.Title>

      <Button size="large" type="primary">
        Learn More
      </Button>
    </HeaderStyles>
  )
}

export default function Landing() {
  return (
    <>
      <Row justify="center">
        <Col xs={20} sm={16} lg={10}>
          <Navbar />
          <Header />
        </Col>
      </Row>
    </>
  )
}
