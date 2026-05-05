import "../styles/InfoCardsSection.css";

interface InfoCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const InfoCardsSection = () => {
  const cards: InfoCard[] = [
    {
      title: "¿Qué es?",
      description:
        "Es una extensión para Visual Studio Code diseñada para facilitar la metodología de Desarrollo Guiado por Pruebas (TDD).",
      icon: (
        <svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.000966151 10.3538C-0.0052533 10.5001 0.0186056 10.646 0.0710747 10.7828C0.123544 10.9195 0.203514 11.0441 0.306069 11.1489C0.408624 11.2537 0.531596 11.3364 0.667422 11.3921C0.803248 11.4477 0.949057 11.4751 1.09589 11.4725H4.84406C5.47102 11.4725 5.97078 10.9607 6.05256 10.3402C6.46145 7.36904 8.50591 5.20407 12.1496 5.20407C15.2662 5.20407 18.1194 6.75759 18.1194 10.4942C18.1194 13.3703 16.4202 14.6928 13.7352 16.7038C10.6776 18.9185 8.25603 21.5047 8.42867 25.7033L8.4423 26.6862C8.44707 26.9833 8.56884 27.2667 8.78133 27.4751C8.99382 27.6836 9.28 27.8004 9.57811 27.8003H13.2627C13.5639 27.8003 13.8528 27.681 14.0658 27.4687C14.2788 27.2563 14.3985 26.9683 14.3985 26.668V26.1925C14.3985 22.9405 15.6388 21.9939 18.9872 19.462C21.754 17.365 24.6389 15.037 24.6389 10.15C24.6389 3.30633 18.8418 0 12.4949 0C6.73859 0 0.432574 2.67224 0.000966151 10.3538ZM7.07479 36.4557C7.07479 38.8697 9.00566 40.6543 11.6635 40.6543C14.4303 40.6543 16.3339 38.8697 16.3339 36.4557C16.3339 33.9555 14.4257 32.1982 11.6589 32.1982C9.00566 32.1982 7.07479 33.9555 7.07479 36.4557Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      title: "¿Cómo funciona?",
      description:
        'Funciona mediante un ciclo rápido de tres pasos: <strong>Rojo</strong> (crear un test que falla), <strong>Verde</strong> (escribir el código mínimo para que pase) y <strong>Refactorizar</strong> (mejorar el código).',
      icon: (
        <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.7089 0L17.7084 25.2991H15.1787V30.3587H17.7084L17.709 40.4777H22.7685L22.768 30.3587H25.2977V25.2991H22.768L22.7685 0H17.7089ZM2.52971 0V10.122H0V15.1791H2.52971V40.4776H7.58925V15.1791H10.119V10.122H7.58925V0H2.52971ZM32.8845 0.000474087V15.1796H30.3547L30.3563 20.2389H32.886V40.4776H37.948V20.2389H40.4777L40.4762 15.1796H37.9465L37.948 0L32.8845 0.000474087Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      title: "¿Para qué sirve?",
      description:
        "Sirve para implementar una metodología de desarrollo de software donde se escriben las pruebas unitarias <strong>antes</strong> que el código funcional, garantizando un código más limpio, seguro, escalable y con menos errores.",
      icon: (
        <svg width="30" height="41" viewBox="0 0 30 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.4709 28.6181L21.2285 29.2304C16.8917 30.6936 12.2017 30.6936 7.86491 29.2304L7.62247 28.6181C7.39214 28.0548 7.27577 27.7707 7.07454 27.5111C6.87574 27.2491 6.52662 26.9846 5.82838 26.458C3.38354 24.6089 1.57685 22.0294 0.664391 19.0851C-0.248073 16.1408 -0.220021 12.981 0.744573 10.0537C1.70917 7.1264 3.56137 4.58004 6.03863 2.77555C8.5159 0.971063 11.4926 0 14.5467 0C17.6008 0 20.5775 0.971063 23.0548 2.77555C25.532 4.58004 27.3842 7.1264 28.3488 10.0537C29.3134 12.981 29.3415 16.1408 28.429 19.0851C27.5165 22.0294 25.7098 24.6089 23.265 26.458C22.5668 26.9846 22.2176 27.2491 22.0188 27.5111C21.82 27.7732 21.7037 28.0524 21.4709 28.6181ZM9.33413 34.692C9.54425 35.9851 9.66385 37.2897 9.69295 38.6057C9.69539 38.7796 9.74478 38.9495 9.83578 39.0971C9.92679 39.2447 10.056 39.3644 10.2094 39.4433C11.556 40.1236 13.041 40.4778 14.5467 40.4778C16.0524 40.4778 17.5373 40.1236 18.884 39.4433C19.0374 39.3644 19.1666 39.2447 19.2576 39.0971C19.3486 38.9495 19.398 38.7796 19.4004 38.6057C19.4295 37.2897 19.5491 35.9851 19.7593 34.692C16.32 35.4046 12.7734 35.4046 9.33413 34.692Z"
            fill="white"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="cards-wrapper">
      {cards.map((card, index) => (
        <div key={index} className="card">
          {/* Estado normal (frontal) */}
          <div className="card-front">
            <div className="card-title">{card.title}</div>
          </div>

          {/* Estado hover con información */}
          <div className="card-hover">
            <div className="info-text" dangerouslySetInnerHTML={{ __html: card.description }} />
            <div className="icon-wrapper">
              <div className="icon-svg">{card.icon}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoCardsSection;

