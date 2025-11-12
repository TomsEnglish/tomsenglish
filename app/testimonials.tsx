export const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials section">
      <div className="container section-title" data-aos="fade-up" data-aos-once="true">
        <h2>Testimonials</h2>
        <p>
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
          consectetur velit
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100" data-aos-once="true">
        <div className="row">
          <div className="col-12">
            <div
              className="critic-reviews"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-once="true"
            >
              <div className="row">
                <Card />
                <Card />
                <Card />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = () => {
  return (
    <div className="col-md-4">
      <div className="critic-review">
        <div className="review-quote">"</div>
        <div className="stars">
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-half"></i>
        </div>
        <p>
          Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
          Nulla quis lorem ut libero malesuada feugiat.
        </p>
        <div className="critic-info">
          <div className="critic-name">Washington Post</div>
        </div>
      </div>
    </div>
  );
};
