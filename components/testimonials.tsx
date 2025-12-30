export const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials section">
      <div
        className="container section-title"
        data-aos="fade-up"
        data-aos-once="true"
      >
        <h2>Testimonials</h2>
        <p>What my students say about their progress and experience</p>
      </div>

      <div
        className="container"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-once="true"
      >
        <div className="row">
          <div className="col-12">
            <div
              className="critic-reviews"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-once="true"
            >
              <div className="row">
                <Card
                  rating={5}
                  quote="I prepared for the IELTS exam with Tom and his feedback was very helpful. He knows exactly what to focus on."
                  student="Lucas"
                  location="Buenos Aires, Argentina"
                />
                <Card
                  rating={5}
                  quote="I was nervous about speaking, but Tom made me feel comfortable from the first class. My fluency has improved a lot."
                  student="Carolina"
                  location="Tucumán, Argentina"
                />
                <Card
                  rating={5}
                  quote="The classes feel like real conversations, which is great for me. I've learned how to actually use English in daily situations."
                  student="Diego"
                  location="São Paulo, Brazil"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({ rating, quote, student, location }: any) => {
  return (
    <div className="col-md-4">
      <div className="critic-review">
        <div className="review-quote">"</div>
        <StarRating rating={rating} />
        <p>{quote}</p>
        <div className="critic-info">
          <div className="critic-name">{student}</div>
          <div>{location}</div>
        </div>
      </div>
    </div>
  );
};

const StarRating = ({ rating }: any) => {
  const totalStars = 5;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="stars">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <i key={`full-${i}`} className="bi bi-star-fill" />
      ))}

      {/* Half star */}
      {hasHalfStar && <i className="bi bi-star-half" />}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <i key={`empty-${i}`} className="bi bi-star" />
      ))}
    </div>
  );
};
