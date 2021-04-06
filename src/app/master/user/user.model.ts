import {DivisionModel} from '../project/project.model';

export interface UserModel{
  id: string;
  username: string;
  userRole: string;
  email: string;
  divisiUser: DivisionModel;
  directorateUser: string;
  password: string;
  statusUser: string;
  totalWeight: number;
  totalPerformance: number;
}

export interface UserModel2{
  id: string;
  username: string;
  userRole: string;
  email: string;
  divisiUser: {
    id: string;
  };
  directorateUser: string;
  password: string;
  statusUser: string;
  totalWeight: number;
  totalPerformance: number;
}

export interface ApiResponseUser {
  content: UserModel[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
}