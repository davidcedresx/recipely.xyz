import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Heading,
  HStack,
  IconButton
} from "@chakra-ui/react"
import { Navbar } from "../../components"
import { FC } from "react"
import { FaPlus } from "react-icons/fa"

const Ingredients: FC = () => {
  return (
    <>
      <Navbar />

      <HStack spacing="24px">
        <Heading my={6}>Ingredients</Heading>
        <IconButton aria-label="add recipe" icon={<FaPlus />} />
      </HStack>

      <Table variant="striped" colorScheme="pink" size="lg">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
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
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  )
}

export default Ingredients
