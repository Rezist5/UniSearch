import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewList from '../components/ReviewList';
import CreateScholarship from '../components/modals/CreateScholarship';
import CreateSubject from '../components/modals/CreateSubject';
import  AddImageToUniversity  from '../components/modals/AddImageToUniversity';
import  AddDirectionToUniversity  from '../components/modals/AddDirectionToUniversity';
import  AddLanguageToUniversity  from '../components/modals/AddLanguageToUniversity';
import { fetchOneUniversity } from '../http/universityAPI';
import { getRepresentativeInfo } from '../http/userAPI';
import { Context } from "../index";
import UniImage from '../components/UniImages';
import ScholarshipList from '../components/ScholarshipList';

const UniversityPage = () => {
  const [university, setUniversity] = useState({ info: [] });
  const [showScholarshipModal, setShowScholarshipModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showDirectionModal, setShowDirectionModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const { universityId } = useParams();
  const { user } = useContext(Context);

  const [repInfo, setRepInfo] = useState(null);

  useEffect(() => {
    // Загрузка информации об университете
    fetchOneUniversity(universityId)
      .then(data => setUniversity(data))
      .catch(error => console.error('Error fetching university:', error));

    // Загрузка информации о представителе
    const loadRepInfo = async () => {
      try {
        const repInfoData = await getRepresentativeInfo(user.id);
        setRepInfo(repInfoData);
      } catch (error) {
        console.error('Error fetching representative info:', error);
      }
    };

    if (user.role === 'REPRESENTATIVE') {
      loadRepInfo();
    }
  }, [universityId, user.id, user.role]);

  const handleShowScholarshipModal = () => setShowScholarshipModal(true);
  const handleCloseScholarshipModal = () => setShowScholarshipModal(false);
  const handleShowSubjectModal = () => setShowSubjectModal(true);
  const handleCloseSubjectModal = () => setShowSubjectModal(false);
  const handleShowImageModal = () => setShowImageModal(true);
  const handleCloseImageModal = () => setShowImageModal(false);
  const handleShowDirectionModal = () => setShowDirectionModal(true);
  const handleCloseDirectionModal = () => setShowDirectionModal(false);
  const handleShowLanguageModal = () => setShowLanguageModal(true);
  const handleCloseLanguageModal = () => setShowLanguageModal(false);


  return (   
    <div>
      {/* Вывод информации об университете */}
      <UniImage universityId={universityId} />
      <h1>{university.name}</h1>
      <p>Город: {university.city}</p>
      <p>Рейтинг: {university.rating}</p>
      <p>Год основания: {university.YearOfFoundation}</p>
      <p>Количество студентов: {university.NumberOfStudents}</p>
      
      {/* Кнопка для создания стипендии */}
      {(user.role === "ADMIN" || (repInfo && repInfo.universityId === university.id)) && (
        <button onClick={handleShowScholarshipModal}>Создать стипендию</button>
      )}
      {/* Кнопка для создания предмета */}
      {(user.role === "ADMIN" || (repInfo && repInfo.universityId === university.id)) && (
        <button onClick={handleShowSubjectModal}>Создать предмет</button>
      )}
      {(user.role === "ADMIN" || (repInfo && repInfo.universityId === university.id)) && (
        <button onClick={handleShowImageModal}>Добавить изображения</button>
      )}
      {/* Кнопка для добавления направления */}
      {(user.role === "ADMIN" || (repInfo && repInfo.universityId === university.id)) && (
        <button onClick={handleShowDirectionModal}>Добавить направление</button>
      )}
      {(user.role === "ADMIN" || (repInfo && repInfo.universityId === university.id)) && (
        <button onClick={handleShowLanguageModal}>Добавить язык</button>
      )}


      <h2>Отзывы</h2>
      {/* Компонент для отображения списка отзывов */}
      <ReviewList universityId={universityId} />

      <ScholarshipList universityId={universityId} />

      {/* Модальное окно для создания стипендии */}
      <CreateScholarship
        show={showScholarshipModal}
        onHide={handleCloseScholarshipModal}
        university={university}
      />
      {/* Модальное окно для создания предмета */}
      <CreateSubject
        show={showSubjectModal}
        onHide={handleCloseSubjectModal}
        universityId={universityId}
      />
      {/* Модальное окно для добавления изображений */}
      <AddImageToUniversity
        show={showImageModal}
        onHide={handleCloseImageModal}
        university={university}
      />
      {/* Модальное окно для добавления направления */}
      <AddDirectionToUniversity
        show={showDirectionModal}
        onHide={handleCloseDirectionModal}
        university={university}
      />
      <AddLanguageToUniversity
        show={showLanguageModal}
        onHide={handleCloseLanguageModal}
        university={university}
      />
    </div>
  );
};

export default UniversityPage;
