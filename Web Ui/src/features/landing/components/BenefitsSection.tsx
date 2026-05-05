import { LandingBenefit } from "../constants/landingContent";

type BenefitsSectionProps = {
  title: string;
  benefits: LandingBenefit[];
};

const BenefitsSection = ({ title, benefits }: BenefitsSectionProps) => {
  return (
    <section className="landing-benefits" aria-label="Beneficios de la plataforma">
      <img
        src="/landing/circuitos-lateral-izquierdo.svg"
        alt="Circuito decorativo lateral izquierdo"
        className="landing-circuit-left"
      />
      <img
        src="/landing/circuitos-lateral-derecho.svg"
        alt="Circuito decorativo lateral derecho"
        className="landing-circuit-right"
      />

      <div className="landing-container">

        <h2 className="landing-section-title">{title}</h2>

        <div className="landing-benefit-cards" role="list">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="landing-benefit-card" role="listitem">
              <img src={benefit.imagePath} alt={benefit.imageAlt} />
              <h3>{benefit.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

