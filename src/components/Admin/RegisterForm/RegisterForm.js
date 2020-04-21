import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockFilled } from '@ant-design/icons';
import { emailValidation, minLengthValidation } from '../../../utils/formValidation';

import { signUpApi } from '../../../api/user';

import './RegisterForm.scss';

export default function RegisterForm() {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false
    });

    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    });

    const changeForm = e => {
        if (e.target.name === "privacyPolicy") {
            setInputs({
            ...inputs,
            [e.target.name]: e.target.checked
            });
        } else {
            setInputs({
            ...inputs,
            [e.target.name]: e.target.value
            });
        }
    };

    const inputValidation = e => {
        const { type, name } = e.target;

        if(type === "email") {
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target)
            });
        }

        if(type === "password") {
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target, 6)
            });
        }

        if(type === "checkbox") {
            setFormValid({
                ...formValid,
                [name]: e.target.checked
            })
        }
    };
    
    const register = async e => {
        // const { email, password, repeatPassword, privacyPolicy } = formValid;
        const emailVal = inputs.email;
        const passwordVal = inputs.password;
        const repeatPasswordVal = inputs.repeatPassword;
        const privacyPolicyVal = inputs.privacyPolicy;

        console.log(inputs.email);
        console.log(inputs.password);
        console.log(inputs.repeatPassword);
        console.log(inputs.privacyPolicy);

        if ( !emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal ) {
            notification['error']({
                message: "Todos los campos son obligatorios"
            });
        } else {
            if (passwordVal !== repeatPasswordVal) {
                notification['error']({
                    message: "Las contraseñas deben ser iguales"
                });
            } else {
                // TO DO: Conectar con el API y registrar al usuario.
                const result = await signUpApi(inputs);
                console.log(result);
            }
        }
    };

    return (
        <Form className="regiter-form" onFinish={register} onChange={changeForm}>
            <Form.Item>
                <Input 
                    prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.email}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LockFilled style={{ color: "rgba(0,0,0,.25)" }} />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.password}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LockFilled style={{ color: "rgba(0,0,0,.25)" }} />}
                    type="password"
                    name="repeatPassword"
                    placeholder="Repetir contraseña"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.repeatPassword}
                />
            </Form.Item>
            <Form.Item>
                <Checkbox 
                    name="privacyPolicy"
                    onChange={inputValidation} 
                    checked={inputs.privacyPolicy}
                >
                    He leído y acepto la política de privacidad.
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="register-form__button">
                    Crear cuenta
                </Button>
            </Form.Item>
        </Form>
    );
}