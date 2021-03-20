import { Typography, Card, Row, Col } from "antd"
import Layout from "../components/Layout"

function CustomCard(props: { amount: number; title: string }) {
  return (
    <Card style={{ width: 300 }}>
      <Typography.Title level={4}>{props.title}</Typography.Title>
      <Typography.Title level={1}>{props.amount}</Typography.Title>
    </Card>
  )
}

function randomInt() {
  return Math.floor(Math.random() * 100)
}

export default function Home() {
  return (
    <Layout>
      <Typography.Title level={1}>Welcome</Typography.Title>

      <Row gutter={24}>
        <Col>
          <CustomCard title="Recipes" amount={randomInt()} />
        </Col>
        <Col>
          <CustomCard title="Ingredients" amount={randomInt()} />
        </Col>
        <Col>
          <CustomCard title="Utensils" amount={randomInt()} />
        </Col>
      </Row>
    </Layout>
  )
}
