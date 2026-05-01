type HeroSectionProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  onAuthClick: () => void;
};

const HeroSection = ({
  title,
  subtitle,
  buttonText,
  onAuthClick,
}: HeroSectionProps) => {
  return (
    <section className="landing-hero" aria-label="Presentacion principal">
      <header className="landing-navbar">
        <img src="/landing/logo.svg" alt="Logo TDDLab" className="landing-logo" />
        <img src="/landing/linea.svg" alt="Linea decorativa" className="landing-navbar-line" />
      </header>

      <div className="landing-hero-overlay">
        <div className="landing-intro-stack">
          <img src="/landing/intro.svg" alt="Ilustracion de tecnologia" className="landing-intro" />
          <img
            src="/landing/intro-lineasZ.svg"
            alt="Decoracion del bloque introductorio"
            className="landing-intro-lines"
          />
          <img
            src="/landing/intro-tddlab.svg"
            alt="Marca introductoria de TDDLab"
            className="landing-intro-brand"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </div>
        <button type="button" className="landing-primary-button" onClick={onAuthClick}>
          {buttonText}
        </button>
      </div>

      <div className="landing-intro-copy">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
};

export default HeroSection;

