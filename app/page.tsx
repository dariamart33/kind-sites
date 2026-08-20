const packages = [
  {
    number: "01",
    name: "Старт",
    price: "39 000 ₽",
    description: "Одностраничный сайт для услуги, события или первого запуска.",
    details: ["до 7 смысловых блоков", "адаптация для телефона", "аналитика и публикация"],
  },
  {
    number: "02",
    name: "Бизнес",
    price: "69 000 ₽",
    description: "Большой лендинг или компактный сайт, который объясняет ценность бренда.",
    details: ["структура и помощь с текстом", "до 5 страниц или один лонгрид", "базовая поисковая настройка"],
  },
  {
    number: "03",
    name: "Особенный",
    price: "от 100 000 ₽",
    description: "Для проекта, которому нужен свой темп, каталог или нестандартная логика.",
    details: ["сценарий под задачу", "интеграции и интерактив", "понятная смета до старта"],
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav" aria-label="Основная навигация">
          <a className="brand" href="#top" aria-label="KIND SITES — на главную">
            KIND<span>•</span>SITES
          </a>
          <div className="nav-links">
            <a href="#formats">Форматы</a>
            <a href="#process">Процесс</a>
            <a href="#team">Команда</a>
          </div>
          <a className="nav-contact" href="#contact">Обсудить проект ↗</a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Небольшая digital-студия · Москва / онлайн</p>
            <h1>Сайт, после которого<br />вас хочется <i>выбрать.</i></h1>
            <p className="hero-description">
              Создаём выразительные сайты для небольшого бизнеса, экспертов и брендов — без
              лишней студийной сложности.
            </p>
            <div className="hero-actions">
              <a className="button button-lime" href="#formats">Выбрать формат <span>↓</span></a>
              <a className="text-link" href="#process">Как мы работаем <span>↘</span></a>
            </div>
          </div>

          <div className="hero-art" aria-label="Декоративная композиция KIND SITES">
            <span className="art-label art-label-top">web, but make it human</span>
            <span className="art-label art-label-bottom">since 2026</span>
            <div className="lime-orbit" />
            <div className="lime-disc" />
            <div className="hero-monogram">K<br />S</div>
          </div>
        </div>

        <div className="hero-footer">
          <span>Дизайн · тексты · разработка · запуск</span>
          <span>01 / 04</span>
        </div>
      </section>

      <section className="statement">
        <p className="eyebrow">Не просто красивая страница</p>
        <p className="statement-text">
          Сначала находим <i>главное</i> в вашем деле. Потом собираем это в сайт, который
          легко читать, приятно запоминать и не стыдно отправлять клиенту.
        </p>
      </section>

      <section className="packages" id="formats">
        <div className="section-heading">
          <p className="eyebrow">Форматы работы</p>
          <h2>Без загадок<br />в цене и процессе.</h2>
        </div>
        <div className="package-list">
          {packages.map((item) => (
            <article className="package" key={item.number}>
              <span className="package-number">{item.number}</span>
              <div className="package-title">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <ul>
                {item.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
              <strong>{item.price}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="case-study">
        <div className="case-ticker">SELECTED WORK · SELECTED WORK · SELECTED WORK ·</div>
        <div className="case-layout">
          <div>
            <p className="eyebrow">Собственный проект</p>
            <h2>Richy<br />Kind Eyes</h2>
          </div>
          <div className="case-visual" aria-label="Превью проекта Richy Kind Eyes">
            <span>RICHY<br />KIND<br />EYES</span>
            <div className="case-planet" />
          </div>
          <div className="case-description">
            <p>Личный сайт-портрет мейн-куна Риччи: история, характер, фотографии и QR-визитка.</p>
            <a className="text-link" href="https://richykindeyespussycat.ru/" target="_blank" rel="noreferrer">
              Открыть проект <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="process" id="process">
        <div className="section-heading">
          <p className="eyebrow">Как это происходит</p>
          <h2>Быстро — значит<br />без суеты.</h2>
        </div>
        <ol>
          <li><span>01</span><p>Созваниваемся на 20 минут и понимаем, кому и зачем нужен сайт.</p></li>
          <li><span>02</span><p>Дарья собирает структуру, визуальное направление и первые тексты.</p></li>
          <li><span>03</span><p>Показываем живой черновик, собираем правки и доводим детали.</p></li>
          <li><span>04</span><p>Тестируем, подключаем домен и передаём вам готовый сайт.</p></li>
        </ol>
      </section>

      <section className="team" id="team">
        <div className="team-intro">
          <p className="eyebrow">Команда KIND SITES</p>
          <h2>Небольшая команда.<br /><i>Личное</i> внимание.</h2>
        </div>
        <div className="people">
          <article className="person person-darya">
            <span className="person-initial">Д</span>
            <p className="person-role">Основательница · креативный директор</p>
            <h3>Дарья<br />Март</h3>
          </article>
          <article className="person person-maria">
            <span className="person-initial">М</span>
            <p className="person-role">Менеджер проектов</p>
            <h3>Мария</h3>
          </article>
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="eyebrow">Первый шаг — самый простой</p>
        <h2>Расскажите<br />о своём <i>деле.</i></h2>
        <p>Мария задаст несколько вопросов и поможет выбрать подходящий формат.</p>
        <a className="button button-lime contact-button" href="mailto:hello@kindsites.ru?subject=Проект%20для%20KIND%20SITES">
          Написать Марии <span>↗</span>
        </a>
      </section>

      <footer>
        <a className="brand" href="#top">KIND<span>•</span>SITES</a>
        <span>© 2026 Дарья Март</span>
        <span>Сайты с характером.</span>
      </footer>
    </main>
  );
}
