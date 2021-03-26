import { FC, useMemo, useState } from "react"

import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { Utensil } from "./utensilsSlice"

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Heading,
  HStack,
  IconButton,
  useDisclosure
} from "@chakra-ui/react"
import { Navbar } from "../../components"
import { FaPlus } from "react-icons/fa"
import styled from "styled-components"

// local components
import Modal from "./utensilModal"

const TableStyles = styled.div`
  .row:hover {
    cursor: pointer;
    border-right: 1px dashed black;
  }
`

const Utensils: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const utensils = useSelector((store: RootState) => store.utensils.utensils)

  const utensilCount = useMemo(() => utensils.length, [utensils])

  const [selectedUtensil, setSelectedUtensil] = useState<Utensil>()

  const onModalClose = () => {
    setSelectedUtensil(undefined)
    onClose()
  }

  const selectUtensil = (utensil: Utensil) => {
    setSelectedUtensil(utensil)
    onOpen()
  }

  const onCreate = () => {
    setSelectedUtensil(undefined)
    onOpen()
  }

  return (
    <>
      <Navbar />

      <HStack spacing="24px">
        <Heading my={6}>Utensils</Heading>
        <IconButton
          aria-label="add recipe"
          icon={<FaPlus />}
          onClick={onCreate}
        />
      </HStack>

      <TableStyles>
        <Table variant="striped" colorScheme="teal" size="lg">
          <TableCaption>{utensilCount} Utensils</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {utensils.map((utensil, index) => (
              <Tr
                className="row"
                key={index}
                onClick={() => selectUtensil(utensil)}
              >
                <Td>{utensil.name}</Td>
                <Td isNumeric>$ {utensil.price}</Td>
                <Td isNumeric>{utensil.amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableStyles>

      <Modal isOpen={isOpen} onClose={onModalClose} utensil={selectedUtensil} />
    </>
  )
}

export default Utensils
