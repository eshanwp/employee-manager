import { GenderEnum } from '@/enums/gender.enum';

export interface EmployeeRequestModel {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: GenderEnum;
}
