import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/Auth';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { HiBadgeCheck } from 'react-icons/hi';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { LoadingOutlined } from '@ant-design/icons';

import grayBox from '../../assets/box/grayBox.png';
import addBox from '../../assets/box/addBox.svg';
import api from '../../services/api';

import {
  BackButton,
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

export const CreateBoxes = () => {
  const navigate = useNavigate();
  const { data, setData } = useAuth();

  const [name, setName] = useState('');
  const [length, setLength] = useState<string>();
  const [width, setWidth] = useState<string>();
  const [height, setHeight] = useState<string>();
  // const [weight, setWeight] = useState<string>();
  const [userImg, setUserImg] = useState('');
  const [fileSelected, setFileSelected] = useState<any>();
  const [fileSelectedPreview, setFileSelectedPreview] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserImg((data.user as any)?.avatar_url);
  }, []);

  const validateFormFields = () => {
    if (!name.trim() || !length || !width || !height) {
      return false;
    }
    return true;
  };

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    setFileSelected(fileList[0]);
    setFileSelectedPreview(URL.createObjectURL(fileList[0]));
  };

  const handleSubmit = async () => {
    if (!validateFormFields()) {
      toast.error('Digite todos os campos!');
      return;
    }

    const floatData = {
      width: width ? Number(width.replace(/,/g, '.')) : 0,
      height: height ? Number(height.replace(/,/g, '.')) : 0,
      length: length ? Number(length.replace(/,/g, '.')) : 0,
    }

    const formData: any = new FormData();

    formData.append('name', name);
    formData.append('width', floatData.width);
    formData.append('height', floatData.height);
    formData.append('length', floatData.length);
    if (fileSelected) {
      formData.append('image', fileSelected, fileSelected.name);
    }
    setLoading(true);
    try {
      const res = await api.post(`/boxes`, formData, {
        headers: {
          'Content-Type': `multipart/form-data;`,
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      setUserImg(res.data.avatar_url);
      setData({
        ...data,
        access_token: data.access_token,
        user: res.data,
        saveLogin: data.saveLogin,
      });
      setLoading(false);
      toast.success('Caixa cadastrada com sucesso!');
      navigate('/todas-as-caixas');
    } catch (err) {
      handleError(err);
      setLoading(false);
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
            <PageTitle>Nova caixa</PageTitle>
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
                <img
                  src={fileSelectedPreview || grayBox}
                  alt="Adicionar imagem"
                />

                <AddImageIcon src={addBox} alt="Ícone de camera" />
              </AddImageContainer>
            </InfoGroup>

            <InputGroup>
              <Label style={{ maxWidth: '100%' }}>
                Nome
                <Input name={name} onChange={(e) => setName(e.target.value)} />
              </Label>

              <div>
                <Label>
                  Comprimento (cm)
                  <Input
                    value={length}
                    onChange={(e: any) => setLength(e.target.value)}
                  />
                </Label>

                <Label>
                  Largura (cm)
                  <Input
                    value={width}
                    onChange={(e: any) => setWidth(e.target.value)}
                  />
                </Label>

                <Label>
                  Altura (cm)
                  <Input
                    value={height}
                    onChange={(e: any) => setHeight(e.target.value)}
                  />
                </Label>

                {/* <Label>
                  Peso (kg)
                  <Input
                    value={weight}
                    onChange={(e: any) => setWeight(e.target.value)}
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
              <BackButton onClick={() => navigate('/todas-as-caixas')}>
                Cancelar
              </BackButton>
            </MainButtons>
          </ButtonsWrapper>
        </Content>
      </Container>
      ;
    </>
  );
};
