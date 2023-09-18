import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import Menu from "../../components/Menu";
import { Titulo } from "../../components/Titulo";
import { useState } from "react";
import { api } from "../../api/api";
import { Close } from "@mui/icons-material";
import TextoDados from "../../components/TextoDados";
import { style } from "../../styles/modal";
import countriesJSON from "../../utils/countries.json"

export function Paises() {
  const [pais, setPais] = useState();
  const [open, setOpen] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [response, setResponse] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function handleSubmit() {
    if (!pais) return alert("Selecione um País!");
    setButtonStatus(true); 
    try {
      const response = await api.get(`/${pais}`);
      setResponse(response.data.data); // Esse data.data é por causa que ele está dentro de duas "Data"
    } catch (e) {
      alert("Erro, tente novamente mais tarde", e);
      setButtonStatus(false);
    }

    handleOpen();
    setButtonStatus(false);
  }
  return (
    <>
      <Menu />
      <Titulo
        Titulo={"Paises"}
        Mensagem={"Selecione o pais e veja as informações sobre a COVID-19"}
      />

      <FormControl
        sx={{ m: 1, width: 300, display: "flex", gap: 1, margin: "0 auto" }}
      >
        <InputLabel id="demo-simple-select-label">País</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pais ? pais : ""}
          label="País"
          onChange={(e) => setPais(e.target.value)}
        >
        {
            countriesJSON.data.map((element, index) => (
                <MenuItem key={index} value={element.name}>
                    {
                        element.name
                    }
                </MenuItem>
            ))
        }
        </Select>
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

          <TextoDados Tipo={"País Selecionado"} Dado={response.country} />
          <TextoDados Tipo={"Casos"} Dado={response.cases} />
          <TextoDados Tipo={"Recuperados"} Dado={response.recovered} />
          <TextoDados Tipo={"Mortes"} Dado={response.deaths} />
          <TextoDados Tipo={"Última Atualização"} Dado={response.updated_at} />
        </Box>
      </Modal>
    </>
  );
}
