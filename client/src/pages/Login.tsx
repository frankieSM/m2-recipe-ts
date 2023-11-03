import React from "react";
import styles from "./login.module.css";
import "../assets/login.jpeg";
import { Row, Col, Typography, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      // Make an API request to authenticate the user
      const response = await axios.post("http://localhost:3001/login", values);

      if (response.status === 200) {
        message.success("Login successful");
        console.log(response.data);
        localStorage.setItem("userId", response.data.user._id);

        navigate("/recipe"); // Redirect to the dashboard or the desired route
      } else {
        message.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error in onFinish:", error);
      message.error("Login failed. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <Row>
        {/* Left Section of Picture */}
        <Col sm={0} md={12} lg={12} xs={12} className={styles.left}>
          <div>
            <img src="client\src\assets\login.jpeg" alt="Login Illustration" />
          </div>
        </Col>

        {/* Right Section of Picture */}
        <Col sm={24} md={12} lg={12} xs={12} className={styles.right}>
          <div className={styles.header}>
            <Typography.Title level={3}>Welcome Back</Typography.Title>
            <Typography.Text>
              Please enter your credentials to Log In
            </Typography.Text>
          </div>

          <div className={styles.loginForm}>
            <Form layout="vertical" autoComplete="on" onFinish={onFinish}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please Input Your Email",
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
                    message: "Please Input Your Password",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className={styles.btn}>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className={styles.makeAccount}>
            <p>
              Don't have an account?
              <a href="/signup">Create Account</a>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
