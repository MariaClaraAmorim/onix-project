import { Inter } from "next/font/google";
import Image from "next/image";
import { FormEvent, useState } from "react";
import car from "src/assets/images/car.png";
import logo from "src/assets/images/logo.png";
import { errorCodes } from "../data/errorCode";
import useMatchMedia from "../hooks/useMatchMedia";
import {
  Button, Container,
  Content,
  Description, Footer,
  FooterLogo, Form, Header, InfoText,
  Input, LightText, LogoContainer, Onix, SearchResult,
  TextInfo,
  TextSearchResult, TitleHeader
} from "../styles/pages";
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const matchedWidthMobile = useMatchMedia("max-width: 550px");

  const [errorCode, setErrorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSearch(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    const result = errorCodes.find(({ error }) => error.code === errorCode);
    setErrorMessage(
      result
        ? result.error.message
        : `Código de erro ${errorCode} não encontrado`
    );
  }

  function handleBlur() {
    if (errorCode.length && matchedWidthMobile) {
      handleSearch();
    }
  }

  return (
    <>
      <Container>
        <Header>
          <LogoContainer>
            <Image width={70} height={70} src={logo} alt="myOnix" />

            <TitleHeader>MyOnix</TitleHeader>
          </LogoContainer>

          <Description>
            <LightText>
              Saiba o significado do código que aparece no painel do seu
              Chevrolet.
            </LightText>
          </Description>
        </Header>
        <Content>
          <Form onSubmit={handleSearch}>
            <Input
              onBlur={handleBlur}
              maxLength={3}
              placeholder="Código do erro"
              type="text"
              inputMode="numeric"
              value={errorCode}
              onChange={(event) => setErrorCode(event.target.value)}
            />

            {matchedWidthMobile ? (
              <Button
                type="button"
                onClick={() => {
                  setErrorCode("");
                }}
              >
                <Image width={30} height={30} src="/images/close.svg" alt="Close" />
              </Button>
            ) : (
              <Button>Pesquisar</Button>
            )}
          </Form>

          {errorMessage && (
            <SearchResult>
              <TextSearchResult>{errorMessage}</TextSearchResult>
            </SearchResult>
          )}

          <InfoText>
            <TextInfo>
              Confira a relação de códigos que podem aparecer no painel dos
              Chevrolet. Algumas mensagens podem não estar disponíveis para
              determinados modelos de veículo
            </TextInfo>
          </InfoText>
        </Content>
      </Container>

      <Onix>
        <Image
          width={450}
          height={250}
          src={car}
          alt="Imagem de um carro da chevrolet modelo onix"
        />
      </Onix>

      <Footer>
        <FooterLogo>
          <Image width={30} height={30} src={logo} alt="myOnix" />
          <TitleHeader>MyOnix</TitleHeader>
        </FooterLogo>
      </Footer>
    </>
  );
}
