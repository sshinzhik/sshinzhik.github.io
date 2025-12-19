// Данные курсов
const coursesData = [
  {
    id: 1,
    title: "Fullstack-разработчик",
    description: "Освойте фронтенд и бэкенд: React, Node.js, базы данных и деплой. Полный цикл разработки веб-приложений.",
    type: "profession",
    duration: 6,
    hasJob: true,
    languages: ["js", "sql"],
    price: 6780,
    priceType: "monthly",
    icon: "⚛️",
    tags: ["С трудоустройством", "Диплом", "Проекты в портфолио"],
    popular: true
  },
  {
    id: 2,
    title: "PHP-разработчик",
    description: "Работа с серверной частью, фреймворки Laravel и Symfony, базы данных и API разработка.",
    type: "course",
    duration: 9,
    hasJob: true,
    languages: ["php", "sql"],
    price: 7550,
    priceType: "monthly",
    icon: "🐘",
    tags: ["С трудоустройством", "Сертификат"],
    popular: false
  },
  {
    id: 3,
    title: "Frontend-разработчик",
    description: "HTML, CSS, JavaScript, React, адаптивные интерфейсы и взаимодействие с API. Создание современных веб-интерфейсов.",
    type: "course",
    duration: 4,
    hasJob: false,
    languages: ["js"],
    price: 8990,
    priceType: "one-time",
    icon: "💡",
    tags: ["Портфолио", "Code Review"],
    popular: true
  },
  {
    id: 4,
    title: "Введение в Python",
    description: "Основы Python, структуры данных, работа с файлами, ООП. Идеальный курс для начала программирования.",
    type: "course",
    duration: 3,
    hasJob: false,
    languages: ["python"],
    price: 2200,
    priceType: "monthly",
    icon: "🐍",
    tags: ["Для начинающих", "Сертификат"],
    popular: true
  },
  {
    id: 5,
    title: "Java-разработчик",
    description: "Основы Java, Spring Framework, работа с базами данных, разработка корпоративных приложений.",
    type: "profession",
    duration: 8,
    hasJob: true,
    languages: ["java", "sql"],
    price: 8500,
    priceType: "monthly",
    icon: "☕",
    tags: ["С трудоустройством", "Диплом", "Ментор"],
    popular: false
  },
  {
    id: 6,
    title: "Анализ данных на Python",
    description: "Pandas, NumPy, визуализация данных, основы машинного обучения. Работа с реальными датасетами.",
    type: "course",
    duration: 5,
    hasJob: false,
    languages: ["python", "sql"],
    price: 5900,
    priceType: "monthly",
    icon: "📊",
    tags: ["Data Science", "Портфолио"],
    popular: true
  },
  {
    id: 7,
    title: "C++ для разработчиков",
    description: "Основы C++, ООП, алгоритмы и структуры данных, многопоточность. Для тех, кто хочет углубиться в низкоуровневое программирование.",
    type: "course",
    duration: 6,
    hasJob: false,
    languages: ["cpp"],
    price: 7200,
    priceType: "monthly",
    icon: "⚙️",
    tags: ["Сложный уровень", "Алгоритмы"],
    popular: false
  },
  {
    id: 8,
    title: "DevOps инженер",
    description: "Docker, Kubernetes, CI/CD, облачные технологии. Автоматизация процессов разработки и деплоя.",
    type: "profession",
    duration: 7,
    hasJob: true,
    languages: [],
    price: 9900,
    priceType: "monthly",
    icon: "🚀",
    tags: ["С трудоустройством", "Диплом", "Инфраструктура"],
    popular: true
  }
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Инициализация элементов DOM
  initElements();
  
  // Загрузка курсов
  renderCourses(coursesData);
  
  // Настройка фильтров
  setupFilters();
  
  // Настройка сортировки
  setupSorting();
  
  // Настройка формы
  setupForm();
  
  // Настройка модального окна
  setupModal();
  
  // Настройка кнопки "Наверх"
  setupBackToTop();
  
  // Настройка мобильного меню
  setupMobileMenu();
});

