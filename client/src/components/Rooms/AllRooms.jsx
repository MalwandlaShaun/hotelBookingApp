import { Card, Col, Form, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../common/NavBar/NavBar";
import "./allRooms.css";
import Footer from "../common/Footer/Footer";
import { GET_ROOMS_BY_Hotel_ID } from "../../api/ApiConstant";
import { getData } from "../../api/commonServices";
//import { useBookingContext } from "../../context/BookingContext";
import loaderZif from "../../assets/loader.gif";
import { useSelector, useDispatch } from "react-redux";
import {
  setAdult,
  setChild,
  setRoom,
} from "../../features/bookingSlice";

const { Option } = Select;

const AllRooms = () => {
    const booking = useSelector((state) => state.booking);
    const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleChange = (value, key) => {
    console.log("booking ",booking);
    if (key === "room") {
      dispatch(setRoom({ ...booking, room: value }));
    }
    if (key === "adult") {
      dispatch(setAdult({ ...booking, adult: value }));
    }
    if (key === "child") {
      dispatch(setChild({ ...booking, child: value }));
    }
  };

  const [inputRange] = useState(100);
  const [rooms, setRooms] = useState([]);
  const hotelID = "631263598e84d4338e2bb9c5";
  const [totalPage, setTotalPage] = useState(null);
  const [paginationLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(1);
  console.log("active", active);
  // GET_ROOMS_BY_ID
  useEffect(() => {
    const getPost = async () => {
      const filterData = {
        hotelId: "631263598e84d4338e2bb9c5",
        lowestPrice: inputRange,
        heightPrice: 500,
        page: page,
        limit: paginationLimit,
      };
      try {
        const { data } = await getData(GET_ROOMS_BY_Hotel_ID, filterData);
        setTotalPage(data.result);
          setRooms(data?.rooms);
          const jsonData = JSON.stringify(data?.rooms);

          localStorage.setItem("rooms", jsonData);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [hotelID, inputRange, page]);

  // PAGINATION
  console.log(page);

  const paginationCount = Math.ceil(totalPage / paginationLimit);
  return (
    <>
      <div style={{ background: "white", padding: "0 5%" }}>
        <NavBar />
      </div>
      <div style={{ padding: "0 5%" }}>
        <p style={{ fontSize: 25, textAlign: "center", padding: "10px" }}>
          More{" "}
          <Link>
            <span style={{ color: "#fe5d5d" }}>Rooms</span>
          </Link>
        </p>

        <Form
          initialValues={{
            adult: booking.adult,
            room: booking.room,
            child: booking.child,
          }}
          onFinish={onFinish}
          layout="vertical"
        >
          <div className="book-form" style={{ padding: "10px" }}>
            <div className="title">
              <h5>BOOK YOUR </h5>
              <h2>ROOMS</h2>
            </div>
            <div className="book-forms">
              <div style={{ display: "flex", gap: "10px", maxWidth: "670px" }}>
                <Form.Item
                  style={{
                    width: "100%",
                    marginTop: "1%",
                    maxHeight: "100%",
                  }}
                  name="room"
                >
                  <Select onChange={(e) => handleChange(e, "room")}>
                    <Option value="1room">1 ROOM</Option>
                    <Option value="2room">2 ROOM</Option>
                    <Option value="3room">3 ROOM</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  style={{
                    width: "100%",
                    marginTop: "1%",
                    maxHeight: "100%",
                  }}
                  name="adult"
                  className="adult-btn"
                >
                  <Select onChange={(e) => handleChange(e, "adult")}>
                    <Option value="1adult">1 ADULT</Option>
                    <Option value="2adult">2 ADULT</Option>
                    <Option value="3adult">3 ADULT</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  style={{
                    width: "100%",
                    marginTop: "1%",
                    maxHeight: "100%",
                  }}
                  name="child"
                  className="child-btn"
                >
                  <Select onChange={(e) => handleChange(e, "child")}>
                    <Option value="0child">0 CHILD</Option>
                    <Option value="1child">1 CHILD</Option>
                    <Option value="2child">2 CHILD</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div>
              {" "}
              <button
                className="btn-primary-full filter-btn"
                type="primary"
                style={{ fontSize: "20px", padding: "3px 27px" }}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Filter
              </button>
            </div>
          </div>
        </Form>
        <div className="rooms" style={{ margin: "3% 0" }}>
          {rooms.length < 1 && (
            <div style={{ width: "400px", margin: "auto" }}>
              <img src={loaderZif} alt="" style={{ maxWidth: "100%" }} />
            </div>
          )}
          <Row gutter={[14, 14]}>
            {rooms?.map(({ _id, photo, desc, title, price }) => (
              <Col
                key={_id}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                lg={{ span: 6 }}
                md={{ span: 8 }}
              >
                <Card style={{ textAlign: "center" }}>
                  <img
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                    }}
                    src={photo}
                    alt=""
                  />
                  <div style={{ backgroundColor: "#0A223D" }}>
                    <div>
                      <h3 style={{ color: "white" }}>{title}</h3>
                      <p style={{ color: "white" }}>{desc}</p>
                      <p style={{ color: "white" }}>R{price}</p>
                    </div>
                    <div>
                      <Link
                        className="btn-primary"
                        to={`/room/${_id}/${hotelID}`}
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* PAGINATION  */}

        <div style={{ textAlign: "center" }}>
          <div className="pagination">
            <a href="#">&laquo; Previous</a>
            {new Array(paginationCount).fill("").map((item, index) => (
              <>
                <a
                  className={index + 1 === active ? "active" : ""}
                  onClick={() => {
                    setPage(index + 1);
                    setActive(index + 1);
                  }}
                >
                  {index + 1}
                </a>
              </>
            ))}

            <a href="#">Next &raquo;</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllRooms;
