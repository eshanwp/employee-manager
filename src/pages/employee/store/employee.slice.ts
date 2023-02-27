import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmployeeResponseModel } from '@/pages/employee/models/employee-response.model';

export interface EmployeeSliceModel {
  employee: EmployeeResponseModel;
  isEmployeeModalOpen: boolean;
}

const initialState = {
  employee: null,
  isEmployeeModalOpen: false
} as EmployeeSliceModel;

const employeeSlice = createSlice({
  name: 'employeeSlice',
  initialState: initialState,
  reducers: {
    setEmployee: (state: any, action: PayloadAction<EmployeeResponseModel>) => {
      state.employee = action.payload;
    },
    setIsEmployeeModalOpen: (state: any, action: PayloadAction<boolean>) => {
      state.isEmployeeModalOpen = action.payload;
    }
  }
});

export default employeeSlice;
export const EmployeeActions = employeeSlice.actions;
