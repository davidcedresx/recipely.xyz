import { FC, useMemo, useState } from "react"

import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { Ingredient } from "./ingredientsSlice"

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
import Modal from "./ingredientModal"

const TableStyles = styled.div`
  .row:hover {
    cursor: pointer;
    border-right: 1px dashed black;
  }
`

const Ingredients: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const ingredients = useSelector(
    (store: RootState) => store.ingredients.ingredients
  )

  const ingredientCount = useMemo(() => ingredients.length, [ingredients])

  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>()

  const onModalClose = () => {
    setSelectedIngredient(undefined)
    onClose()
  }

  const selectIngredient = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient)
    onOpen()
  }

  const onCreate = () => {
    setSelectedIngredient(undefined)
    onOpen()
  }

  return (
    <>
      <Navbar />

      <HStack spacing="24px">
        <Heading my={6}>Ingredients</Heading>
        <IconButton
          aria-label="add recipe"
          icon={<FaPlus />}
          onClick={onCreate}
        />
      </HStack>

      <TableStyles>
        <Table variant="striped" colorScheme="pink" size="lg">
          <TableCaption>{ingredientCount} Ingredients</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Amount</Th>
              <Th>Unit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ingredients.map((ingredient, index) => (
              <Tr
                className="row"
                key={index}
                onClick={() => selectIngredient(ingredient)}
              >
                <Td>{ingredient.name}</Td>
                <Td isNumeric>$ {ingredient.price}</Td>
                <Td isNumeric>{ingredient.amount}</Td>
                <Td>{ingredient.unit}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableStyles>

      <Modal
        isOpen={isOpen}
        onClose={onModalClose}
        ingredient={selectedIngredient}
      />
    </>
  )
}

export default Ingredients
