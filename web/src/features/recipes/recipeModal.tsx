import { FC, useMemo } from "react"

import { useForm } from "react-hook-form"

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
  FormHelperText,
  useToast,
  Spacer
} from "@chakra-ui/react"

import { useAppDispatch } from "../../app/store"
import { Recipe, asyncCreate, asyncUpdate, asyncDelete } from "./recipesSlice"

interface Props {
  onClose: () => void
  isOpen: boolean
  recipe?: Recipe
}

/* TODO
    - Find out why the hell react-hook-form is not parsing amount field as number
    - Optionally, it would be better to just use NumberInput / NumberInputField from chakra
*/
const RecipeModal: FC<Props> = ({ isOpen, onClose, recipe }) => {
  const dispatch = useAppDispatch()
  const toast = useToast()
  const { register, handleSubmit } = useForm<Recipe>()

  const action = useMemo(() => (recipe === undefined ? "create" : "update"), [
    recipe
  ])

  const onSubmit = async (data: Recipe) => {
    const asyncAction = action === "create" ? asyncCreate : asyncUpdate

    // spread needed for update, otherwise _id would be missing
    const resultAction = await dispatch(asyncAction({ ...recipe, ...data }))

    if (asyncAction.fulfilled.match(resultAction)) {
      toast({
        title: "Recipe " + action + "d", // sick way of translating verb to past
        status: "success",
        duration: 2000,
        isClosable: true
      })
      onClose()
    }

    if (asyncAction.rejected.match(resultAction)) {
      toast({
        title: "Error",
        description: resultAction.error.message,
        status: "error",
        duration: 2000,
        isClosable: true
      })
    }
  }

  const onDelete = async () => {
    const resultAction = await dispatch(asyncDelete(recipe as Recipe))

    if (asyncDelete.fulfilled.match(resultAction)) {
      toast({
        title: "Recipe deleted",
        status: "success",
        duration: 2000,
        isClosable: true
      })
      onClose()
    }

    if (asyncDelete.rejected.match(resultAction)) {
      toast({
        title: "Error",
        description: resultAction.error.message,
        status: "error",
        duration: 2000,
        isClosable: true
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {action === "create" ? "Create" : "Update"} Recipe
        </ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl mb={6}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Birthday Candels"
                name="name"
                defaultValue={recipe?.name}
                ref={register({ required: true })}
                required
              />
              <FormHelperText>Use a name you can remember later</FormHelperText>
            </FormControl>
            <FormControl mb={6}>
              <FormLabel>Pieces</FormLabel>
              <Input
                type="text"
                placeholder="1"
                name="pieces"
                defaultValue={recipe?.pieces}
                ref={register({ required: true })}
                required
              />
              <FormHelperText>How much pieces will you get</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {action === "update" && (
              <Button colorScheme="red" onClick={onDelete}>
                Delete
              </Button>
            )}
            <Spacer />
            <Button colorScheme="teal" type="submit">
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default RecipeModal
