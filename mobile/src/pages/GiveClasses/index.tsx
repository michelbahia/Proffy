import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Container, ImageBackgroundContent, Title, Description, OkButton, OkButtonText,
} from './styles';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';

const GiveClasses:React.FC = () => {
  const { goBack } = useNavigation();

  function navigateBack() {
    goBack();
  }

  return (
    <Container>
      <ImageBackgroundContent resizeMode="contain" source={giveClassesBgImage}>
        <Title>
          Quer ser um Proffy?
        </Title>
        <Description>
          Para começar, você precisa se cadastrar como professor na nossa plataforma web.
        </Description>
      </ImageBackgroundContent>

      <OkButton onPress={navigateBack}>
        <OkButtonText>
          Tudo bem
        </OkButtonText>
      </OkButton>
    </Container>
  );
};
export default GiveClasses;
