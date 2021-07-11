import { FC } from "react"

import {
  Flex,
  Heading,
  Box,
  Image,
  Stat,
  StatLabel,
  StatNumber
} from "@chakra-ui/react"
import { Navbar } from "../../components"
import styled from "styled-components"

import recipeImg from "../../assets/cake.svg"
import ingredientImg from "../../assets/lemon.svg"
import utensilImg from "../../assets/candle.svg"

import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

const CardStyles = styled.div`
  .card:hover {
    cursor: pointer;
  }
`

const Homepage: FC = () => {
  const recipesCount = useSelector(
    (store: RootState) => store.recipes.recipes.length
  )
  const ingredientsCount = useSelector(
    (store: RootState) => store.ingredients.ingredients.length
  )
  const utensilsCount = useSelector(
    (store: RootState) => store.utensils.utensils.length
  )

  return (
    <>
      <Navbar />

      <Heading my={6}>Welcome back!</Heading>

      <CardStyles>
        <Flex>
          <Box className="card" boxShadow="base" p={6} mr={8} rounded="md">
            <Image boxSize="100px" src={recipeImg} mb={8} />
            <Stat>
              <StatLabel>Recipes</StatLabel>
              <StatNumber>{recipesCount}</StatNumber>
            </Stat>
          </Box>
          <Box className="card" boxShadow="base" p={6} mr={8} rounded="md">
            <Image boxSize="100px" src={ingredientImg} mb={8} />
            <Stat>
              <StatLabel>Ingredients</StatLabel>
              <StatNumber>{ingredientsCount}</StatNumber>
            </Stat>
          </Box>
          <Box className="card" boxShadow="base" p={6} mr={8} rounded="md">
            <Image boxSize="100px" src={utensilImg} mb={8} />
            <Stat>
              <StatLabel>Utensils</StatLabel>
              <StatNumber>{utensilsCount}</StatNumber>
            </Stat>
          </Box>
        </Flex>
      </CardStyles>
    </>
  )
}

export default Homepage
