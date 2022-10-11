import { Box, Container, Input } from "./style";

// CNPJ, RAZAO SOCIAL, EMAIL, NÚMERO PARA CONTATO, ENDEREÇO (CEP, RUA, BAIRRO, COMPLEMENTO...)
// SENHA, CONFIRMAR SENHA, FRANQUIA
// LATITUDE E LONGITUDE (MAPA)

export default function Register() {
  return (
    <Container>
      <Box>
        <p>CADASTRO</p>
        <Input name="CNPJ" />
      </Box>
    </Container>
  )
}