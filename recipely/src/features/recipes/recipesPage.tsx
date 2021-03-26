import { FC, useMemo, useState } from "react"

import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { Recipe } from "./recipesSlice"

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
import Modal from "./recipeModal"

const TableStyles = styled.div`
  .row:hover {
    cursor: pointer;
    border-right: 1px dashed black;
  }
`

const Recipes: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const recipes = useSelector((store: RootState) => store.recipes.recipes)

  const recipeCount = useMemo(() => recipes.length, [recipes])

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>()

  const onModalClose = () => {
    setSelectedRecipe(undefined)
    onClose()
  }

  const selectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
    onOpen()
  }

  const onCreate = () => {
    setSelectedRecipe(undefined)
    onOpen()
  }

  return (
    <>
      <Navbar />

      <HStack spacing="24px">
        <Heading my={6}>Recipes</Heading>
        <IconButton
          aria-label="add recipe"
          icon={<FaPlus />}
          onClick={onCreate}
        />
      </HStack>

      <TableStyles>
        <Table variant="striped" colorScheme="pink" size="lg">
          <TableCaption>{recipeCount} Recipes</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Pieces</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Portion</Th>
            </Tr>
          </Thead>
          <Tbody>
            {recipes.map((recipe, index) => (
              <Tr
                className="row"
                key={index}
                onClick={() => selectRecipe(recipe)}
              >
                <Td>{recipe.name}</Td>
                <Td isNumeric>{recipe.pieces}</Td>
                <Td isNumeric>$ 999</Td>
                <Td isNumeric>$ 2.5</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableStyles>

      <Modal isOpen={isOpen} onClose={onModalClose} recipe={selectedRecipe} />
    </>
  )
}

export default Recipes
