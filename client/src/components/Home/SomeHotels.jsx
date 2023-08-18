import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_HOTELS } from "../../Api/ApiConstant";
import { getData } from "../../Api/commonServices";
import gofLoader from "../../assets/loader.gif";
import Link from "antd/lib/typography/Link";
import { useDispatch } from "react-redux";
import { setHotel } from "../../features/hotelsSlice"; // Path to your slice

//const { Option } = Select;
const SomeHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [citys] = useState("Joburg");

  const dispatch = useDispatch();
  // GET_ROOMS
  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await getData(GET_HOTELS, {
          city: citys,
        });
        setHotels(data.hotels.allHotels);
        dispatch(setHotel(data.hotels.allHotels));
        // console.log("data : " + data.hotels);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [citys, dispatch]);

  const navigate = useNavigate();
  const handleClickRooms = (id) => {
    navigate("/rooms", { state: id });
  };

  console.log(hotels);
  return (
    <div>
      <div>
        <div className="head-content">
          <h1>
            {" "}
            Our Most Popular <span style={{ color: "#fe5d5d" }}>Rooms</span>
          </h1>
        </div>

        <div className="rooms" style={{ padding: " 0 5%" }}>
          <Row gutter={[14, 14]}>
            {hotels.length < 1 && (
              <div style={{ width: "400px", margin: "auto" }}>
                <img src={gofLoader} alt="" style={{ maxWidth: "100%" }} />
              </div>
            )}
            {hotels.slice(0, 4)?.map(({ _id, photo }) => (
              <Col
                key={_id}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                lg={{ span: 24 }}
                md={{ span: 8 }}
              >
                <Card
                  style={{
                    width: "60vw",
                    height: "50vh",
                    display: "flex",
                    justifyContent: "space-between",
                    position: "relative",
                    alignSelf: "center",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <img
                    style={{
                      width: "28vw",
                      height: "45vh",
                      objectFit: "contain",
                    }}
                    src={photo}
                    alt=""
                  />
                  <br />
                  <div
                    style={{
                      backgroundColor: "#0A223D",
                      position: "absolute",
                      right: 0,
                      top: "8vh",
                      width: "30vw",
                      padding: "20px",
                    }}
                  >
                    <div>
                      <h3 style={{ color: "white" }}>Paradise Suite</h3>
                      <p style={{ color: "white" }}>
                        The King Bedroom is Mashler HOTEL’s recommended choice
                        for families looking to enjoy their time in joburg. With
                        two bedrooms, easy access to the beach, and all
                        inclusive tours offered from our resort, we ensure you
                        will never experience a dull moment. Come and spend
                        evening catching a movie in our private cinema.
                      </p>
                    </div>
                    <div>
                      <button
                        className="btn-primary"
                        onClick={() => handleClickRooms(_id)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <p style={{ fontSize: 25, textAlign: "center", padding: "10px" }}>
        View{" "}
        <Link onClick={() => navigate("/rooms")}>
          <span style={{ color: "#fe5d5d" }}>More...</span>
        </Link>
      </p>
    </div>
  );
};

export default SomeHotels;
