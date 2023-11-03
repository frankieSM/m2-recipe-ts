import React from "react";
import styles from "./signup.module.css";
import { Row, Col, Typography, Form, Input, Button, Select } from "antd";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import signupImage from "../assets/signup.jpeg";
import axios from "axios";

const { Option } = Select;

function Signup() {
  // States and Effects

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      // Make an API request to submit the form data to your backend
      const response = await axios.post("http://localhost:3001/signup", values);

      console.log(response);

      if (response.status === 201) {
        message.success("Account created successfully");
        navigate("/login");
      } else {
        message.error("Account creation failed");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      // Display a general error message in case of network or other errors
      message.error("Account creation failed");
    }
  };

  return (
    <div className={styles.container}>
      <Row>
        {/* Left Section of Picture */}
        <Col sm={0} md={12} lg={12} xs={12} className={styles.left}>
          <div>
            <img src={signupImage} alt="Login Illustration" />
          </div>
        </Col>

        {/* Right Section of Picture */}
        <Col sm={24} md={12} lg={12} xs={12} className={styles.right}>
          <div className={styles.header}>
            <Typography.Title level={3}>Create Your Account</Typography.Title>
            <Typography.Text>
              Please enter your data to register
            </Typography.Text>
          </div>

          <div className={styles.loginForm}>
            <Form layout="vertical" autoComplete="on" onFinish={handleSubmit}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email",
                    type: "email",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Age"
                name="age"
                rules={[
                  {
                    required: true,
                    message: "Please input your age",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please select your gender",
                  },
                ]}
              >
                <Select placeholder="Select a gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              {/* Add more fields here as needed */}

              <Form.Item>
                <Button type="primary" htmlType="submit" className={styles.btn}>
                  Sign up
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className={styles.makeAccount}>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Signup;
