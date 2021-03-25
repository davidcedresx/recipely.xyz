import { FC } from "react"

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  Heading,
  HStack,
  IconButton,
  useDisclosure
} from "@chakra-ui/react"
import { Navbar } from "../../components"
import { FaPlus } from "react-icons/fa"

// local components
import Modal from "./ingredientModal"

const Ingredients: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Navbar />

      <HStack spacing="24px">
        <Heading my={6}>Ingredients</Heading>
        <IconButton
          aria-label="add recipe"
          icon={<FaPlus />}
          onClick={onOpen}
        />
      </HStack>

      <Table variant="striped" colorScheme="pink" size="lg">
        <TableCaption>0 Ingredients</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>Amount</Th>
            <Th>Unit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr> */}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Ingredients
