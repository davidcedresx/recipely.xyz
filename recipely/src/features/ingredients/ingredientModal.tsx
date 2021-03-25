import { FC } from "react"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormHelperText
} from "@chakra-ui/react"

interface Props {
  onClose: () => void
  isOpen: boolean
}

const IngredientModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Ingredient</ModalHeader>
        <ModalCloseButton />

        <form>
          <ModalBody>
            <FormControl mb={6}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Spicy Apples"
                name="name"
                required
              />
              <FormHelperText>Use a name you can remember later</FormHelperText>
            </FormControl>

            <FormControl mb={6}>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                placeholder="One million dollars?"
                name="price"
                required
              />
              <FormHelperText>How much does it cost you</FormHelperText>
            </FormControl>

            <FormControl mb={6}>
              <FormLabel>Amount</FormLabel>
              <Input type="number" placeholder="4" name="amount" required />
              <FormHelperText>
                Amount of ingredient the presentation comes with
              </FormHelperText>
            </FormControl>

            <FormControl mb={6}>
              <FormLabel>Unit</FormLabel>
              <Select>
                <option selected value="UNIT">
                  Unit
                </option>
                <option value="KG">Kg</option>
                <option value="GR">Gr</option>
                <option value="LT">Lt</option>
                <option value="ML">ml</option>
              </Select>
              <FormHelperText>Unit the presentation comes in</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default IngredientModal
