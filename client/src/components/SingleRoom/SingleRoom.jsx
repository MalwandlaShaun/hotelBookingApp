import { useState } from "react";
import "./singleRoom.css";
import { Col, Row } from "antd";
import { useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";
import BookingRoomModal from "./BookingRoomModal";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getData } from "../../Api/commonServices";
import { GET_ALL_BOOKING } from "../../Api/ApiConstant";
import useAuth from "../../hooks/useAuth";
// import { roomsData } from "../../mockData/roomData";

const SingleRoom = () => {
  const [bookingStatus, setBookingStatus] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [isBooked, setIsBooked] = useState();

  const { roomid, hotelId } = useParams();

  console.log(currentImage);
  const [room, setRoom] = useState({});
  const [hotel, setHotel] = useState({});

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  //const [oldRoom , setOldRoom] = useState()
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        const { data } = await getData(GET_ALL_BOOKING, {});
        console.log("singleRoom", data);
        setBookingStatus(data.booking);
      } catch (err) {
        console.log("booking status error", err);
      }
    };
    getRoomDetails();
  }, []);



  // console.log(retrievedData);

  // const currentRoom = retrievedData.filter((item) => item._id === roomid);

  // console.log("currentRoom", currentRoom[0]);
  // setRoom(currentRoom[0]);

  // const hotetId = retrievedData.filter((item) => item.hotelId === hotelId);
  // setHotel(hotetId);

  useEffect(() => {
      const storedData = localStorage.getItem("rooms");

      // Parse the JSON string back into a JavaScript object
      const retrievedData = JSON.parse(storedData);
    const currentRoom = retrievedData.filter((item) => item._id === roomid);
    setRoom(currentRoom[0]);

    const hotetId = retrievedData.filter((item) => item.hotelId === hotelId);
    setHotel(hotetId);
  }, [roomid, hotelId]);

  useEffect(() => {
    setIsBooked(isAvailable());
  }, [bookingStatus]);
  const { isLogin } = useAuth();

  console.log("room", room);
  console.log("singleRoom", bookingStatus);

  const isAvailable = () => {
    let bookedRoom;
    if (Array.isArray(bookingStatus)) {
      bookedRoom = bookingStatus.filter((item) => item.roomName === room.title);
      console.log("bookedRoom", bookedRoom);
    } else {
      console.error("bookingStatus is not an array.");
    }

    if (bookedRoom.length < 1) {
      return false;
    } else return true;
  };

  const navigate = useNavigate();
  const handleShowModal = () => {
    if (isLogin) {
      setIsBookingModalVisible(true);
    } else {
      navigate("/auth/register");
    }
  };

  return (
    <>
      <BookingRoomModal
        isBookingModalVisible={isBookingModalVisible}
        setIsBookingModalVisible={setIsBookingModalVisible}
        room={room}
        hotel={hotel}
        bookingStatus={bookingStatus}
        isBooked={isBooked}
        roomid={roomid}
      />
      <div className="singleRoom">
        <Row className="room-wrapper">
          <Col
            //style={{ backgroundColor: "red" }}
            md={{ span: 22 }}
            xs={{ span: 24 }}
          >
            <div>
              <h1 style={{ fontFamily: "fantasy", textAlign: "center" }}>
                {room.title}
              </h1>

              <h5 style={{ color: "black" }}>
                Enjoy a spacious and relaxing environment during you stay in out
                Hotel
              </h5>
            </div>
          </Col>
          <Col md={{ span: 2 }} xs={{ span: 24 }}>
            <button
              className="btn-primary "
              style={{
                padding: "20px 10px",
                background: "#fe5d5d",
                color: "white",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                width: "100%",
              }}
              onClick={handleShowModal}
            >
              Book
            </button>
          </Col>
        </Row>
        <Row style={{ paddingBottom: "20px" }} gutter={[24, 24]}>
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <div className="left-bok-content">
              {/* <h3>{hotel.title} </h3> */}
              {/* <p>{hotel.desc}</p> */}
            </div>
          </Col>
        </Row>
        <div>
          {isViewerOpen && (
            <ImageViewer
              src={room?.photos?.map((img) => img)}
              currentIndex={currentImage}
              onClose={closeImageViewer}
              disableScroll={false}
              backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
                width: "100%",
                marginTop: "7%",
              }}
              closeOnClickOutside={true}
            />
          )}
        </div>
        <Row gutter={[12, 12]} style={{ marginBottom: "20px" }}>
          {room?.photos?.slice(0, 8).map((img, index) => (
            <Col
              md={{ span: 8 }}
              xs={{ span: 24 }}
              lg={{ span: 6 }}
              sm={{ span: 12 }}
              key={index + 1}
            >
              <img
                onClick={() => openImageViewer(index)}
                style={{
                  width: "100%",
                  cursor: "pointer",
                  height: "200px",
                  objectFit: "cover",
                }}
                src={img}
                alt=""
              />
            </Col>
          ))}
        </Row>
        <div className="singleRoomDetailsContainer">
          <div className="singleRoomDetailsOne">
            <div className="detailsOneContainer">
              <div className="detailsOneItems">
                <h3>View</h3>
                <p>Hotel Pool</p>
              </div>
              <div className="detailsOneItems">
                <h3>Occupancy</h3>
                <p>2 Adults & 3 Children</p>
              </div>
            </div>
            <div className="detailsTwoContainer">
              <div className="detailsTwoItems">
                <h3>Size</h3>
                <p>201 sqm/2163sqft</p>
              </div>
              <div>
                <h3>Bedding</h3>
                <p>2 King Beds</p>
              </div>
            </div>
          </div>
          <div className="singleRoomDetailsTwo">
            <h3>ROOM OVERVIEW</h3>
            <p>
              The {room.title} is Mashler HOTEL’s recommended choice for
              families looking to enjoy their time in joburg. With two bedrooms,
              easy access to the beach, and all inclusive tours offered from our
              resort, we ensure you will never experience a dull moment. Come
              and spend evening catching a movie in our private cinema.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleRoom;
