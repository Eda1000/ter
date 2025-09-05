import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/Auth';
import { useHistory, useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';

import { HiBadgeCheck } from 'react-icons/hi';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { LoadingOutlined } from '@ant-design/icons';

import boxImg from '../../assets/box/box2.png';
import addBox from '../../assets/box/addBox.svg';
import api from '../../services/api';

import {
  BackButton,
  RemoveButton,
  ButtonsWrapper,
  Container,
  Content,
  AddImageContainer,
  InfoGroup,
  Informations,
  Input,
  Label,
  MainButtons,
  PageTitle,
  SaveButton,
  TitleRow,
  AddImageIcon,
  FileInput,
  InputGroup,
} from './styles';

interface BoxDataInterface {
  state: {
    id: string;
    name: string;
    length: string;
    width: string;
    height: string;
    weight: string;
    utilization: string;
    cubage: string;
    image_url: string;
  };
}

export const EditBoxes = () => {
  const history = useHistory();
  const location = useLocation();

  const { data, setData } = useAuth();

  const boxData = location.state as BoxDataInterface;

  console.log(location.state);

  const [name, setName] = useState(boxData.state.name);
  const [length, setLength] = useState(() => {
    const ptBRdata = boxData?.state?.length
    ?.replace(/\./g, ',')

    return ptBRdata
  });
  const [width, setWidth] = useState(() => {
    const ptBRdata = boxData?.state?.width
    ?.replace(/\./g, ',')

    return ptBRdata
  });
  const [height, setHeight] = useState(() => {
    const ptBRdata = boxData?.state?.height
    ?.replace(/\./g, ',')

    return ptBRdata
  });
  const [weight, setWeight] = useState(() => {
    const ptBRdata = boxData?.state?.weight
    ?.replace(/\./g, ',')

    return ptBRdata
  });
  const [userImg, setUserImg] = useState(boxData?.state?.image_url);
  const [fileSelected, setFileSelected] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);

  useEffect(() => {
    setUserImg(boxData.state.image_url);
  }, []);

  const validateFormFields = () => {
    if (!name.trim() || !length || !width || !height) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFormFields()) {
      toast.error('Digite todos os campos!');
      return;
    }

    const usr = {
      name,
      width: Number(width?.replace(/,/g, '.')),
      height: Number(height?.replace(/,/g, '.')),
      length: Number(length?.replace(/,/g, '.')),
    };

    setLoading(true);

    try {
      const res = await api.put(`/boxes/${boxData.state.id}`, usr, {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      setData({
        access_token: data.access_token,
        user: res.data,
      });
      setLoading(false);
      toast.success('Caixa editada com sucesso!');
      history.push('/todas-as-caixas');
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    setLoadingRemove(true);
    try {
      await api.delete(`/boxes/${id}`, {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      setLoadingRemove(false);
      toast.success('Caixa removida!');
      history.push('/todas-as-caixas');
    } catch (err) {
      handleError(err);
      setLoadingRemove(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    setLoadingPhoto(true);

    if (fileList) {
      const formData = new FormData();
      formData.append('image', fileList[0]);

      setFileSelected(URL.createObjectURL(fileList[0]));

      try {
        const res = await api.patch(
          `boxes/${boxData.state.id}/image`,
          formData,
          {
            headers: {
              'Content-Type': `multipart/form-data;`,
              Authorization: `Bearer ${data.access_token}`,
            },
          },
        );

        setUserImg(res.data.avatar_url);
        setData({
          access_token: data.access_token,
          user: res.data,
        });
        setLoadingPhoto(false);
        toast.success('Imagem alterada!');
      } catch (err) {
        setLoadingPhoto(false);
        handleError(err);
      }
    }
  };

  const handleError = async (error: any) => {
    let message;
    if (error.response.data?.message) {
      message = error.response?.data.message;
    } else {
      message = error.toString();
    }

    setLoading(false);
    toast.error(message);
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Content>
          <TitleRow>
            <PageTitle>Editar caixa</PageTitle>
          </TitleRow>

          <Informations>
            <InfoGroup>
              <AddImageContainer>
                <FileInput
                  id="image"
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                />
                {!loadingPhoto ? (
                  <img
                    src={userImg || fileSelected || boxImg}
                    alt="Adicionar imagem"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = boxImg;
                    }}
                  />
                ) : (
                  <LoadingOutlined
                    style={{
                      fontSize: '60px',
                      margin: '0 auto',
                      color: '#FF9700',
                      display: 'table',
                    }}
                    spin
                  />
                )}

                <AddImageIcon src={addBox} alt="Ícone de camera" />

                <section>
                  <h2>{boxData.state.name}</h2>
                  <p>
                    {boxData.state.cubage}m³ - {boxData.state.weight}kg -{' '}
                    {boxData.state.utilization} usos
                  </p>
                </section>
              </AddImageContainer>
            </InfoGroup>

            <InputGroup>
              <Label style={{ maxWidth: '100%' }}>
                Nome
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Label>
              <div>
                <Label>
                  Comprimento (cm)
                  <Input
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                  />
                </Label>

                <Label>
                  Largura (cm)
                  <Input
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                </Label>

                <Label>
                  Altura (cm)
                  <Input
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </Label>

                {/* <Label>
                  Peso (kg)
                  <Input
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </Label> */}
              </div>
            </InputGroup>
          </Informations>

          <ButtonsWrapper>
            <MainButtons>
              <SaveButton onClick={() => handleSubmit()}>
                {!loading ? (
                  <>
                    <HiBadgeCheck />
                    Salvar seção
                  </>
                ) : (
                  <LoadingOutlined style={{ fontSize: 24 }} spin />
                )}
              </SaveButton>
              <BackButton onClick={() => history.push('/todas-as-caixas')}>
                Cancelar
              </BackButton>
              <RemoveButton onClick={() => handleRemove(boxData.state.id)}>
                {!loadingRemove ? (
                  <>Remover</>
                ) : (
                  <LoadingOutlined style={{ fontSize: 24 }} spin />
                )}
              </RemoveButton>
            </MainButtons>
          </ButtonsWrapper>
        </Content>
      </Container>
      ;
    </>
  );
};
