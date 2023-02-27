import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PageUrls from '@/constants/page-urls';
import { Button, Form, Spin } from 'antd';
import { useMutation, useQuery } from 'react-query';
import { EmployeeRequestModel } from '@/pages/employee/models/employee-request.model';
import { findAllEmployees, updateEmployee } from '@/pages/employee/services/employee.service';
import { EmployeeResponseModel } from '@/pages/employee/models/employee-response.model';
import { Values } from 'async-validator';
import EmployeeForm from '@/components/employee/employee-form/EmployeeForm';

interface EmployeeListProps {}

const EmployeeEdit: FC<EmployeeListProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  const [form] = Form.useForm();

  const { isLoading: isLoadingEmployee } = useQuery(
    'find-employees-by-id',
    //The function will use to request the employee details according to the filtering criteria.
    () =>
      findAllEmployees({
        selects: ['firstName', 'lastName', 'email', 'phoneNumber', 'photo', 'gender'],
        equals: [`id=${id}`]
      }),
    {
      //Transform or select a part of the data returned by the query function
      select: (data) => data.items[0],
      //This function will fire any time the query successfully fetches new data and set the fetched data into the form
      onSuccess: (data: EmployeeResponseModel) => {
        form.setFieldsValue(data);
      },
      staleTime: 30000
    }
  );

  const { mutate: mutateEmployee, isLoading: isLoadingUpdateEmployee } = useMutation({
    //A function that performs an asynchronous update of the employee and returns a promise.
    mutationFn: ({ employeeRequestModel, id }) => updateEmployee(employeeRequestModel, id),
    //This function handles the page redirection when the mutation is successful
    onSuccess: () => router.push(PageUrls.EMPLOYEE)
  });

  /**
   * @des Handle the functionality for updating employee
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
    mutateEmployee({ employeeRequestModel, id });
  };

  return (
    <Spin spinning={isLoadingUpdateEmployee || isLoadingEmployee}>
      <div className={'main-fix-bg'} />
      <div className="container">
        <Link href={PageUrls.EMPLOYEE} as={PageUrls.EMPLOYEE}>
          <Button type="primary" className="btn-primary mb-10">
            LIST VIEW
          </Button>
        </Link>

        <EmployeeForm onFinish={onFinish} form={form} buttonName="Save" />
      </div>
    </Spin>
  );
};
export default EmployeeEdit;
