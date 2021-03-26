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
  Select,
  FormHelperText,
  useToast,
  Spacer
} from "@chakra-ui/react"

import { useAppDispatch } from "../../app/store"
import {
  Ingredient,
  asyncCreate,
  asyncUpdate,
  asyncDelete
} from "./ingredientsSlice"

interface Props {
  onClose: () => void
  isOpen: boolean
  ingredient?: Ingredient
}

/* TODO
    - Find out why the hell react-hook-form is not parsing amount field as number
    - Optionally, it would be better to just use NumberInput / NumberInputField from chakra
*/
const IngredientModal: FC<Props> = ({ isOpen, onClose, ingredient }) => {
  const dispatch = useAppDispatch()
  const toast = useToast()
  const { register, handleSubmit } = useForm<Ingredient>()

  const action = useMemo(
    () => (ingredient === undefined ? "create" : "update"),
    [ingredient]
  )

  const onSubmit = async (data: Ingredient) => {
    const asyncAction = action === "create" ? asyncCreate : asyncUpdate

    // spread needed for update, otherwise _id would be missing
    const resultAction = await dispatch(asyncAction({ ...ingredient, ...data }))

    if (asyncAction.fulfilled.match(resultAction)) {
      toast({
        title: "Ingredient " + action + "d", // sick way of translating verb to past
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
    const resultAction = await dispatch(asyncDelete(ingredient as Ingredient))

    if (asyncDelete.fulfilled.match(resultAction)) {
      toast({
        title: "Ingredient deleted",
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
          {action === "create" ? "Create" : "Update"} Ingredient
        </ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl mb={6}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Spicy Apples"
                name="name"
                defaultValue={ingredient?.name}
                ref={register({ required: true })}
                required
              />
              <FormHelperText>Use a name you can remember later</FormHelperText>
            </FormControl>

            <FormControl mb={6}>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                placeholder="0"
                step={0.1}
                name="price"
                defaultValue={ingredient?.price}
                ref={register({ required: true, min: 0 })}
                required
              />
              <FormHelperText>How much does it cost you</FormHelperText>
            </FormControl>

            <FormControl mb={6}>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                placeholder="4"
                name="amount"
                defaultValue={ingredient?.amount}
                ref={register({ required: true })}
                required
              />
              <FormHelperText>
                Amount of ingredient the presentation comes with
              </FormHelperText>
            </FormControl>

            <FormControl mb={6}>
              <FormLabel>Unit</FormLabel>
              <Select
                name="unit"
                defaultValue={ingredient?.unit}
                ref={register({ required: true })}
              >
                <option value="UNIT">Unit</option>
                <option value="KG">Kg</option>
                <option value="GR">Gr</option>
                <option value="LT">Lt</option>
                <option value="ML">ml</option>
              </Select>
              <FormHelperText>Unit the presentation comes in</FormHelperText>
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

export default IngredientModal
