import React, { FC } from 'react';
import { Button, Form, Spin } from 'antd';
import PageUrls from '@/constants/page-urls';
import Link from 'next/link';
import { useMutation } from 'react-query';
import { EmployeeRequestModel } from '@/pages/employee/models/employee-request.model';
import { createEmployee } from '@/pages/employee/services/employee.service';
import { Values } from 'async-validator';
import EmployeeForm from '@/components/employee/employee-form/EmployeeForm';

interface EmployeeListProps {}

const Index: FC<EmployeeListProps> = () => {
  const [form] = Form.useForm();

  const { mutate: mutateEmployee, isLoading } = useMutation({
    //A function that performs an asynchronous creation of the employee and returns a promise.
    mutationFn: (employeeRequestModel: EmployeeRequestModel) =>
      createEmployee(employeeRequestModel),
    //This function will reset the form when the mutation is successful
    onSuccess: () => form.resetFields()
  });

  /**
   * @des Handle the functionality for creating employee
   * @param values
   */
  const onFinish = (values: Values) => {
    const employeeRequestModel: EmployeeRequestModel = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      gender: values.gender
    };
    mutateEmployee(employeeRequestModel);
  };

  return (
    <Spin spinning={isLoading}>
      <div className={'main-fix-bg'} />
      <div className="container">
        <Link href={PageUrls.EMPLOYEE} as={PageUrls.EMPLOYEE}>
          <Button type="primary" className="btn-primary mb-10">
            LIST VIEW
          </Button>
        </Link>

        <EmployeeForm onFinish={onFinish} form={form} buttonName="Add" />
      </div>
    </Spin>
  );
};
export default Index;