// Инициализация элементов DOM
function initElements() {
  // Элементы фильтров
  window.durationSlider = document.getElementById('duration-slider');
  window.durationValue = document.getElementById('duration-value');
  window.applyFiltersBtn = document.getElementById('apply-filters');
  window.resetFiltersBtn = document.getElementById('reset-filters');
  window.resetFiltersMainBtn = document.getElementById('reset-filters-main');
  window.withJobCheckbox = document.getElementById('with-job');
  window.languageCheckboxes = document.querySelectorAll('.lang');
  window.typeRadios = document.querySelectorAll('input[name="type"]');
  
  // Элементы курсов
  window.coursesGrid = document.getElementById('courses-grid');
  window.coursesCount = document.getElementById('courses-count');
  window.noCoursesMessage = document.getElementById('no-courses-message');
  
  // Элементы сортировки
  window.sortDropdownItems = document.querySelectorAll('.dropdown-menu a');
  
  // Элементы формы
  window.contactForm = document.getElementById('contact-form');
  
  // Элементы модального окна
  window.courseModal = document.getElementById('course-modal');
  window.modalCloseBtn = document.getElementById('modal-close');
  window.modalCloseBtn2 = document.getElementById('modal-close-btn');
  window.modalEnrollBtn = document.getElementById('modal-enroll-btn');
  window.modalCourseTitle = document.getElementById('modal-course-title');
  window.modalCourseDetails = document.getElementById('modal-course-details');
  
  // Другие элементы
  window.backToTopBtn = document.getElementById('back-to-top');
  window.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  window.nav = document.querySelector('.nav');
  
  // Текущие фильтры
  window.currentFilters = {
    duration: 24,
    withJob: false,
    languages: [],
    type: 'any'
  };
  
  // Текущая сортировка
  window.currentSort = 'popular';
}

// Рендеринг курсов
function renderCourses(courses) {
  if (courses.length === 0) {
    window.coursesGrid.style.display = 'none';
    window.noCoursesMessage.style.display = 'block';
    window.coursesCount.textContent = '0';
    return;
  }
  
  window.coursesGrid.style.display = 'grid';
  window.noCoursesMessage.style.display = 'none';
  window.coursesCount.textContent = courses.length;
  
  // Очищаем сетку
  window.coursesGrid.innerHTML = '';
  
  // Создаем карточки курсов
  courses.forEach(course => {
    const courseCard = createCourseCard(course);
    window.coursesGrid.appendChild(courseCard);
  });
}

