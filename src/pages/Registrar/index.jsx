import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import TextoDados from "../../components/TextoDados";
import { Titulo } from "../../components/Titulo";
import Menu from "../../components/Menu";
import { style } from "../../styles/modal";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ufs from "../../utils/uf.json";

export function Registrar() {
  const [estado, setEstado] = useState();
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [response, setResponse] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function onSubmit(data) {
    setButtonStatus(true);
    setResponse(data);
    console.log(data);
    handleOpen();
    setButtonStatus(false);
  }

  return (
    <>
      <Menu />
      <Titulo Titulo={"Registrar"} Mensagem={"Registre novos casos"} />

      <FormControl
        sx={{ m: 1, width: 300, display: "flex", gap: 1, margin: "0 auto" }}
        onSubmit={handleSubmit(onSubmit)}
        component={"form"}
      >
        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={estado ? estado : ""}
          label="Estado"
          required
          {...register("state")}
          onChange={(e) => setEstado(e.target.value)}
        >
          {ufs.data.map((i, k) => (
            <MenuItem key={k} value={i.uf}>
              {i.state}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Casos"
          type="number"
          {...register("cases")}
          required
        />
        <TextField
          label="Confirmado"
          type="number"
          {...register("confirmed")}
          required
        />
        <TextField
          label="Mortos"
          type="number"
          {...register("deaths")}
          required
        />
        <TextField
          label="Recuperados"
          type="number"
          {...register("recovered")}
          required
        />
        <TextField type="date" {...register("date")} />
        <Button variant="contained" type="submit" disabled={buttonStatus}>
          {buttonStatus ? "Registrando" : "Registrar"}
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
            Tipo={"Registro Concluido! - "}
            Dado={response.state || "Todos os estados do Brasil"}
          />
          <TextoDados
            Tipo={"Casos"}
            Dado={response.cases || response.confirmed}
          />
          <TextoDados Tipo={"Confirmados"} Dado={response.confirmed} />
          <TextoDados Tipo={"Mortes"} Dado={response.deaths} />
          <TextoDados Tipo={"Recuperados"} Dado={response.recovered} />
          <TextoDados
            Tipo={"Atualização"}
            Dado={String(response.date).replaceAll("-", "/")}
          />
        </Box>
      </Modal>
    </>
  );
}
