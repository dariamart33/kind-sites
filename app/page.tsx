const packages = [
  {
    name: "Старт",
    note: "Для первой понятной точки присутствия.",
    price: "39 000 ₽",
    details: ["до 7 смысловых блоков", "адаптация для телефона", "аналитика и публикация", "срок — от 7 дней"],
  },
  {
    name: "Бизнес",
    note: "Когда бренду нужно рассказать больше.",
    price: "69 000 ₽",
    featured: true,
    details: ["структура и помощь с текстом", "до 5 страниц или один лонгрид", "базовая поисковая настройка", "срок — от 14 дней"],
  },
  {
    name: "Особенный",
    note: "Для задач со своим сценарием и характером.",
    price: "от 100 000 ₽",
    details: ["сценарий под задачу", "интерактив и интеграции", "понятная смета до старта", "поддержка после запуска"],
  },
];

const questions = [
  "Сколько длится разработка?",
  "Поможете с текстом и структурой?",
  "Можно начать без готового фирменного стиля?",
  "Что входит в публикацию сайта?",
  "Сможем ли мы сами менять информацию?",
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav" aria-label="Основная навигация">
          <a className="brand" href="#top" aria-label="KIND SITES — на главную">KIND<span>•</span>SITES</a>
          <div className="nav-links"><a href="#formats">Тарифы</a><a href="#process">Процесс</a><a href="#team">О нас</a></div>
          <a className="nav-contact" href="#contact">Обсудить проект <b>↗</b></a>
        </nav>

        <div className="hero-copy">
          <p className="eyebrow">Небольшая digital-студия · Москва / онлайн</p>
          <h1>Сайты с характером.<br /><i>Понятные</i> для людей.</h1>
          <p>Собираем выразительные сайты для небольшого бизнеса, экспертов и брендов — от первой идеи до запуска.</p>
          <div className="hero-actions"><a className="button button-violet" href="#formats">Выбрать формат <span>→</span></a><a className="ghost-link" href="#process">Как мы работаем</a></div>
        </div>

        <div className="hero-art" aria-label="Декоративная композиция KIND SITES">
          <span className="hero-tag tag-one">дизайн, тексты, разработка</span>
          <span className="hero-tag tag-two">без лишней сложности ✦</span>
          <div className="glass-letter letter-k">K</div><div className="glass-letter letter-s">S</div>
          <div className="purple-haze" />
        </div>
        <div className="hero-footer"><span>Сайт — это разговор с вашим клиентом</span><span>01 / 05</span></div>
      </section>

      <section className="statement">
        <p className="eyebrow">Зачем KIND SITES</p>
        <p className="statement-text">Не делаем «как у всех». Находим <i>главное</i> в вашем деле и превращаем его в сайт, который хочется открыть ещё раз.</p>
      </section>

      <section className="packages" id="formats">
        <div className="center-heading"><p className="eyebrow">Простые тарифы</p><h2>Ясный объём.<br /><i>Честная</i> цена.</h2><p>Выбираем подходящий старт, а всё нестандартное считаем отдельно и заранее.</p></div>
        <div className="pricing-grid">
          {packages.map((item) => <article className={`price-card ${item.featured ? "price-card-featured" : ""}`} key={item.name}>
            <span className="card-mark">K</span><h3>{item.name}</h3><p>{item.note}</p><div className="price">{item.price}</div>
            <a className="card-button" href="#contact">Выбрать <span>→</span></a>
            <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          </article>)}
        </div>
      </section>

      <section className="case-study">
        <p className="eyebrow">Недавний проект</p>
        <div className="case-layout"><div><h2>Richy<br /><i>Kind Eyes</i></h2><p>Личный сайт-портрет мейн-куна Риччи: история, характер, фотографии и QR-визитка.</p><a className="button button-violet" href="https://richykindeyespussycat.ru/" target="_blank" rel="noreferrer">Открыть кейс <span>↗</span></a></div><div className="case-visual"><span>RICHY<br />KIND<br />EYES</span><div className="case-orb" /></div></div>
      </section>

      <section className="process" id="process">
        <div className="section-heading"><p className="eyebrow">Как это происходит</p><h2>Спокойно,<br /><i>по шагам.</i></h2></div>
        <ol><li><span>01</span><p>Созваниваемся на 20 минут и понимаем, кому и зачем нужен сайт.</p></li><li><span>02</span><p>Дарья собирает структуру, визуальное направление и первые тексты.</p></li><li><span>03</span><p>Показываем живой черновик, собираем правки и доводим детали.</p></li><li><span>04</span><p>Тестируем, подключаем домен и передаём вам готовый сайт.</p></li></ol>
      </section>

      <section className="team" id="team"><div className="team-intro"><p className="eyebrow">Команда KIND SITES</p><h2>Небольшая команда.<br /><i>Личное</i> внимание.</h2></div><div className="people"><article className="person person-darya"><span className="person-initial">Д</span><p>Основательница · креативный директор</p><h3>Дарья<br />Март</h3></article><article className="person person-maria"><span className="person-initial">М</span><p>Менеджер проектов</p><h3>Мария</h3></article></div></section>

      <section className="faq"><div className="center-heading"><p className="eyebrow">Коротко о важном</p><h2>Вопросы<br /><i>без неловкости.</i></h2></div><div className="faq-list">{questions.map((question) => <div className="faq-row" key={question}><span>{question}</span><b>+</b></div>)}</div></section>

      <section className="contact" id="contact"><div className="contact-orb" /><p className="eyebrow">Первый шаг — самый простой</p><h2>Давайте сделаем<br /><i>что-то своё.</i></h2><p>Мария задаст несколько вопросов и поможет выбрать подходящий формат.</p><a className="button button-violet" href="mailto:hello@kindsites.ru?subject=Проект%20для%20KIND%20SITES">Написать Марии <span>↗</span></a></section>
      <footer><a className="brand" href="#top">KIND<span>•</span>SITES</a><span>© 2026 Дарья Март</span><span>Сайты с характером.</span></footer>
    </main>
  );
}
