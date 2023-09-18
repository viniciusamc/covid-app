import {
  Box,
  Button,
  FormControl,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import Menu from "../../components/Menu";
import { Titulo } from "../../components/Titulo";
import { useState } from "react";
import { api } from "../../api/api";
import { Close } from "@mui/icons-material";
import { style } from "../../styles/modal";
import TextoDados from "../../components/TextoDados";

export function Data() {
  const [data, setData] = useState();
  const [casos, setCasos] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [suspects, setSuspects] = useState(0);
  const [open, setOpen] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function dateFix() {
    const cleanData = new Date(data);
    const day = String(cleanData.getDate() + 1).padStart(2, "0");
    const month = String(cleanData.getMonth() + 1).padStart(2, "0");
    const year = cleanData.getFullYear();
    return `${year}${month}${day}`;
  }

  async function handleSubmit() {
    if (!data) return alert("Selecione uma Data!");
    setButtonStatus(true);
    try {
      const response = await api.get(`/brazil/${dateFix(data)}`);
      let arr = response.data.data;
      let casosTotal = 0;
      let deathsTotal = 0;
      let suspectsTotal = 0;

      arr.forEach((e) => {
        casosTotal += e.cases;
        deathsTotal += e.deaths;
        suspectsTotal += e.suspects;
      });

      setCasos(casosTotal);
      setDeaths(deathsTotal);
      setSuspects(suspectsTotal);
    } catch (e) {
      alert("Erro, tente novamente mais tarde", e);
    }

    handleOpen();
    setButtonStatus(false);
  }
  return (
    <>
      <Menu />
      <Titulo
        Titulo={"Data"}
        Mensagem={
          "Selecione uma data para mais informações | ATENÇÂO EXISTEM DATAS QUE NÃO POSSUEM RELATÓRIOS"
        }
      />

      <FormControl
        sx={{ m: 1, width: 300, display: "flex", gap: 1, margin: "0 auto" }}
      >
        <TextField type="date" onChange={(e) => setData(e.target.value)} />

        <Button
          variant="contained"
          type="submit"
          onClick={handleSubmit}
          disabled={buttonStatus}
        >
          {buttonStatus ? "Buscando" : "Buscar"}
        </Button>
      </FormControl>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style}>
          <IconButton
            aria-label="close"
            color="error"
            size="large"
            onClick={handleClose}
            style={{
              position: "absolute",
              left: 1,
              top: 1,
            }}
          >
            <Close />
          </IconButton>

          <TextoDados
            Tipo={"Brasil Dia"}
            Dado={String(data).replaceAll("-", "/")}
          />
          <TextoDados Tipo={"Casos"} Dado={casos} />
          <TextoDados Tipo={"Suspeitas"} Dado={suspects} />
          <TextoDados Tipo={"Mortes"} Dado={deaths} />
        </Box>
      </Modal>
    </>
  );
}
