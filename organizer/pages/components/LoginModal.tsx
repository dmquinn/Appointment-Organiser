import { useState, useRef, Dispatch, SetStateAction, FC } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, Form, Input, Modal } from "antd";
import type { InputRef } from "antd";

const createUser = async (email: string, password: string) => {
  const response = await fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
};
interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}
const LoginModal: FC<Props> = ({ open, setOpen }) => {
  const emailInputRef: any = useRef();
  const passwordInputRef: any = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(
      "clicked",
      emailInputRef.current.value,
      passwordInputRef.current.value
    );
    //@ts-ignore
    const enteredEmail: string = emailInputRef.current.value;
    //@ts-ignore

    const enteredPassword: string = passwordInputRef.current.value;

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        // set some auth state
        router.replace("/");
      }
    } else {
      try {
        console.log(enteredEmail);
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Modal open={open} onOk={submitHandler}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <h4 style={{ borderBottom: "1px solid #dedede", padding: "10px" }}>
            Login{" "}
          </h4>

          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: "Please input user's email!" }]}
          >
            <input
              ref={emailInputRef}
              style={{
                padding: "4px 11px",
                border: "1px solid #d9d9d9",
                borderRadius: "6px",
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: "Please input password!" }]}
          >
            <input
              type="password"
              ref={passwordInputRef}
              style={{
                padding: "4px 11px",
                border: "1px solid #d9d9d9",
                borderRadius: "6px",
                width: "100%",
              }}
            />
          </Form.Item>
          <Button onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </Button>
        </Form>{" "}
      </Modal>
    </>
  );
};

export default LoginModal;
