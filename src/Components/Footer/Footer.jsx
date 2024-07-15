function Footer() {
  return (
    <>
      <footer>
        <div className="address">
          <h3>FOOG FUNCTION PVT. LTD</h3>
          <p>
            FTBI, National Institute of Technology, Sector 1, Rourkela, Odisha
            769008
          </p>
          <p> &copy;2024 FoogFunction</p>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.6085138154845!2d84.9005288105626!3d22.254927744454477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a201d5e51aa77ab%3A0x6a7642d4b9a3f722!2sFOOG%20FUNCTION%20PVT.%20LTD.!5e0!3m2!1sen!2sin!4v1719553110089!5m2!1sen!2sin"
            width="400"
            height="200"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </footer>
    </>
  );
}
export default Footer;
