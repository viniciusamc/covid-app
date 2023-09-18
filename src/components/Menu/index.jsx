import { useNavigate } from "react-router";
import {
  Header,
  Status,
  Nav,
  Item,
  StatusItem,
  Success,
  Error,
} from "./styles.js";
import { useEffect, useState } from "react";
import { apiStatus } from "../../api/api.js";

export default function Menu() {
  const navigate = new useNavigate();
  const [status, setStatus] = useState();

  function statusChange() {
    if (status.status === "ok") return <Success>Funcionando</Success>;
  }

  function timeChange() {
    const data = new Date(status.date);
    const dia = String(data.getDate());
    const mes = String(data.getMonth() + 1).padStart(2, 0);
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  useEffect(() => {
    async function getStatus() {
      const response = await apiStatus.get();
      setStatus(response.data);
    }
    getStatus();
  }, []);
  return (
    <Header>
      {status ? (
        <Status>
          <StatusItem>Status API: {statusChange()} </StatusItem>
          <StatusItem>Data API: {timeChange()} </StatusItem>
        </Status>
      ) : (
        <Status>
          <StatusItem>
            <Error>API NÃO FUNCIONANDO</Error>
          </StatusItem>
        </Status>
      )}
      <Nav>
        <Item onClick={() => navigate("/")}>Brasil/Estados</Item>
        <Item onClick={() => navigate("/paises")}>Países</Item>
        <Item onClick={() => navigate("/data")}>Data Especifíca</Item>
        <Item onClick={() => navigate("/registrar")}>Registrar</Item>
      </Nav>
    </Header>
  );
}
