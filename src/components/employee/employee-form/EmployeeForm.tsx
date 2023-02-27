import React, { FC } from 'react';
import { Button, Card, Col, Form, Input, Radio, Row } from 'antd';
import { GenderEnum } from '@/enums/gender.enum';
import { Callbacks } from 'rc-field-form/lib/interface';
import { Values } from 'async-validator';
import { FormInstance } from 'antd/es/form/hooks/useForm';

interface EmployeeFormProp {
  onFinish: Callbacks<Values>['onFinish'];
  form: FormInstance<Values>;
  buttonName: string;
}

const EmployeeForm: FC<EmployeeFormProp> = ({ onFinish, form, buttonName }) => {
  return (
    <Card>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[32, 48]}>
          <Col span={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  message: "You can't keep this as empty",
                  required: true
                },
                {
                  message: 'Invalid first name',
                  pattern: '^[a-zA-Z\\s]{6,10}$'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                {
                  message: "You can't keep this as empty",
                  required: true
                },
                {
                  message: 'Invalid last name',
                  pattern: '^[a-zA-Z\\s]{6,10}$'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  message: "You can't keep this as empty",
                  required: true
                },
                {
                  type: 'email',
                  message: 'Invalid email'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[32, 48]}>
          <Col span={8}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                {
                  message: "You can't keep this as empty",
                  required: true
                },
                {
                  message: 'Invalid phone number',
                  pattern:
                    '^(?:0|94|\\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  message: "You can't keep this as empty",
                  required: true
                }
              ]}
            >
              <Radio.Group>
                <Radio value={GenderEnum.MALE}> Male </Radio>
                <Radio value={GenderEnum.FEMALE}> Female </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[32, 48]}>
          <Col span={2} offset={22}>
            <Button htmlType="submit" type="primary" className="btn-primary f-right">
              {buttonName}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default EmployeeForm;
