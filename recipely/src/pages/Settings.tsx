import { Button, Input, Typography, Row, Col, Divider } from "antd"
import Form from "antd/lib/form/Form"
import FormItem from "antd/lib/form/FormItem"
import { useHistory } from "react-router"
import Layout from "../components/Layout"

export default function Home() {
  const history = useHistory()

  function logout() {
    history.replace("/start")
  }

  return (
    <Layout>
      <Row>
        <Col style={{ width: 300 }}>
          <Typography.Title level={1}>Settings</Typography.Title>

          <Form>
            <FormItem name="profit">
              <Input placeholder="Store Name" />
            </FormItem>
            <FormItem name="profit">
              <Input placeholder="Global Profit" type="number" />
            </FormItem>
          </Form>

          <Button size="large" type="primary">
            Save
          </Button>

          <Divider />

          <Button size="large" type="dashed" onClick={logout} danger>
            Log out
          </Button>
        </Col>
      </Row>
    </Layout>
  )
}
