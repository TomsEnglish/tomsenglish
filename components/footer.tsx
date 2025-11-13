import Link from "next/link";

export const Footer = () => {
  return (
    <footer id="footer" className="footer accent-background">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-about">
            <Link href="/" className="logo d-flex align-items-center">
              <span className="sitename">tomseng</span>
            </Link>

            <p>
              © <span>Copyright tomseng 2025 All Rights Reserved</span>
            </p>
            <p>
              Cras fermentum odio eu feugiat lide par naso tierra. Justo eget
              nada terra videa magna derita valies darta donna mare fermentum
              iaculis eu non diam phasellus.
            </p>
            <div className="social-links d-flex mt-4">
              <a href="">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          

          <div className="col-lg-2 col-6" />


          <div className="col-lg-3 col-md-12" />
          <div className="col-lg-2 col-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <Link href="">About</Link>
              </li>
              <li>
                <Link href="">Terms of service</Link>
              </li>
            </ul>
          </div>


        </div>
      </div>
    </footer>
  );
};
