import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Descriptions, Modal } from 'antd';
import { EmployeeActions, EmployeeSliceModel } from '@/pages/employee/store/employee.slice';
import { GenderEnum } from '@/enums/gender.enum';

interface EmployeeViewModalProps {}

const EmployeeViewModal: FC<EmployeeViewModalProps> = () => {
  const dispatch = useAppDispatch();

  const { employee, isEmployeeModalOpen } = useAppSelector<EmployeeSliceModel>(
    (state) => state.employeeSlice
  );

  if (!employee) return null;

  return (
    <Modal
      title="Employee Details"
      open={isEmployeeModalOpen}
      footer={
        <Button onClick={() => dispatch(EmployeeActions.setIsEmployeeModalOpen(false))}>
          Cancel
        </Button>
      }
      onCancel={() => dispatch(EmployeeActions.setIsEmployeeModalOpen(false))}
    >
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
    </Modal>
  );
};

export default EmployeeViewModal;