// Создание карточки курса
function createCourseCard(course) {
  const card = document.createElement('article');
  card.className = 'course-card';
  card.dataset.id = course.id;
  card.dataset.duration = course.duration;
  card.dataset.job = course.hasJob;
  card.dataset.languages = course.languages.join(',');
  card.dataset.type = course.type;
  
  // Форматирование цены
  let priceText = '';
  if (course.priceType === 'monthly') {
    priceText = `${course.price}₽ / мес`;
  } else {
    priceText = `${course.price}₽ единовременно`;
  }
  
  // Иконка в зависимости от языка
  let iconClass = '';
  if (course.languages.includes('python')) iconClass = 'python';
  else if (course.languages.includes('js')) iconClass = 'js';
  else if (course.languages.includes('php')) iconClass = 'php';
  else if (course.languages.includes('sql')) iconClass = 'sql';
  else if (course.languages.includes('java')) iconClass = 'java';
  else if (course.languages.includes('cpp')) iconClass = 'cpp';
  else iconClass = 'default';
  
  // Тип обучения
  let typeText = '';
  if (course.type === 'profession') {
    typeText = 'Профессия';
  } else {
    typeText = 'Курс';
  }
  
  // Теги
  const tagsHTML = course.tags.map(tag => {
    let tagClass = 'tag';
    if (tag.includes('трудоустройством')) tagClass += ' job';
    else if (tag.includes('начинающих') || tag.includes('сложный')) tagClass += ' duration';
    else tagClass += ' language';
    
    return `<span class="${tagClass}">${tag}</span>`;
  }).join('');
  
  card.innerHTML = `
    <div class="course-header">
      <div>
        <h3 class="course-title">${course.title}</h3>
        <div class="course-meta">
          <span>${typeText}</span>
          <span>·</span>
          <span>${course.duration} мес</span>
          ${course.hasJob ? '<span>·</span><span>С трудоустройством</span>' : ''}
        </div>
      </div>
      <div class="course-icon ${iconClass}">
        ${course.icon}
      </div>
    </div>
    
    <div class="course-body">
      <p class="course-description">${course.description}</p>
      <div class="course-tags">
        ${tagsHTML}
      </div>
    </div>
    
    <div class="course-footer">
      <div class="course-price">
        <div class="price-amount">${course.price}₽</div>
        <div class="price-period">
          ${course.priceType === 'monthly' ? '/ месяц' : 'единовременно'}
        </div>
      </div>
      
      <div class="course-actions">
        <button class="btn btn-outline course-details-btn" data-id="${course.id}">
          Подробнее
        </button>
        <button class="btn btn-primary course-enroll-btn" data-id="${course.id}">
          Записаться
        </button>
      </div>
    </div>
  `;
  
  // Добавляем обработчики событий
  const detailsBtn = card.querySelector('.course-details-btn');
  const enrollBtn = card.querySelector('.course-enroll-btn');
  
  detailsBtn.addEventListener('click', () => showCourseDetails(course.id));
  enrollBtn.addEventListener('click', () => enrollInCourse(course.id));
  
  return card;
}

// Настройка фильтров
function setupFilters() {
  // Слайдер длительности
  window.durationSlider.addEventListener('input', function() {
    const value = this.value;
    window.durationValue.textContent = `${value} мес`;
    window.currentFilters.duration = parseInt(value);
  });
  
  // Чекбокс "С трудоустройством"
  window.withJobCheckbox.addEventListener('change', function() {
    window.currentFilters.withJob = this.checked;
  });
  
  // Чекбоксы языков программирования
  window.languageCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const selectedLanguages = Array.from(window.languageCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      
      window.currentFilters.languages = selectedLanguages;
    });
  });
  
  // Радиокнопки типа обучения
  window.typeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        window.currentFilters.type = this.value;
      }
    });
  });
  
  // Кнопка применения фильтров
  window.applyFiltersBtn.addEventListener('click', applyFilters);
  
  // Кнопка сброса фильтров (в боковой панели)
  window.resetFiltersBtn.addEventListener('click', resetFilters);
  
  // Кнопка сброса фильтров (в основном контенте)
  if (window.resetFiltersMainBtn) {
    window.resetFiltersMainBtn.addEventListener('click', resetFilters);
  }
}

// Применение фильтров
function applyFilters() {
  const filteredCourses = coursesData.filter(course => {
    // Фильтр по длительности
    if (course.duration > window.currentFilters.duration) {
      return false;
    }
    
    // Фильтр по трудоустройству
    if (window.currentFilters.withJob && !course.hasJob) {
      return false;
    }
    
    // Фильтр по языкам программирования
    if (window.currentFilters.languages.length > 0) {
      const hasMatchingLanguage = window.currentFilters.languages.some(lang => 
        course.languages.includes(lang)
      );
      
      if (!hasMatchingLanguage) {
        return false;
      }
    }
    
    // Фильтр по типу обучения
    if (window.currentFilters.type !== 'any' && course.type !== window.currentFilters.type) {
      return false;
    }
    
    return true;
  });
  
  // Применяем сортировку
  const sortedCourses = sortCourses(filteredCourses, window.currentSort);
  
  // Рендерим отфильтрованные курсы
  renderCourses(sortedCourses);
}

