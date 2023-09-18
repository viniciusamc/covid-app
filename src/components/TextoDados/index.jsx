import { Container, Tipo, Dado, Error } from "./styles.js";

export default function TextoDados({ Tipo: tipoDado, Dado: DadoTratado }) {
  function checkNull(dado) {
    if (!dado) {
      return <Error>Dado Indisponível</Error>;
    } else {
      if (tipoDado === "Última Atualização") {
        const data = new Date(dado);
        const dia = String(data.getDate());
        const mes = String(data.getMonth() + 1);
        const ano = data.getFullYear();

        return `${dia}/${mes}/${ano}`;
      }
      return dado;
    }
  }
  return (
    <Container>
      <Tipo>{tipoDado}:</Tipo>
      <Dado>{checkNull(DadoTratado)}</Dado>
    </Container>
  );
}
