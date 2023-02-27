import React, { FC } from 'react';
import { Modal, Tooltip } from 'antd';
import { IoEyeOutline, IoPencil, IoTrashBinOutline } from 'react-icons/io5';
import Link from 'next/link';
import PageUrls from '@/constants/page-urls';
import { useAppDispatch } from '@/store/store';
import { MutateFunction } from 'react-query/types/core/types';
import { EmployeeResponseModel } from '@/pages/employee/models/employee-response.model';
import { EmployeeActions } from '@/pages/employee/store/employee.slice';

interface EmployeeActionButtonsProps {
  employee: EmployeeResponseModel;
  mutateEmployee: MutateFunction;
}

const { confirm } = Modal;

const EmployeeActionButtons: FC<EmployeeActionButtonsProps> = ({ employee, mutateEmployee }) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Tooltip placement="top" title="Remove">
        <IoTrashBinOutline
          onClick={() => {
            confirm({
              title: 'Would you like to remove this employee?',
              onOk() {
                mutateEmployee(employee.id);
              },
              okText: 'Yes'
            });
          }}
          size="16px"
          className="ml-5 action-icon"
        />
      </Tooltip>
      <Tooltip placement="top" title="Update">
        <Link
          href={`${PageUrls.EMPLOYEE_EDIT}/[id]`}
          as={`${PageUrls.EMPLOYEE_EDIT}/${employee.id}`}
        >
          <IoPencil size="16px" className="ml-5 action-icon" />
        </Link>
      </Tooltip>
      <Tooltip placement="top" title="View">
        <IoEyeOutline
          onClick={() => {
            dispatch(EmployeeActions.setEmployee(employee));
            dispatch(EmployeeActions.setIsEmployeeModalOpen(true));
          }}
          size="16px"
          className="ml-5 action-icon"
        />
      </Tooltip>
    </div>
  );
};

export default EmployeeActionButtons;
