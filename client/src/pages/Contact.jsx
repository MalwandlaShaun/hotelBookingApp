
import "./Contact.css"; 
import Footer from "../components/common/Footer/Footer";
import NavBar from "../components/common/NavBar/NavBar";

const Contact = () => {
  return (
    <div>
      <div className="booking-container" style={{ margin: "0 5%" }}>
        <div className="top-header">
          <NavBar />
        </div>
      </div>
      {/* Contact Page */}
      <div className="contact-container my-5">
        <h1 className="text-center">Contact Us</h1>
        <p className="text-center">Get in touch with Us:</p>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form
              id="contact-form"
              method="POST"
              action="https://formspree.io/f/xdovglrl"
            >
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  id="surname"
                  name="surname"
                  placeholder="Enter your surname"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="_replyto"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="3"
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
