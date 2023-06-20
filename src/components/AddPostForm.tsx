import {
  Avatar,
  Button,
  Flex,
  FormControl,
  Stack,
  Text,
  TextProps,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface AddPostFormElements extends HTMLFormControlsCollection {
  text: HTMLTextAreaElement;
}

interface IAddPostForm extends HTMLFormElement {
  readonly elements: AddPostFormElements;
}

export const AddPostForm = ({
  placeholder,
}: {
  placeholder: string;
}) => {
  const [charactersCount, setCharactersCount] = useState(0);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: FormEvent<IAddPostForm>) => {
    event.preventDefault();
    const text = event.currentTarget.elements.text.value;
    postMessage(text);
    if (textarea.current) {
      textarea.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing="4">
        {/* <Link to={""}> */}
          <Avatar src={""} boxSize="12" />
        {/* </Link> */}
        <FormControl id="text">
          <Textarea
            ref={textarea}
            rows={3}
            resize="none"
            placeholder={placeholder}
            name="text"
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              console.log("ok")
            }}
            required
          />
        </FormControl>
      </Stack>
      <Flex direction="row-reverse" py="4" px={{ base: "4", md: "6" }}>
        <Button
          colorScheme="twitter"
          type="submit"
          variant="solid"
        >
          Post message
        </Button>
      </Flex>
    </form>
  );
};

const MaxCharCounter = ({
  remaining,
  ...textProps
}: {
  remaining: number;
} & TextProps) => <Text {...textProps}>{remaining}</Text>;
