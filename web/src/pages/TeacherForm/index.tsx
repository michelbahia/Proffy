import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
import PageHeader from '../../components/PageHeader';

import './styles.css';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import {
  optionsSubjectData,
  optionsWeekDayData,
} from '../../utils/optionsDataObject';
import api from '../../services/api';

interface IScheduleItem {
  id?: string;
  week_day: number;
  from: string;
  to: string;
}

const TeacherForm: React.FC = () => {
  const [scheduleItems, setScheduleItems] = useState<IScheduleItem[]>([
    { week_day: 0, from: '', to: '' },
  ]);
  const [nameInput, setNameInput] = useState<string>('');
  const [avatarInput, setAvatarInput] = useState<string>('');
  const [whatsappInput, setWhatsappInput] = useState<string>('');
  const [bioInput, setBioInput] = useState<string>('');
  const [subjectInput, setSubjectInput] = useState<string>('');
  const [costInput, setCostInput] = useState<string>('');

  const history = useHistory();

  function handleNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  }

  function handleCreateNewClass(e: React.FormEvent) {
    e.preventDefault();

    async function createNewClass() {
      try {
        await api.post('classes', {
          name: nameInput,
          avatar: avatarInput,
          whatsapp: whatsappInput,
          bio: bioInput,
          subject: subjectInput,
          cost: Number(costInput),
          schedule: scheduleItems,
        });
        history.push('/');
      } catch (error) {
        console.log(error);
        alert('Erro no cadastro!');
      }
    }
    createNewClass();
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string,
  ) {
    const updateScheduleItem = scheduleItems.map((scheduleItem, index) => {
      if (position === index) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updateScheduleItem);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />
      <main>
        <form onSubmit={handleCreateNewClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              type="text"
              name="name"
              label="Nome completo"
              value={nameInput}
              onChange={e => {
                setNameInput(e.target.value);
              }}
            />
            <Input
              type="text"
              name="avatar"
              label="Avatar"
              value={avatarInput}
              onChange={e => {
                setAvatarInput(e.target.value);
              }}
            />
            <Input
              type="text"
              name="whatsapp"
              label="Whatsapp"
              value={whatsappInput}
              onChange={e => {
                setWhatsappInput(e.target.value);
              }}
            />
            <TextArea
              name="bio"
              label="Biografia"
              value={bioInput}
              onChange={e => {
                setBioInput(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              options={optionsSubjectData}
              value={subjectInput}
              onChange={e => {
                setSubjectInput(e.target.value);
              }}
            />
            <Input
              type="text"
              name="cost"
              label="Custo da sua hora por aula"
              value={costInput}
              onChange={e => {
                setCostInput(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button onClick={handleNewScheduleItem} type="button">
                + novo horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  options={optionsWeekDayData}
                  value={scheduleItem.week_day}
                  onChange={e => {
                    setScheduleItemValue(index, 'week_day', e.target.value);
                  }}
                />
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={e => {
                    setScheduleItemValue(index, 'from', e.target.value);
                  }}
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={e => {
                    setScheduleItemValue(index, 'to', e.target.value);
                  }}
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante !
              <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};
export default TeacherForm;
