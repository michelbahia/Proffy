import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Container, TeacherListScroll } from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { ITeacher } from '../../components/TeacherItem';

const Favorites:React.FC = () => {
  const [favorites, setFavorites] = useState([]);

  async function loadFavorites() {
    await AsyncStorage.getItem('proffyFavorites').then((response) => {
      if (response) {
        const favoriteTeachers = JSON.parse(response);

        setFavorites(favoriteTeachers);
      }
    });
  }

  useFocusEffect(() => {
    loadFavorites();
  });
  return (
    <Container>
      <PageHeader title="Meus Proffys favoritos" />

      <TeacherListScroll>
        {favorites.map((teacher: ITeacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            isFavorite
          />
        ))}
      </TeacherListScroll>
    </Container>
  );
};

export default Favorites;
