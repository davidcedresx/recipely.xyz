import {
  Flex,
  Heading,
  Box,
  Image,
  Stat,
  StatLabel,
  StatNumber
} from "@chakra-ui/react"
import { FC } from "react"
import { Navbar } from "../../components"

import recipeImg from "../../assets/cake.svg"
import ingredientImg from "../../assets/lemon.svg"
import utensilImg from "../../assets/candle.svg"

const Homepage: FC = () => (
  <>
    <Navbar />

    <Heading my={6}>Welcome back!</Heading>

    <Flex>
      <Box boxShadow="base" p={6} mr={8} rounded="md">
        <Image boxSize="100px" src={recipeImg} mb={8} />
        <Stat>
          <StatLabel>Recipes</StatLabel>
          <StatNumber>5</StatNumber>
        </Stat>
      </Box>
      <Box boxShadow="base" p={6} mr={8} rounded="md">
        <Image boxSize="100px" src={ingredientImg} mb={8} />
        <Stat>
          <StatLabel>Ingredients</StatLabel>
          <StatNumber>10</StatNumber>
        </Stat>
      </Box>
      <Box boxShadow="base" p={6} mr={8} rounded="md">
        <Image boxSize="100px" src={utensilImg} mb={8} />
        <Stat>
          <StatLabel>Utensils</StatLabel>
          <StatNumber>17</StatNumber>
        </Stat>
      </Box>
    </Flex>
  </>
)

export default Homepage
