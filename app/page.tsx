import { BenefitsCarousel } from "./BenefitsCarousel";
import { ImpactCarousel } from "./ImpactCarousel";
import { ServicesCarousel } from "./ServicesCarousel";

const steps = [
  { number: "01", title: "Знакомимся", text: "Коротко обсуждаем бизнес, аудиторию и задачу будущего сайта." },
  { number: "02", title: "Собираем основу", text: "Продумываем структуру, сценарий страницы и черновые тексты." },
  { number: "03", title: "Находим образ", text: "Показываем визуальное направление, цвет, типографику и настроение." },
  { number: "04", title: "Делаем живым", text: "Собираем сайт, добавляем анимацию, адаптивность и нужные подключения." },
  { number: "05", title: "Запускаем", text: "Вместе проверяем результат, подключаем домен и публикуем проект." },
];

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
  { q: "Сколько длится разработка?", a: "Компактный лендинг обычно занимает от 7 дней. Более крупный сайт — от 14 дней. Точный срок фиксируем после короткого знакомства с задачей." },
  { q: "Поможете с текстом и структурой?", a: "Да. Мы задаём вопросы, собираем смысловой каркас и помогаем превратить ваши материалы в ясный текст для сайта." },
  { q: "Можно начать без готового фирменного стиля?", a: "Можно. Подберём рабочее визуальное направление для сайта: цвета, шрифты и характер графики." },
  { q: "Что входит в публикацию сайта?", a: "Подключение домена, базовая аналитика, проверка адаптивности, форм и основных ссылок. Дополнительные интеграции согласуем заранее." },
  { q: "Сможем ли мы сами менять информацию?", a: "Зависит от выбранной технологии и объёма изменений. Если самостоятельное редактирование важно, заложим это в решение до старта." },
];

