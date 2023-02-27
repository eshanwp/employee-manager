import React, { FC, useState } from 'react';
import { Button, Col, Row } from 'antd';
import { IoAppsOutline, IoReorderFourOutline } from 'react-icons/io5';
import TableView from '@/components/employee/table-view/TableView';
import GridView from '@/components/employee/grid-view/GridView';
import PageUrls from '@/constants/page-urls';
import Link from 'next/link';
import EmployeeViewModal from '@/components/employee/employee-modal-view/EmployeeViewModal';
import { useMutation, useQueryClient } from 'react-query';
import { removeEmployee } from '@/pages/employee/services/employee.service';

interface EmployeeListProps {}

const Index: FC<EmployeeListProps> = () => {
  const queryClient = useQueryClient();

  const [isTableView, setIsTableView] = useState<boolean>(true);

  const { mutate: mutateEmployee } = useMutation({
    //A function that performs an asynchronous remove of the employee and returns a promise.
    mutationFn: (id: string) => removeEmployee(id),
    //After a successful mutation, run the invalidateQueries to cause a data re-fetch.
    onSuccess: () => queryClient.invalidateQueries()
  });

  return (
    <div>
      <div className={'main-fix-bg'} />
      <div className="container">
        <Row className="mb-10">
          <Col span={3}>
            <Link href={PageUrls.EMPLOYEE_ADD} as={PageUrls.EMPLOYEE_ADD}>
              <Button type="primary" className="btn-primary">
                Add Employee
              </Button>
            </Link>
            <Button
              type="primary"
              className="btn-secondary floating-btn"
              shape="circle"
              icon={
                isTableView ? (
                  <IoAppsOutline onClick={() => setIsTableView(false)} />
                ) : (
                  <IoReorderFourOutline onClick={() => setIsTableView(true)} />
                )
              }
            />
          </Col>
        </Row>

        <Row gutter={[32, 48]}>
          <Col span={24}>
            {isTableView ? (
              <TableView mutateEmployee={mutateEmployee} />
            ) : (
              <GridView mutateEmployee={mutateEmployee} />
            )}
          </Col>
        </Row>

        <EmployeeViewModal />
      </div>
    </div>
  );
};
export default Index;
