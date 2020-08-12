import React, { useState } from 'react';
import { Image, Linking, AsyncStorage } from 'react-native';
import {
  Container,
  Profile,
  Avatar,
  ProfileInfo,
  Name,
  Subject,
  Bio,
  Footer,
  Price,
  PriceValue,
  ButtonsContainer,
  FavoriteButton,
  ContactButton,
  ContactButtonText,
} from './styles';
import api from '../../services/api';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

export interface ITeacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface ITeacherItemProps {
  isFavorite: boolean;
  teacher: ITeacher;
}

const TeacherItem: React.FC<ITeacherItemProps> = ({ isFavorite, teacher }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  function LinkToWhatsapp() {
    api.post('connections', {
      user_id: teacher.id,
    });
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  async function ToggleFavorite() {
    const favorites = await AsyncStorage.getItem('proffyFavorites');

    let favoritesArray = [];
    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (favorite) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem: ITeacher) => (
        teacherItem.id === teacher.id));

      favoritesArray.splice(favoriteIndex, 1);
      setFavorite(false);
    } else {
      favoritesArray.push(teacher);
      setFavorite(true);
    }

    await AsyncStorage.setItem('proffyFavorites', JSON.stringify(favoritesArray));
  }
  return (
    <Container>
      <Profile>
        <Avatar source={{ uri: teacher.avatar }} />
        <ProfileInfo>
          <Name>{teacher.name}</Name>
          <Subject>{teacher.subject}</Subject>
        </ProfileInfo>
      </Profile>

      <Bio>{teacher.bio}</Bio>

      <Footer>
        <Price>
          Preço/hora
          {'   '}
          <PriceValue>{`R$: ${teacher.cost}`}</PriceValue>
        </Price>

        <ButtonsContainer>
          <FavoriteButton isFavorite={favorite} onPress={ToggleFavorite}>
            {favorite
              ? <Image source={unfavoriteIcon} />
              : <Image source={heartOutlineIcon} />}
          </FavoriteButton>

          <ContactButton onPress={LinkToWhatsapp}>
            <Image source={whatsappIcon} />
            <ContactButtonText>Entrar em contato</ContactButtonText>
          </ContactButton>
        </ButtonsContainer>
      </Footer>
    </Container>
  );
};
export default TeacherItem;
