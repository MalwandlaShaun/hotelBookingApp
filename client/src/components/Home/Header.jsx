import {  DatePicker, Form, Select } from "antd";
import "./Header.css";
import NavBar from "../common/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";
import mainImage from "../../assets/mainImage.png";
import { format } from "date-fns";

const { Option } = Select;

const Header = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { booking, setBooking } = useBookingContext();

  // const onFinish = (values) => {
  //   console.log("Success:", values);
  //   const cityInfo = {
  //     name: values.city,
  //   };
  //   setBooking(values);
  //   navigate("/rooms", { state: cityInfo });
  //   console.log("booking : ", booking)
  // };


// ...

const onFinish = (values) => {
  console.log("Success:", values);

  const arrivalDate = values.arrival.toDate(); // Convert Moment.js object to JavaScript Date
  const departureDate = values.departure.toDate(); // Convert Moment.js object to JavaScript Date

  const formattedArrivalDate = format(arrivalDate, "dd-MM-yyyy");
  const formattedDepartureDate = format(departureDate, "dd-MM-yyyy");

  console.log("formattedDepartureDate:", formattedDepartureDate);
  const cityInfo = {
    name: values.city,
  };

  setBooking({
    ...values,
    arrival: formattedArrivalDate,
    departure: formattedDepartureDate,
  });

  navigate("/rooms", { state: cityInfo });
  console.log("booking : ", booking);

};


  return (
    <div className="booking">
      <div className="booking-container" style={{ margin: "0 5%" }}>
        <div className="top-header">
          <NavBar />
        </div>
      </div>
      {/* SMALL DEVICE  */}
      <Form
        className="small-form"
        initialValues={{
          adult: booking.adult,
          room: booking.room,
          child: booking.child,
        }}
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <div
          className="book-form-small"
          style={{
            zIndex: 100,
            position: "absolute",
            margin: "0% 5%",
            width: "90%",
          }}
        >
          <div className="title" style={{ margin: "-15px 0" }}>
            <h5>BOOK YOUR </h5>
            <h2>ROOMS</h2>
          </div>
          <div className="book-forms">
            <Form.Item
              name="arrival"
              rules={[
                {
                  required: true,
                  message: "Please input a hotel name!",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                size="large"
                placeholder="ARRIVAL"
              />
            </Form.Item>
            <Form.Item
              name="departure"
              rules={[
                {
                  required: true,
                  message: "Please input a hotel name!",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                size="large"
                placeholder="DEPARTURE"
              />
            </Form.Item>
            <Form.Item style={{ width: "100%", maxHeight: "100%" }} name="room">
              <Select>
                <Option value="1room">1 ROOM</Option>
                <Option value="2room">2 ROOM</Option>
                <Option value="3room">3 ROOM</Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ width: "100%", maxHeight: "100%" }}
              name="adult"
            >
              <Select>
                <Option value="1adult">1 ADULT</Option>
                <Option value="2adult">2 ADULT</Option>
                <Option value="3adult">3 ADULT</Option>
              </Select>
            </Form.Item>

            <Form.Item
              style={{ width: "100%", maxHeight: "100%" }}
              name="child"
            >
              <Select>
                <Option value="0child">0 CHILD</Option>
                <Option value="1child">1 CHILD</Option>
                <Option value="2child">2 CHILD</Option>
              </Select>
            </Form.Item>
          </div>
          <div>
            {" "}
            <button className="animated-button1 " type="primary">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Search
            </button>
          </div>
        </div>
      </Form>

      <Form
        className="large-form"
        initialValues={{
          adult: booking.adult,
          room: booking.room,
          child: booking.child,
        }}
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <div
          className="book-form"
          style={{
            zIndex: 100,
            position: "absolute",
            margin: "0 5%",
            width: "90%",
            padding: "10px",
          }}
        >
          <div className="title">
            <h5>BOOK YOUR </h5>
            <h2>ROOMS</h2>
          </div>
          <div className="book-forms">
            <div style={{ display: "flex", gap: "10px" }}>
              <Form.Item
                name="arrival"
                rules={[
                  {
                    required: true,
                    message: "Please input a hotel name!",
                  },
                ]}
              >
                <DatePicker size="large" placeholder="ARRIVAL" />
              </Form.Item>
              <Form.Item
                name="departure"
                rules={[
                  {
                    required: true,
                    message: "Please input a hotel name!",
                  },
                ]}
              >
                <DatePicker size="large" placeholder="DEPARTURE" />
              </Form.Item>
              <Form.Item
                style={{ width: "20%", marginTop: "1%", maxHeight: "100%" }}
                name="room"
              >
                <Select>
                  <Option value="1room">1 ROOM</Option>
                  <Option value="2room">2 ROOM</Option>
                  <Option value="3room">3 ROOM</Option>
                </Select>
              </Form.Item>

              <Form.Item
                style={{ width: "20%", marginTop: "1%", maxHeight: "100%" }}
                name="adult"
              >
                <Select>
                  <Option value="1adult">1 ADULT</Option>
                  <Option value="2adult">2 ADULT</Option>
                  <Option value="3adult">3 ADULT</Option>
                </Select>
              </Form.Item>

              <Form.Item
                style={{ width: "20%", marginTop: "1%", maxHeight: "100%" }}
                name="child"
              >
                <Select>
                  <Option value="0child">0 CHILD</Option>
                  <Option value="1child">1 CHILD</Option>
                  <Option value="2child">2 CHILD</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div>
            <button className="animated-button1 " type="primary">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Search
            </button>
          </div>
        </div>
      </Form>

      <div className="carousel" style={{ zIndex: 5, position: "relative" }}>
        <div >
          <img src={mainImage} alt="" style={{height: "100vh" , width: "100vw"}} />
        </div>
      </div>
    </div>
  );
};

export default Header;
