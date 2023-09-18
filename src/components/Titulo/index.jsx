import { Container, Title, Message } from "./styles.js";

export function Titulo({ Titulo, Mensagem }) {
  return (
    <Container>
      <Title>{Titulo}</Title>
      <Message>{Mensagem}</Message>
    </Container>
  );
}