function ArrowButton({ children, href, secondary = false }: { children: React.ReactNode; href: string; secondary?: boolean }) {
  return <a className={`pill-button ${secondary ? "pill-button-secondary" : ""}`} href={href}>{children}<span aria-hidden="true">↗</span></a>;
}

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="ambient ambient-one" /><div className="ambient ambient-two" />
        <nav className="nav shell" aria-label="Основная навигация">
          <a className="brand" href="#top" aria-label="KIND SITES — на главную"><span className="brand-mark">K</span>KIND SITES</a>
          <div className="nav-links"><a href="#services">Услуги</a><a href="#prices">Тарифы</a><a href="#about">О нас</a></div>
          <ArrowButton href="#contact" secondary>Обсудить проект</ArrowButton>
        </nav>

        <div className="hero-copy shell">
          <p className="kicker">Digital-студия Дарьи Март</p>
          <h1>Сайты, которые<br /><em>хочется рассматривать.</em></h1>
          <p className="hero-lead">Придумываем, проектируем и запускаем выразительные сайты для небольшого бизнеса, экспертов и брендов.</p>
          <ArrowButton href="#prices">Выбрать формат</ArrowButton>
        </div>

        <div className="hero-stage" aria-label="Анимированная монограмма KIND SITES">
          <div className="stage-glow" />
          <div className="chrome-art" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element -- GitHub Pages serves the pre-compressed hero asset directly. */}
            <img src="/ks-purple-glass-v2.webp" alt="" />
          </div>
          <div className="floating-tag-stack">
            <span className="float-tag tag-a"><b aria-hidden="true">✦</b> дизайн без шаблонов</span>
            <span className="float-tag tag-b"><b aria-hidden="true">✓</b> понятный процесс</span>
            <span className="float-tag tag-c"><b className="tag-rocket" aria-hidden="true">➤</b> запуск под ключ</span>
          </div>
        </div>

        <div className="ticker" aria-label="Направления работы"><div>
          <span>Лендинги</span><i>✦</i><span>Сайты компаний</span><i>✦</i><span>Портфолио</span><i>✦</i><span>Промо-страницы</span><i>✦</i>
          <span>Лендинги</span><i>✦</i><span>Сайты компаний</span><i>✦</i><span>Портфолио</span><i>✦</i><span>Промо-страницы</span><i>✦</i>
        </div></div>
      </section>

      <ServicesCarousel />

      <ImpactCarousel />

      <section className="section process shell reveal" id="process">
        <div className="center-heading"><p className="kicker soft-pill">Как это работает</p><h2>От идеи до сайта<br /><em>за пять шагов.</em></h2></div>
        <div className="steps">{steps.map((step) => <article key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div>
      </section>

      <BenefitsCarousel />

      <section className="section case-study reveal">
        <div className="shell"><div className="case-heading"><p className="kicker soft-pill">Первый кейс</p><h2>История, которая<br /><em>стала сайтом.</em></h2></div>
          <div className="case-card"><div className="case-copy"><span>01 / RICHY KIND EYES</span><h3>Сайт-портрет<br />мейн-куна Риччи</h3><p>Личная история, характер, фотографии и QR-визитка — в одном тёплом цифровом альбоме.</p><ArrowButton href="https://richykindeyespussycat.ru/">Открыть проект</ArrowButton></div><div className="case-art" aria-hidden="true"><span>R</span><div className="case-ring ring-a" /><div className="case-ring ring-b" /><b>KIND<br />EYES</b></div></div>
        </div>
      </section>

      <section className="section team shell reveal" id="about">
        <div className="center-heading"><p className="kicker soft-pill">Команда</p><h2>Небольшая студия.<br /><em>Личное внимание.</em></h2></div>
        <div className="team-grid"><article><span className="portrait-letter">Д</span><div><p>Основательница · креативный директор</p><h3>Дарья Март</h3></div></article><article><span className="portrait-letter">М</span><div><p>Менеджер проектов</p><h3>Мария</h3></div></article></div>
      </section>

      <section className="section pricing reveal" id="prices">
        <div className="shell"><div className="center-heading"><p className="kicker soft-pill">Тарифы</p><h2>Простая цена.<br /><em>Серьёзный результат.</em></h2><p>Выбираем подходящий старт. Всё нестандартное считаем отдельно и согласовываем до начала работ.</p></div>
          <div className="pricing-grid">{packages.map((item, index) => <article className={`price-card ${item.featured ? "featured" : ""}`} key={item.name}><span className="plan-index">0{index + 1}</span><h3>{item.name}</h3><p>{item.note}</p><div className="price">{item.price}</div><ArrowButton href="#contact" secondary={!item.featured}>Выбрать</ArrowButton><ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></article>)}</div>
        </div>
      </section>

      <section className="section faq reveal"><div className="center-heading"><p className="kicker soft-pill">FAQ</p><h2>Ответы на<br /><em>частые вопросы.</em></h2></div><div className="faq-list">{questions.map((item) => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></section>

      <section className="final-cta" id="contact"><div className="question-mark question-left">?</div><div className="question-mark question-right">?</div><div className="final-sphere" /><div className="final-copy"><p className="kicker soft-pill">Есть идея?</p><h2>Давайте сделаем<br />ей хороший сайт.</h2><p>Мария задаст несколько вопросов и поможет выбрать подходящий формат.</p><ArrowButton href="mailto:hello@kindsites.ru?subject=Проект%20для%20KIND%20SITES">Написать Марии</ArrowButton></div></section>

      <footer className="footer shell"><a className="brand" href="#top"><span className="brand-mark">K</span>KIND SITES</a><div><p>Навигация</p><a href="#services">Услуги</a><a href="#prices">Тарифы</a><a href="#about">О нас</a></div><div><p>Контакты</p><a href="mailto:hello@kindsites.ru">hello@kindsites.ru</a><span>Москва · работаем онлайн</span></div><span className="copyright">© 2026 Дарья Март</span></footer>
    </main>
  );
}
