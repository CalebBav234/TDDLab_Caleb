const FooterSection = () => {
  return (
    <footer className="landing-footer" aria-label="Pie de pagina">
      <div className="landing-container landing-footer-content">
        <img src="/landing/logo.svg" alt="Logo TDDLab" className="landing-footer-logo" />

        <div>
          <p>Email: contacto@tddlab.com</p>
          <p>Telefono: +1 (123) 456-7890</p>
        </div>

        <div>
          <p>Politica de Privacidad</p>
          <p>Terminos y Condiciones</p>
          <p>Politica de Cookies</p>
        </div>

        <p>© 2025 TDDLab. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default FooterSection;

