import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
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
import ufs from "../../utils/uf.json";
import { style } from "../../styles/modal";

export function Estados() {
  const [estado, setEstado] = useState();
  const [checkbox, setCheckbox] = useState(false);
  const [open, setOpen] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [response, setResponse] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setResponse(""); // Quando busca o estado, depois fecha e seleciona buscar todos os estados da um bug
    setOpen(false);
  };

  async function handleSubmit() {
    if (!estado && !checkbox) return alert("Selecione um ou todos Estados!");
    setButtonStatus(true);
    try {
      if (!checkbox) {
        const response = await api.get(`/brazil/uf/${estado}`);
        setResponse(response.data);
      } else {
        const response = await api.get(`/brazil`);
        setResponse(response.data.data);
        console.log(response.data.data);
      }
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
        Titulo={"Estados do Brasil"}
        Mensagem={"Selecione o/os estado/estados para ver informações"}
      />

      <FormControl
        sx={{ m: 1, width: 300, display: "flex", gap: 1, margin: "0 auto" }}
      >
        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={estado ? estado : ""}
          label="Estado"
          onChange={(e) => setEstado(e.target.value)}
          disabled={checkbox}
        >
          {ufs.data.map((i, k) => (
            <MenuItem key={k} value={i.uf}>
              {i.state}
            </MenuItem>
          ))}
        </Select>
        <FormControlLabel
          control={<Checkbox />}
          label="Selecionar Todos os Estados"
          onChange={(e) => {
            setCheckbox(!checkbox);
          }}
        />
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
            Tipo={"Estado Selecionado"}
            Dado={response.state || "Todos os estados do Brasil"}
          />
          <TextoDados
            Tipo={"Casos"}
            Dado={response.cases || response.confirmed}
          />
          <TextoDados Tipo={"Suspeitas"} Dado={response.suspects} />
          <TextoDados Tipo={"Mortes"} Dado={response.deaths} />
          <TextoDados
            Tipo={"Última Atualização"}
            Dado={response.datetime || response.updated_at}
          />
        </Box>
      </Modal>
    </>
  );
}
