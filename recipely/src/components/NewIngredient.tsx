import { Input, Select } from "antd"
import Form from "antd/lib/form/Form"
import FormItem from "antd/lib/form/FormItem"
import Modal from "antd/lib/modal/Modal"

export default function NewIngredient(props: { onClose: () => void }) {
  return (
    <Modal title="Create Ingredient" visible={true} onCancel={props.onClose}>
      <Form>
        <FormItem name="name">
          <Input placeholder="Ingredient Name" type="text" size="large" />
        </FormItem>

        <FormItem name="price">
          <Input placeholder="Price" type="number" size="large" />
        </FormItem>

        <FormItem name="amount">
          <Input placeholder="Amount" type="number" size="large" />
        </FormItem>

        <FormItem name="unit">
          <Select size="large" defaultValue="KG">
            <Select.Option value="KG">KG</Select.Option>
            <Select.Option value="GR">GR</Select.Option>
            <Select.Option value="LT">LT</Select.Option>
            <Select.Option value="ML">ML</Select.Option>
            <Select.Option value="UNIT">UNIT</Select.Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  )
}