// Сброс фильтров
function resetFilters() {
  // Сбрасываем слайдер
  window.durationSlider.value = 24;
  window.durationValue.textContent = '24 мес';
  window.currentFilters.duration = 24;
  
  // Сбрасываем чекбокс "С трудоустройством"
  window.withJobCheckbox.checked = false;
  window.currentFilters.withJob = false;
  
  // Сбрасываем чекбоксы языков
  window.languageCheckboxes.forEach(cb => cb.checked = false);
  window.currentFilters.languages = [];
  
  // Сбрасываем радиокнопки типа
  document.querySelector('input[name="type"][value="any"]').checked = true;
  window.currentFilters.type = 'any';
  
  // Применяем фильтры (показываем все курсы)
  applyFilters();
}

// Настройка сортировки
function setupSorting() {
  window.sortDropdownItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      const sortType = this.dataset.sort;
      window.currentSort = sortType;
      
      // Обновляем текст кнопки
      const dropdownToggle = document.querySelector('.dropdown-toggle');
      let sortText = 'Сортировать';
      
      switch(sortType) {
        case 'popular':
          sortText = 'По популярности';
          break;
        case 'price-asc':
          sortText = 'По цене (сначала дешевле)';
          break;
        case 'price-desc':
          sortText = 'По цене (сначала дороже)';
          break;
        case 'duration':
          sortText = 'По длительности';
          break;
      }
      
      dropdownToggle.innerHTML = `<i class="fas fa-sort-amount-down"></i> ${sortText}`;
      
      // Применяем сортировку к текущим курсам
      const currentCourses = getCurrentCourses();
      const sortedCourses = sortCourses(currentCourses, sortType);
      renderCourses(sortedCourses);
    });
  });
}

// Получение текущих курсов (после фильтрации)
function getCurrentCourses() {
  const courseCards = document.querySelectorAll('.course-card');
  const currentCourses = [];
  
  courseCards.forEach(card => {
    const courseId = parseInt(card.dataset.id);
    const course = coursesData.find(c => c.id === courseId);
    if (course) {
      currentCourses.push(course);
    }
  });
  
  return currentCourses;
}

// Сортировка курсов
function sortCourses(courses, sortType) {
  const sortedCourses = [...courses];
  
  switch(sortType) {
    case 'popular':
      sortedCourses.sort((a, b) => {
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        return 0;
      });
      break;
      
    case 'price-asc':
      sortedCourses.sort((a, b) => a.price - b.price);
      break;
      
    case 'price-desc':
      sortedCourses.sort((a, b) => b.price - a.price);
      break;
      
    case 'duration':
      sortedCourses.sort((a, b) => a.duration - b.duration);
      break;
  }
  
  return sortedCourses;
}

// Настройка формы
function setupForm() {
  window.contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const question = document.getElementById('question').value.trim();
    
    // Простая валидация
    if (!contact) {
      showAlert('Пожалуйста, укажите телефон или email.', 'error');
      return;
    }
    
    // Имитация отправки формы
    showAlert(`Заявка принята! Спасибо, ${name || 'пользователь'}. Мы свяжемся с вами в ближайшее время.`, 'success');
    
    // Сброс формы
    this.reset();
    
    // Имитация отправки на сервер (в реальном приложении здесь был бы fetch)
    setTimeout(() => {
      console.log('Заявка отправлена:', { name, contact, question });
    }, 500);
  });
}

// Показать уведомление
function showAlert(message, type) {
  // Удаляем предыдущие уведомления
  const existingAlert = document.querySelector('.alert');
  if (existingAlert) {
    existingAlert.remove();
  }
  
  // Создаем уведомление
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.innerHTML = `
    <div class="alert-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
    </div>
    <button class="alert-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Добавляем стили для уведомления
  const style = document.createElement('style');
  style.textContent = `
    .alert {
      position: fixed;
      top: 20px;
      right: 20px;
      max-width: 400px;
      padding: 16px 20px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      z-index: 1001;
      animation: slideIn 0.3s ease;
    }
    
    .alert-success {
      background-color: #d4edda;
      color: #155724;
      border-left: 4px solid #28a745;
    }
    
    .alert-error {
      background-color: #f8d7da;
      color: #721c24;
      border-left: 4px solid #dc3545;
    }
    
    .alert-content {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
    }
    
    .alert-close {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      font-size: 16px;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    
    .alert-close:hover {
      opacity: 1;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(alert);
  
  // Кнопка закрытия уведомления
  const closeBtn = alert.querySelector('.alert-close');
  closeBtn.addEventListener('click', () => {
    alert.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => alert.remove(), 300);
  });
  
  // Автоматическое закрытие через 5 секунд
  setTimeout(() => {
    if (alert.parentNode) {
      alert.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => alert.remove(), 300);
    }
  }, 5000);
}

