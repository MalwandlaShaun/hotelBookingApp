import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
} from "antd";
import axios from "axios";
import { useState } from "react";
import { FiCamera } from "react-icons/fi";
import { ADD_NEW_ROOM } from "../../../api/ApiConstant";
import { postData } from "../../../api/commonServices";
import { Row } from "antd";
import PropTypes from "prop-types";

const { Option } = Select;
const AddRoomHotelModal = ({
  isRoomModalVisible,
  setIsRoomModalVisible,
  setRender,
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [allRoomImage, setAllRoomImage] = useState([]);
  const [rooms, setRooms] = useState([]);

  console.log("city", city);
  const addNewRoom = async (newRoom) => {
    console.log("newData", newRoom);

    try {
      const { data } = await postData(ADD_NEW_ROOM, newRoom);
      console.log(data);
      if (data) {
        message.success(`New Room added successful...`, 5);
      }
      setIsRoomModalVisible();
      setRender(true);
    } catch (errors) {
      message.error(errors?.response?.data?.message);
      console.log(errors);
    }
  };

  const handleCHangeCIty = (value) => {
    setCity(value);
  };

  const onFinish = (values) => {
    console.log(values);
    const newRoom = {
      hotelId: "631263598e84d4338e2bb9c5",
      title: values.title,
      maxPeople: values.maxPeople,
      price: values.price,
      photo: imageUrl,
      desc: values.desc,
      photos: allRoomImage,
    };
    addNewRoom(newRoom);
  };

  //ALL Image Upload
  const handleAllImageUpload = async (e) => {
    setLoading(true);
    console.log(e.target.files[0]);
    const imageFile = e.target.files[0];
    const data = new FormData();
    data.append("file", imageFile);
    data.append("api_key", "827175248696299");
    data.append("upload_preset", "ek6xqjmo");

    try {
      const result = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.REACT_APP_CLOUD_NAME
        }/upload`,
        data
      );
      setAllRoomImage([...allRoomImage, result.data.secure_url]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Upload Cover Room Image
  const handleImageUpload = async (e) => {
    setLoading(true);
    console.log(e.target.files[0]);
    const imageFile = e.target.files[0];
    const data = new FormData();
    data.append("file", imageFile);
    data.append("api_key", "827175248696299");
    data.append("upload_preset", "ek6xqjmo");

    try {
      const result = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.REACT_APP_CLOUD_NAME
        }/upload`,
        data
      );
      setImageUrl(result.data.secure_url);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("ROOMS", rooms);

  return (
    <div>
      <Modal
        title="Add Room"
        open={isRoomModalVisible}
        onCancel={() => setIsRoomModalVisible(false)}
        footer={null}
      >
        <Form onFinish={onFinish} layout="vertical">
          <div className="avatar-profile">
            <img
              src={
                imageUrl ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoHwEKgp5KrMKgSKdnyn_3T0-kCjrv-ls0zA&usqp=CAU"
              }
              style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              alt=""
            />
            <input
              type="file"
              id="img"
              name="fav_language"
              onChange={handleImageUpload}
            />
            <div className="svg-avatar">
              <label htmlFor="img">
                <FiCamera style={{ fontSize: "40px", cursor: "pointer" }} />
              </label>
            </div>
          </div>
          <Row>
            {allRoomImage.map((image) => (
              <Col span={4} key={image}>
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={image}
                  alt=""
                />
              </Col>
            ))}
          </Row>
          {loading && <p style={{ color: "red" }}>Uploading....</p>}

          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item
                style={{ width: "50%", marginTop: "1%", maxHeight: "100%" }}
                name="maxPeople"
                rules={[
                  {
                    required: true,
                    message: "Select Max People!",
                  },
                ]}
              >
                <Select
                  placeholder="Select MaxPeople"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                  <Option value={3}>3</Option>
                  <Option value={4}>4</Option>
                  <Option value={6}>5</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price "
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Enter Room Price"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            style={{ width: "100%", marginTop: "1%", maxHeight: "100%" }}
            name="city"
            rules={[
              {
                required: true,
                message: "Select your city!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select City"
              optionFilterProp="children"
              onChange={handleCHangeCIty}
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              <Option value="Joburg">Joburg</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Room description"
            name="desc"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea placeholder="Room description" />
          </Form.Item>
          <Form.Item label="Upload Rooms">
            <input
              type="file"
              style={{ width: "100%", height: "100%" }}
              id="img"
              name="fav_language"
              onChange={handleAllImageUpload}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

AddRoomHotelModal.propTypes = {
  isRoomModalVisible: PropTypes.bool.isRequired,
  setIsRoomModalVisible: PropTypes.func.isRequired,
  setRender: PropTypes.func.isRequired,
};

export default AddRoomHotelModal;
