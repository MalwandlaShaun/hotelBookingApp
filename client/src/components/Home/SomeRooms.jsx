// import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_ROOMS_BY_Hotel_ID } from "../../Api/ApiConstant";
import { getData } from "../../Api/commonServices";
import gofLoader from "../../assets/loader.gif";
import Link from "antd/lib/typography/Link";
//import { useDispatch } from "react-redux";
//import { setHotel } from "../../features/hotelSlice"; // Path to your slice

//const { Option } = Select;
const SomeHotels = () => {
  let navigate = useNavigate();

  const [inputRange] = useState(100);
  const [rooms, setRooms] = useState([]);
  const hotelID = "631263598e84d4338e2bb9c5";
  const [, setTotalPage] = useState(null);
  const [paginationLimit] = useState(4);
  const [page] = useState(1);
  const [active] = useState(1);
  console.log("active", active);
  // GET_ROOMS_BY_ID
  useEffect(() => {
    const getPost = async () => {
      const filterData = {
        hotelId: hotelID,
        lowestPrice: 100,
        heightPrice: 500,
        page: 1,
        limit: paginationLimit,
      };
      try {
        const { data } = await getData(GET_ROOMS_BY_Hotel_ID, filterData);
        setTotalPage(data.result);
        setRooms(data?.rooms);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [hotelID, inputRange, page]);

  return (
    <div>
      <div>
        <div className="head-content">
          <h1>
            Our Most Popular <span style={{ color: "#fe5d5d" }}>Rooms</span>
          </h1>
        </div>

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
          {rooms.slice(0, 4)?.map(({ _id, photo, title, desc, price }) => (
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
