import {  Card, Col, Form, Input, Modal, Row, DatePicker } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CREATE_BOOKING,
} from "../../Api/ApiConstant";
import { postData } from "../../Api/commonServices";
import { useBookingContext } from "../../context/BookingContext";
import useAuth from "./../../hooks/useAuth";
import "./singleRoom.css";

import PropTypes from "prop-types";
import swal from "sweetalert";
import { format } from "date-fns";
import moment from "moment";

import { GrCheckboxSelected } from "react-icons/gr";
const BookingRoomModal = ({
  isBookingModalVisible,
  setIsBookingModalVisible,
  room,
  isBooked,
  bookingStatus
}) => {

  const { booking } = useBookingContext();

  const [selectedRoom, setSelectedRoom] = useState([]);
  const [error, setError] = useState(" Select at least one room");
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);

  console.log(room);
  const { isLogin } = useAuth();
  const getDateInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());
    let list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };
  const allDates = getDateInRange(
    booking?.arrival._d || arrivalDate,
    booking?.departure._d || departureDate
  );
  console.log(allDates);
  console.log("booked by one : ", bookingStatus[0]);



  const navigate = useNavigate();


  const handleClick = async () => {
    if (!allDates.length) {
      setError(error);
    } else {
      setSelectedRoom(room);
      if (isBooked) {
        setError("room not available");
      }

      if (!isLogin) {
        navigate("/login");
      }
    }
  };

  const { name, phone, address, id } = useAuth();

  const createNewBooking = async (bookingData) => {
    console.log(bookingData);
    try {
      const { data } = await postData(CREATE_BOOKING, bookingData);
      if (data) {
        swal(
          `Congratulations, ${name.split(" ")[0]}`,
          "You Booking Success!",
          "success"
        );
        setIsBookingModalVisible(false);
        navigate("/dashboard/my-bookings");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const onFinish = (values) => {
   
    console.log(values);

    const arrivalDate = values.arrival.toDate(); // Convert Moment.js object to JavaScript Date
    const departureDate = values.departure.toDate(); // Convert Moment.js object to JavaScript Date

    const toDate = moment(values.arrival, "DD-MM-YYYY")
    const fromDate = moment(values.departure, "DD-MM-YYYY");
    const totaldays = moment.duration(fromDate.diff(toDate)).asDays();
  
    console.log( "total days : " ,totaldays)
    //console.log("toDate : ", toDate);

    const formattedArrivalDate = format(arrivalDate, "dd-MM-yyyy");
    const formattedDepartureDate = format(departureDate, "dd-MM-yyyy");

    setArrivalDate(formattedArrivalDate);
    setDepartureDate(formattedDepartureDate);

    console.log("formattedDepartureDate:", formattedDepartureDate);

    const booking = {
      name: name,
      date: formattedArrivalDate,
      phone: values.phone,
      address: values.address,
      userId: id,
      hotel: "Mashler",
      hotelAddress:
        "Princess of Wales Terrace Cnr Carse O Gowrie, Sunnyside Dr, &, Johannesburg, 2041",
      city: "Joburg",
      maxPeople: room.maxPeople,
      price: room.price,
      totaldays: Math.floor(totaldays),
      roomName: room.title,
    };
    if (selectedRoom) {
      console.log("ready for booking");
      createNewBooking(booking);
    }
  };

  return (
    <div>
      <Modal
        title="Select your rooms:"
        open={isBookingModalVisible}
        onCancel={() => setIsBookingModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={{
            phone: phone,
            address: address,
          }}
          onFinish={onFinish}
        >
          <Row gutter={[14, 14]}>
            <Col span={12}>
              <h5>King size bed, 1 bathroom, balcony</h5>
              <p>Max People: {room.maxPeople}</p>

              <Form.Item
                name="phone"
                label="Mobile No."
                rules={[{ required: true }]}
              >
                <Input placeholder="Mobile Number" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true }]}
              >
                <Input.TextArea placeholder="Address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {isBooked ? ( 
                <div>The room is already booked</div>
              ) : (
                <Row>
                  <Col span={24}>
                    <Card style={{ marginBottom: "15px" }}>
                      <p className="select">
                        Your Booking Dates <GrCheckboxSelected />
                      </p>
                      <Form.Item
                        name="arrival"
                        label="ARRIVAL"
                        rules={[{ required: true }]}
                      >
                        <DatePicker
                          style={{ width: "100%" }}
                          size="large"
                          placeholder="ARRIVAL"
                        />
                      </Form.Item>
                      <Form.Item
                        name="departure"
                        label="DEPARTURE"
                        rules={[{ required: true }]}
                      >
                        <DatePicker
                          style={{ width: "100%" }}
                          size="large"
                          placeholder="DEPARTURE"
                        />
                      </Form.Item>
                    </Card>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
          <button
            className="btn-secondary"
            style={{ width: "100%" }}
            type="submit"
            disabled={isBooked}
            onClick={handleClick}
          >
            Reserve Now !
          </button>{" "}
        </Form>
      </Modal>
    </div>
  );
};

BookingRoomModal.propTypes = {
  isBookingModalVisible: PropTypes.bool.isRequired,
  setIsBookingModalVisible: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired,
  roomid: PropTypes.object.isRequired,
  hotel: PropTypes.object.isRequired,
  bookingStatus: PropTypes.object.isRequired,
  isBooked: PropTypes.bool.isRequired,
};

export default BookingRoomModal;