// Настройка модального окна
function setupModal() {
  // Закрытие модального окна
  function closeModal() {
    window.courseModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  // Открытие модального окна
  function openModal() {
    window.courseModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  // Обработчики закрытия
  window.modalCloseBtn.addEventListener('click', closeModal);
  window.modalCloseBtn2.addEventListener('click', closeModal);
  window.modalEnrollBtn.addEventListener('click', () => {
    const courseId = window.modalEnrollBtn.dataset.courseId;
    enrollInCourse(parseInt(courseId));
    closeModal();
  });
  
  // Закрытие по клику вне модального окна
  window.courseModal.addEventListener('click', (e) => {
    if (e.target === window.courseModal) {
      closeModal();
    }
  });
  
  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.courseModal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Показать детали курса в модальном окне
function showCourseDetails(courseId) {
  const course = coursesData.find(c => c.id === courseId);
  if (!course) return;
  
  // Обновляем заголовок
  window.modalCourseTitle.textContent = course.title;
  
  // Обновляем детали курса
  const typeText = course.type === 'profession' ? 'Профессия' : 'Курс';
  const jobText = course.hasJob ? 'Да' : 'Нет';
  const languagesText = course.languages.length > 0 
    ? course.languages.map(lang => {
        switch(lang) {
          case 'python': return 'Python';
          case 'js': return 'JavaScript';
          case 'php': return 'PHP';
          case 'sql': return 'SQL';
          case 'java': return 'Java';
          case 'cpp': return 'C++';
          default: return lang;
        }
      }).join(', ')
    : 'Не применимо';
  
  const priceText = course.priceType === 'monthly' 
    ? `${course.price}₽ в месяц (${course.price * course.duration}₽ всего)`
    : `${course.price}₽ единовременно`;
  
  window.modalCourseDetails.innerHTML = `
    <div class="modal-course-info">
      <div class="info-row">
        <div class="info-label">Тип обучения:</div>
        <div class="info-value">${typeText}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Длительность:</div>
        <div class="info-value">${course.duration} месяцев</div>
      </div>
      <div class="info-row">
        <div class="info-label">Трудоустройство:</div>
        <div class="info-value">${jobText}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Языки программирования:</div>
        <div class="info-value">${languagesText}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Стоимость:</div>
        <div class="info-value">${priceText}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Описание:</div>
        <div class="info-value">${course.description}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Теги:</div>
        <div class="info-value tags">
          ${course.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
    
    <style>
      .modal-course-info {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .info-row {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 12px;
        border-bottom: 1px solid #f0f0f0;
      }
      
      .info-label {
        font-weight: 600;
        min-width: 200px;
        color: #333;
      }
      
      .info-value {
        flex: 1;
        color: #555;
        line-height: 1.5;
      }
      
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      
      .tags .tag {
        background-color: #f0f7ff;
        color: #0043FF;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
      }
    </style>
  `;
  
  // Сохраняем ID курса для кнопки записи
  window.modalEnrollBtn.dataset.courseId = courseId;
  
  // Открываем модальное окно
  openModal();
}

// Запись на курс
function enrollInCourse(courseId) {
  const course = coursesData.find(c => c.id === courseId);
  if (!course) return;
  
  showAlert(`Вы записались на курс "${course.title}"! Мы свяжемся с вами для подтверждения.`, 'success');
  
  // Имитация отправки на сервер
  setTimeout(() => {
    console.log('Запись на курс:', courseId);
  }, 500);
}

// Настройка кнопки "Наверх"
function setupBackToTop() {
  window.backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Показ/скрытие кнопки при прокрутке
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      window.backToTopBtn.style.opacity = '1';
      window.backToTopBtn.style.visibility = 'visible';
    } else {
      window.backToTopBtn.style.opacity = '0';
      window.backToTopBtn.style.visibility = 'hidden';
    }
  });
}

