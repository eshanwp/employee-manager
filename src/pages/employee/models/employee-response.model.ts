import { GenderEnum } from '@/enums/gender.enum';

export interface EmployeeResponseModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  photo: string;
  gender: GenderEnum;
}
