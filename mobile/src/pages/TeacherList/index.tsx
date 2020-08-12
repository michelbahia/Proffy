import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import {
  Container,
  TeacherListScroll,
  SearchForm,
  Label,
  Input,
  InputGroup,
  InputBlock,
  SubmitButton,
  SubmitText,
} from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { ITeacher } from '../../components/TeacherItem';
import api from '../../services/api';

const TeacherList:React.FC = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);

  const [favorites, setFavorites] = useState<number[]>([]);

  async function loadFavorites() {
    await AsyncStorage.getItem('proffyFavorites').then((response) => {
      if (response) {
        const favoriteTeachers = JSON.parse(response);
        const favoriteTeachersIds = favoriteTeachers.map((teacher: ITeacher) => teacher.id);

        setFavorites(favoriteTeachersIds);
      }
    });
  }

  function ToggleFiltersForm() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function FiltersSubmit() {
    loadFavorites();

    const response = await api.get('/classes', {
      params: {
        subject,
        week_day: weekDay,
        time,
      },
    });
    setIsFiltersVisible(false);
    setTeachers(response.data);
  }

  useFocusEffect(() => {
    loadFavorites();
  });
  return (
    <Container>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={ToggleFiltersForm}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        )}
      >
        { isFiltersVisible && (
          <SearchForm>
            <Label>Matéria</Label>
            <Input
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholder="Qual matéria?"
              placeholderTextColor="#c1bccc"
            />

            <InputGroup>
              <InputBlock>
                <Label>Dia da semana</Label>
                <Input
                  value={weekDay}
                  onChangeText={(text) => setWeekDay(text)}
                  placeholder="Qual dia?"
                  placeholderTextColor="#c1bccc"
                />
              </InputBlock>

              <InputBlock>
                <Label>Horário</Label>
                <Input
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                />
              </InputBlock>
            </InputGroup>
            <SubmitButton onPress={FiltersSubmit}>
              <SubmitText>Filtrar</SubmitText>
            </SubmitButton>
          </SearchForm>
        )}

      </PageHeader>
      <TeacherListScroll>
        {teachers.map((teacher: ITeacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            isFavorite={favorites.includes(teacher.id)}
          />
        ))}
      </TeacherListScroll>
    </Container>
  );
};

export default TeacherList;
