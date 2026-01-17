import { PageTitle } from "@/components/page-title";

export default function NotFound() {
  return (
    <>
      <PageTitle forceTitle="404" />

      <section id="error-404" className="error-404 section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="error-wrapper">
            <div className="row align-items-center">
              <div
                className="col-lg-6"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="error-illustration">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <div className="circle circle-1"></div>
                  <div className="circle circle-2"></div>
                  <div className="circle circle-3"></div>
                </div>
              </div>
              <div
                className="col-lg-6"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <div className="error-content">
                  <span
                    className="error-badge"
                    data-aos="zoom-in"
                    data-aos-delay="400"
                  >
                    Error
                  </span>
                  <h1
                    className="error-code"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    404
                  </h1>
                  <h2
                    className="error-title"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    Page Not Found
                  </h2>
                  <p
                    className="error-description"
                    data-aos="fade-up"
                    data-aos-delay="700"
                  >
                    The page you are looking for might have been removed, had
                    its name changed, or is temporarily unavailable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
