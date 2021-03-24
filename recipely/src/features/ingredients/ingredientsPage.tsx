/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react"
import { Typography, Table, Tag, Space, Row, Col, Button } from "antd"
import { Layout, NewIngredient } from "../../components"

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <a>{text}</a>
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (tags: [{ length: number; toUpperCase: () => string }]) => (
      <>
        {tags.map((tag, index) => {
          let color = tag.length > 5 ? "geekblue" : "green"
          if (tag === "loser") {
            color = "volcano"
          }
          return (
            <Tag color={color} key={index}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    )
  },
  {
    title: "Action",
    key: "action",
    render: (text: string, record: { name: string }) => (
      <Space size="middle">
        <a href="#">Invite {record.name}</a>
        <a href="#">Delete</a>
      </Space>
    )
  }
]

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  },
  {
    key: "x1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "x2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "x3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
]

export default function Home() {
  const [add, setAdd] = useState(false)

  function toggleAdd() {
    setAdd(!add)
  }

  return (
    <Layout>
      <Row justify="space-between">
        <Col>
          <Typography.Title level={1}>Ingredients</Typography.Title>
        </Col>
        <Col>
          <Button size="large" type="primary" onClick={toggleAdd}>
            Add
          </Button>
        </Col>
      </Row>

      <Table columns={columns} dataSource={data} />

      {add && <NewIngredient onClose={toggleAdd} />}
    </Layout>
  )
}
