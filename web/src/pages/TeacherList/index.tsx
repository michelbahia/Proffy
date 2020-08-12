import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { ITeacherData } from '../../components/TeacherItem';

import './styles.css';

import Input from '../../components/Input';
import Select from '../../components/Select';
import {
  optionsSubjectData,
  optionsWeekDayData,
} from '../../utils/optionsDataObject';

import api from '../../services/api';

const TeacherList: React.FC = () => {
  const [subjectInput, setSubjectInput] = useState('');
  const [weekDayInput, setWeekDayInput] = useState('');
  const [timeInput, setTimeInput] = useState('');

  const [teachers, setTeachers] = useState([]);

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();
    const response = await api.get('classes', {
      params: {
        week_day: weekDayInput,
        subject: subjectInput,
        time: timeInput,
      },
    });
    setTeachers(response.data);
  }
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form onSubmit={searchTeachers} id="search-teachers">
          <Select
            name="subject"
            label="Matéria"
            options={optionsSubjectData}
            value={subjectInput}
            onChange={e => setSubjectInput(e.target.value)}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            options={optionsWeekDayData}
            value={weekDayInput}
            onChange={e => setWeekDayInput(e.target.value)}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={timeInput}
            onChange={e => setTimeInput(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: ITeacherData) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
};
export default TeacherList;
