import { Container, Form, SubmitButton } from "./styles";
import { FaGithub, FaPlus } from "react-icons/fa"

export default function Main() {
  return (
    <div>
      <Container>
        <h1>
          <FaGithub size={25} />
          Meus Repositorios
        </h1>

        <Form onSubmit={() => { }}>
          <input type="text" placeholder="Adicionar Repositorio " />

          <SubmitButton>
            <FaPlus color="#FFF" size={14} />
          </SubmitButton>

        </Form>
      </Container>
    </div>
  );
}


