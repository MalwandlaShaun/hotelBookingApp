import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_ALL_ROOMS } from "../../Api/ApiConstant";
import { getData } from "../../Api/commonServices";
import gofLoader from "../../assets/loader.gif";
import Link from "antd/lib/typography/Link";
//import { useDispatch } from "react-redux";
//import { setHotel } from "../../features/hotelSlice"; // Path to your slice

const SomeHotels = () => {
  let navigate = useNavigate();

  const inputRange = 100
  const [rooms, setRooms] = useState([]);
  const hotelID = "631263598e84d4338e2bb9c5";
 
  const page = 1

  // GET_ROOMS_BY_ID

  // Define your data

  // Convert the data to a JSON string
  const jsonData = JSON.stringify(rooms);

  // Set the JSON string in local storage with a specific key
  localStorage.setItem("rooms", jsonData);

  // To retrieve the data later:
  // const storedData = localStorage.getItem("rooms");

  // // Parse the JSON string back into a JavaScript object
  // const retrievedData = JSON.parse(storedData);

  // console.log(retrievedData); // This will log the retrieved data

  useEffect(() => {
    const getPost = async () => {
   const filterData = {
     lowestPrice: 100,
     heightPrice: 10000,
   
   };
      try {
        const { data } = await getData(GET_ALL_ROOMS, filterData);
        setRooms(data?.rooms);
          const jsonData = JSON.stringify(data?.rooms);

          
          localStorage.setItem("rooms", jsonData);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [hotelID, inputRange, page]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isSmallScreen = windowWidth <= 980; // Define your breakpoint here

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div>
        <div className="head-content">
          <h1>
            Our Most Popular <span style={{ color: "#fe5d5d" }}>Rooms</span>
          </h1>
        </div>
      </div>
      {!isSmallScreen ? (
        <div
          className="rooms"
          style={{
            padding: "0 5%",
            paddingInline: "20%",
            width: "60vw",
          }}
        >
          {rooms.length < 1 && (
            <div style={{ width: "400px", margin: "auto" }}>
              <img src={gofLoader} alt="" style={{ maxWidth: "100%" }} />
            </div>
          )}
          {rooms
            .reverse()
            .slice(0, 4)
            .map(({ _id, photo, title, desc, price }) => (
              <div
                key={_id}
                style={{
                  width: "60vw",
                  height: "50vh",
                  display: "flex",

                  marginBottom: 50,
                  borderRadius: 50,
                  padding: 0,
                }}
              >
                <div className="imageContainer">
                  <img
                    style={{
                      width: "30vw",
                      height: "50vh",
                    }}
                    src={photo}
                    alt=""
                  />
                </div>

                <div
                  style={{
                    backgroundColor: "#0A223D",

                    width: "30vw",
                    padding: "20px",
                  }}
                >
                  <div>
                    <h3 style={{ color: "white" }}>{title}</h3>
                    <p style={{ color: "white" }}>{desc}</p>
                    <p style={{ color: "white" }}>R{price}</p>
                  </div>
                  <div>
                    <button
                      className="btn-primary"
                      onClick={() => navigate(`/room/${_id}/${hotelID}`)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <Row gutter={[14, 14]}>
          {rooms
            .reverse()
            .slice(0, 4)
            ?.map(({ _id, photo, desc, title, price }) => (
              <Col
                key={_id}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                lg={{ span: 24 }}
                md={{ span: 12 }}
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
                      <button
                        className="btn-primary"
                        onClick={() => navigate(`/room/${_id}/${hotelID}`)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
        </Row>
      )}

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
