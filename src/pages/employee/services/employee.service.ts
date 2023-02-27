import axiosInstance from './../../../config/axios-instance';
import { EmployeeResponseModel } from '@/pages/employee/models/employee-response.model';
import ResponseModel from '@/models/response.model';
import ApiUrls from '@/constants/api-urls';
import { getErrorMessage, showNotification } from '@/helpers/notification-helper';
import FilterOptionsModel from '@/models/filter-options.model';
import PaginationResultsModal from '@/models/pagination-results.modal';
import { EmployeeRequestModel } from '@/pages/employee/models/employee-request.model';
import { message } from 'antd';

/**
 * @des Fetching the employees details according to the give specified criteria
 * @param filterOptionsModel
 */
export const findAllEmployees = async (
  filterOptionsModel: FilterOptionsModel
): Promise<PaginationResultsModal<EmployeeResponseModel>> => {
  try {
    const apiResponse = await axiosInstance.post<
      ResponseModel<PaginationResultsModal<EmployeeResponseModel>>
    >(`${ApiUrls.EMPLOYEE}${ApiUrls.FILTER}`, filterOptionsModel);
    return apiResponse.data.data;
  } catch (error) {
    showNotification('error', getErrorMessage(error));
    throw new Error('API Error');
  }
};

/**
 * @des Creating the employee
 * @param employeeRequestModel
 */
export const createEmployee = async (employeeRequestModel: EmployeeRequestModel): Promise<void> => {
  try {
    const apiResponse = await axiosInstance.post<ResponseModel<EmployeeResponseModel>>(
      `${ApiUrls.EMPLOYEE}`,
      employeeRequestModel
    );
    message.success(apiResponse.data.message);
  } catch (error) {
    showNotification('error', getErrorMessage(error));
    throw new Error('API Error');
  }
};

/**
 * @des Updating the employee
 * @param employeeRequestModel
 * @param id
 */
export const updateEmployee = async (
  employeeRequestModel: EmployeeRequestModel,
  id: string
): Promise<void> => {
  try {
    const apiResponse = await axiosInstance.put<ResponseModel<EmployeeResponseModel>>(
      `${ApiUrls.EMPLOYEE}/${id}`,
      employeeRequestModel
    );
    message.success(apiResponse.data.message);
  } catch (error) {
    showNotification('error', getErrorMessage(error));
    throw new Error('API Error');
  }
};

/**
 * @des Removing the employee according to the given id
 * @param id
 */
export const removeEmployee = async (id: string): Promise<void> => {
  try {
    const apiResponse = await axiosInstance.delete<ResponseModel<EmployeeResponseModel>>(
      `${ApiUrls.EMPLOYEE}/${id}`
    );
    message.success(apiResponse.data.message);
  } catch (error) {
    showNotification('error', getErrorMessage(error));
    throw new Error('API Error');
  }
};
