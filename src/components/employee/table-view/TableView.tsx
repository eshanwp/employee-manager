import React, { FC, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { useQuery } from 'react-query';
import { findAllEmployees } from '@/pages/employee/services/employee.service';
import { EmployeeResponseModel } from '@/pages/employee/models/employee-response.model';
import { GenderEnum } from '@/enums/gender.enum';
import FilterOptionsModel from '@/models/filter-options.model';
import PaginationResultsModal from '@/models/pagination-results.modal';
import { MutateFunction } from 'react-query/types/core/types';
import EmployeeActionButtons from '@/components/employee/employee-actions/EmployeeActionButtons';

interface TableViewProps {
  mutateEmployee: MutateFunction;
}

const TableView: FC<TableViewProps> = ({ mutateEmployee }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} employees`
  });

  const [filterOptionsModel, setFilterOptionsModel] = useState<FilterOptionsModel>({
    offset: 0,
    limit: 0,
    selects: ['firstName', 'lastName', 'email', 'phoneNumber', 'photo', 'gender', 'createdOn'],
    sort: ['createdOn-']
  });

  const { isLoading, data: employeeList } = useQuery(
    ['find-employees', filterOptionsModel],
    () => findAllEmployees(filterOptionsModel),
    {
      keepPreviousData: true,
      //This function will fire any time the query successfully fetches new data and used to change the pagination properties
      onSuccess: (data: PaginationResultsModal<EmployeeResponseModel>) => {
        setPagination({
          ...pagination,
          total: data.totalItems
        });
      }
    }
  );

  const columns: ColumnsType<EmployeeResponseModel> = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, record: EmployeeResponseModel) => <img src={record.photo} className="avatar" />
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: true
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: true
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      sorter: true
    },
    {
      title: 'Phone',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
      sorter: true
    },
    {
      title: 'Gender',
      key: 'gender',
      dataIndex: 'gender',
      sorter: true,
      render: (_, record: EmployeeResponseModel) => (
        <div>{record.gender === GenderEnum.MALE ? 'Male' : 'Female'}</div>
      )
    },
    {
      title: 'Action',
      key: 'action',
      width: '7%',
      render: (_, employee: EmployeeResponseModel) => (
        <EmployeeActionButtons employee={employee} mutateEmployee={mutateEmployee} />
      )
    }
  ];

  /**
   * @des Handle the functionality for pagination
   * @param pagination
   * @param filters
   * @param sorter
   */
  const handleTableChange = async (pagination, filters, sorter) => {
    const offset = (pagination.current - 1) * pagination.pageSize;
    const sortingField = sorter.field ? sorter.field : 'createdOn';
    const sortingDirection = sorter.order === 'ascend' ? '+' : '-';
    const filterOptionsModel: FilterOptionsModel = {
      offset: offset,
      limit: pagination.pageSize,
      selects: ['firstName', 'lastName', 'email', 'phoneNumber', 'photo', 'gender', 'createdOn'],
      sort: [`${sortingField}${sortingDirection}`]
    };
    setFilterOptionsModel(filterOptionsModel);
    setPagination({
      ...pagination,
      current: pagination.current,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
    });
  };

  return (
    <div className="table-view">
      <Table
        columns={columns}
        dataSource={employeeList?.items ?? []}
        size="small"
        loading={isLoading}
        sortDirections={['descend', 'ascend']}
        showSorterTooltip={false}
        pagination={pagination}
        rowKey={(record) => record.id}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default TableView;
