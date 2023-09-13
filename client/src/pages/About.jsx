import "./About.css"
import NavBar from "../components/common/NavBar/NavBar";
import Footer from "../components/common/Footer/Footer";

function AboutUs() {
  return (
    <>
      <div className="top-header" style={{ margin: "0 5%" }}>
        <NavBar />
      </div>
      <div>
        <header className="main-header">
          <h1>About Mashler Hotel</h1>
        </header>
        <div className="container">
          <section className="section-headers">
            <h2>Our Story</h2>
            <p>
              Mashler Hotel was established in 1990 by Mr. John Mashler, a
              visionary entrepreneur with a deep love for hospitality. His dream
              was to create a haven where travelers from around the world could
              find solace, elegance, and exceptional service. Over the years,
              Mashler Hotel has grown to become an iconic destination for both
              leisure and business travelers.
            </p>
          </section>
          <section className="section-headers">
            <h2>Our Commitment</h2>
            <p>
              At Mashler Hotel, we are committed to exceeding your expectations.
              Our dedicated team of professionals is trained to anticipate your
              every need and ensure your stay is nothing short of exceptional.
              Whether you're here for a romantic getaway, a family vacation, or
              a corporate event, we go the extra mile to make your visit truly
              memorable.
            </p>
          </section>
          <section className="section-headers">
            <h2>Luxurious Accommodations</h2>
            <p>
              Experience the epitome of luxury in our well-appointed guest rooms
              and suites. Each room is tastefully decorated and equipped with
              modern amenities to ensure your comfort and relaxation. From
              breathtaking city views to plush bedding, your stay at Mashler
              Hotel will be a true indulgence.
            </p>
          </section>
          <section className="section-headers">
            <h2>Dining Excellence</h2>
            <p>
              Savor exquisite cuisine at our in-house restaurant, "Gastronome."
              Our culinary experts craft delectable dishes that cater to every
              palate. Whether you're in the mood for fine dining or a casual
              meal, our restaurant offers a diverse menu that celebrates local
              flavors and international favorites.
            </p>
          </section>
          <section className="section-headers">
            <h2>Meetings and Events</h2>
            <p>
              Host your next business meeting, conference, or special event at
              Mashler Hotel. Our state-of-the-art facilities and attentive event
              planning team are here to ensure the success of your gathering. We
              offer versatile spaces that can accommodate both small and large
              groups.
            </p>
          </section>
          <section className="section-headers">
            <h2>Exploring the City</h2>
            <p>
              Mashler Hotel's central location makes it the perfect starting
              point for exploring the city's attractions, shopping districts,
              and cultural landmarks. Our concierge team is always ready to
              provide recommendations and assist with reservations.
            </p>
          </section>
          <section className="section-headers">
            <h2>Contact Us</h2>
            <p>
              We invite you to experience the Mashler difference. Book your stay
              with us today, and let us create memories that last a lifetime. If
              you have any questions or special requests, please don't hesitate
              to contact our friendly staff.
            </p>
            <address>
              <strong>Mashler Hotel</strong>
              <br />
              Address: 123 Main Street, City Center
              <br />
              Phone: (123) 456-7890
              <br />
              Email: info@mashlerhotel.com
              <br />
              Website:{" "}
              <a href="http://www.mashlerhotel.com">www.mashlerhotel.com</a>
            </address>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
