import { Layout, Menu, Breadcrumb, Col, Row } from "antd"
import { useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"

const { Header, Content, Footer } = Layout

const LayoutStyles = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: columns;

  .site-layout-content {
    min-height: 280px;
    padding: 24px;
    background: #fff;
  }
`

export default function CustomLayout(props: { children: React.ReactNode }) {
  const location = useLocation()

  const prettyName = useMemo(
    () =>
      location.pathname.substring(1).charAt(0).toUpperCase() +
      location.pathname.substring(1).slice(1),
    [location]
  )

  return (
    <LayoutStyles>
      <Layout className="layout">
        <Header>
          <Row justify="space-between">
            <Col>
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname.substr(1)]}
              >
                <Menu.Item key="home">
                  <Link to="/home">Home</Link>
                </Menu.Item>
                <Menu.Item key="recipes" active>
                  <Link to="/recipes">Recipes</Link>
                </Menu.Item>
                <Menu.Item key="ingredients">
                  <Link to="/ingredients">Ingredients</Link>
                </Menu.Item>
                <Menu.Item key="utensils">
                  <Link to="/utensils">Utensils</Link>
                </Menu.Item>
              </Menu>
            </Col>
            <Col>
              <Menu theme="dark" mode="horizontal">
                <Menu.Item>
                  <Link to="/settings">Settings</Link>
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/home">davidcedresx</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{prettyName}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">{props.children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Made by <strong>David Cedres</strong>
        </Footer>
      </Layout>
    </LayoutStyles>
  )
}