// Настройка мобильного меню
function setupMobileMenu() {
  window.mobileMenuBtn.addEventListener('click', () => {
    window.nav.classList.toggle('active');
    window.mobileMenuBtn.innerHTML = window.nav.classList.contains('active')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
  
  // Закрытие меню при клике на ссылку
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      window.nav.classList.remove('active');
      window.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
  
  // Закрытие меню при изменении размера окна
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      window.nav.classList.remove('active');
      window.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
}// Фильтрация курсов (работает с HTML)
function filterCourses() {
  const selDur = parseInt(document.getElementById('dur').value);
  const needJob = document.getElementById('with-job').checked;
  
  // Получаем выбранные языки
  const selLangs = Array.from(document.querySelectorAll('.lang:checked'))
    .map(cb => cb.value);
  
  // Получаем выбранный тип обучения
  const selectedType = document.querySelector('input[name="type"]:checked').value;
  
  const cards = document.querySelectorAll('.course');
  let visibleCount = 0;
  
  cards.forEach(card => {
    const duration = parseInt(card.dataset.duration);
    const lang = card.dataset.lang;
    const job = card.dataset.job === 'true';
    const type = card.dataset.type;
    
    let visible = true;
    
    // Фильтр по длительности
    if (duration > selDur) visible = false;
    
    // Фильтр по трудоустройству
    if (needJob && !job) visible = false;
    
    // Фильтр по языкам
    if (selLangs.length > 0 && lang) {
      const langsArray = lang.split(',').filter(l => l.trim());
      const hasMatchingLang = langsArray.some(l => selLangs.includes(l));
      if (!hasMatchingLang) visible = false;
    }
    
    // Фильтр по типу обучения
    if (selectedType !== 'any' && type !== selectedType) visible = false;
    
    // Показываем/скрываем карточку
    card.style.display = visible ? 'flex' : 'none';
    
    if (visible) visibleCount++;
  });
  
  // Обновляем счетчик
  const coursesCount = document.querySelector('.courses-header h2 span');
  if (coursesCount) {
    coursesCount.textContent = ` (${visibleCount})`;
  }
  
  // Обновляем общий счетчик
  const totalCount = document.getElementById('courses-count');
  if (totalCount) {
    totalCount.textContent = visibleCount;
  }
  
  // Показываем сообщение, если курсов не найдено
  const noCoursesMessage = document.getElementById('no-courses-message');
  if (noCoursesMessage) {
    if (visibleCount === 0) {
      noCoursesMessage.classList.add('active');
    } else {
      noCoursesMessage.classList.remove('active');
    }
  }
}

// Сброс фильтров
function resetFilters() {
  // Сбрасываем слайдер
  const durSlider = document.getElementById('dur');
  const durVal = document.getElementById('durVal');
  durSlider.value = 24;
  durVal.textContent = '24';
  
  // Сбрасываем чекбокс "С трудоустройством"
  document.getElementById('with-job').checked = false;
  
  // Сбрасываем чекбоксы языков
  document.querySelectorAll('.lang').forEach(cb => cb.checked = false);
  
  // Сбрасываем радиокнопки типа
  document.querySelector('input[name="type"][value="any"]').checked = true;
  
  // Применяем фильтры
  filterCourses();
}

// Сортировка курсов
function sortCourses(sortType) {
  const container = document.getElementById('coursesGrid');
  const cards = Array.from(container.querySelectorAll('.course'));
  
  cards.sort((a, b) => {
    const aPrice = parseInt(a.querySelector('.price-amount').textContent.replace(/\s/g, ''));
    const bPrice = parseInt(b.querySelector('.price-amount').textContent.replace(/\s/g, ''));
    const aDuration = parseInt(a.dataset.duration);
    const bDuration = parseInt(b.dataset.duration);
    const aTitle = a.querySelector('.title').textContent;
    const bTitle = b.querySelector('.title').textContent;
    
    switch(sortType) {
      case 'price-asc':
        return aPrice - bPrice;
      case 'price-desc':
        return bPrice - aPrice;
      case 'duration':
        return aDuration - bDuration;
      case 'title':
        return aTitle.localeCompare(bTitle);
      default:
        return 0;
    }
  });
  
  // Переставляем карточки
  cards.forEach(card => container.appendChild(card));
}

// Обработчики для кнопок курсов
document.addEventListener('DOMContentLoaded', function() {
  // Слайдер длительности
  const durSlider = document.getElementById('dur');
  const durVal = document.getElementById('durVal');
  
  if (durSlider && durVal) {
    durSlider.addEventListener('input', function() {
      durVal.textContent = this.value;
    });
  }
  
  // Кнопки фильтров
  const applyFiltersBtn = document.getElementById('applyFilters');
  const resetFiltersBtn = document.getElementById('resetFilters');
  
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', filterCourses);
  }
  
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', resetFilters);
  }
  
  // Кнопка сброса в сообщении о пустых результатах
  const resetFiltersInline = document.getElementById('reset-filters-inline');
  if (resetFiltersInline) {
    resetFiltersInline.addEventListener('click', resetFilters);
  }
  
  // Обработчики для чекбоксов и радиокнопок
  document.querySelectorAll('#with-job, .lang, input[name="type"]').forEach(input => {
    input.addEventListener('change', filterCourses);
  });
  
  // Сортировка
  const sortButtons = document.querySelectorAll('.dropdown-menu a');
  sortButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const sortType = this.dataset.sort;
      sortCourses(sortType);
    });
  });
  
  // Обработчики для кнопок "Подробнее" и "Записаться"
  document.addEventListener('click', function(e) {
    // Кнопка "Подробнее"
    if (e.target.classList.contains('course-details') || 
        e.target.closest('.course-details')) {
      const courseCard = e.target.closest('.course');
      const courseTitle = courseCard.querySelector('.title').textContent;
      alert(`Подробнее о курсе: ${courseTitle}\n\nВ реальном сайте здесь будет открытие страницы курса с детальной информацией.`);
    }
    
    // Кнопка "Записаться"
    if (e.target.classList.contains('course-enroll') || 
        e.target.closest('.course-enroll')) {
      const courseCard = e.target.closest('.course');
      const courseTitle = courseCard.querySelector('.title').textContent;
      const coursePrice = courseCard.querySelector('.price-amount').textContent;
      
      if (confirm(`Записаться на курс "${courseTitle}" за ${coursePrice}₽?`)) {
        alert('Вы успешно записаны на курс! Мы свяжемся с вами для подтверждения.');
      }
    }
  });
  
  // Обработка формы контактов
  document.getElementById('sendBtn').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const contact = document.getElementById('contact').value.trim();
    if(!contact){
      alert('Пожалуйста, укажите телефон или email.');
      return;
    }
    alert('Заявка принята. Спасибо, ' + (name || 'пользователь') + '!' );
    document.getElementById('contactForm').reset();
  });
  
  // Применяем фильтры при изменении слайдера
  if (durSlider) {
    durSlider.addEventListener('change', filterCourses);
  }
  
  // Инициализация счетчика
  const courseCards = document.querySelectorAll('.course');
  const coursesCount = document.querySelector('.courses-header h2 span');
  const totalCount = document.getElementById('courses-count');
  
  if (coursesCount) {
    coursesCount.textContent = ` (${courseCards.length})`;
  }
  
  if (totalCount) {
    totalCount.textContent = courseCards.length;
  }
  
  // Применяем фильтры при загрузке
  filterCourses();
});