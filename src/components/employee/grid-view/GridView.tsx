import React, { FC, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { findAllEmployees } from '@/pages/employee/services/employee.service';
import FilterOptionsModel from '@/models/filter-options.model';
import { Button, Card, Col, Descriptions, Row, Spin } from 'antd';
import { GenderEnum } from '@/enums/gender.enum';
import { EmployeeResponseModel } from '@/pages/employee/models/employee-response.model';
import { MutateFunction } from 'react-query/types/core/types';
import EmployeeActionButtons from '@/components/employee/employee-actions/EmployeeActionButtons';

interface GridViewProps {
  mutateEmployee: MutateFunction;
}

const GridView: FC<GridViewProps> = ({ mutateEmployee }) => {
  const [isEmptyData, setIsEmptyData] = useState(false);

  const fetchEmployees = async ({ pageParam = 1 }) => {
    const filterOptionsModel: FilterOptionsModel = {
      offset: (pageParam - 1) * 4,
      limit: 4,
      selects: ['firstName', 'lastName', 'email', 'phoneNumber', 'photo', 'gender'],
      sort: ['createdOn-']
    };
    const response = await findAllEmployees(filterOptionsModel);
    setIsEmptyData(response.items.length === 0);
    return response.items;
  };

  const { isLoading, data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(['find-employees-grid'], fetchEmployees, {
      getNextPageParam: (lastPage, page) => {
        const pageBottom = document.getElementById('page-bottom');
        if (pageBottom) {
          pageBottom.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'start' });
        }
        // page: List of all pages that have already been fetched
        if (isEmptyData)
          // Return `undefined` when there are no more pages
          return undefined;
        //return `nextPage` as integer
        else return page.length + 1;
      }
    });
  return (
    <Spin spinning={isLoading}>
      <div className="grid-view">
        {data?.pages.map((group: EmployeeResponseModel[], i) => (
          <Row gutter={32} key={i} className="mb-10">
            {group?.map((employee: EmployeeResponseModel, j) => (
              <Col span={6} key={j}>
                <Card>
                  <img src={employee.photo} className="avatar" />
                  <Descriptions>
                    <Descriptions.Item label="First Name" span={3}>
                      {employee.firstName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Name" span={3}>
                      {employee.lastName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email" span={3}>
                      {employee.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone Number" span={3}>
                      {employee.phoneNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="Gender" span={3}>
                      {employee.gender === GenderEnum.MALE ? 'Male' : 'Female'}
                    </Descriptions.Item>
                  </Descriptions>

                  <EmployeeActionButtons employee={employee} mutateEmployee={mutateEmployee} />
                </Card>
              </Col>
            ))}
          </Row>
        ))}
        <div className="load-more-div">
          <Button
            disabled={!hasNextPage}
            onClick={fetchNextPage}
            loading={isFetching || isFetchingNextPage}
            type="primary"
            className="btn-secondary">
            Load More
          </Button>
        </div>
        <div id="page-bottom" />
      </div>
    </Spin>
  );
};

export default GridView;
