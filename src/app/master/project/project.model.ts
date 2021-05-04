import {ReleaseModel} from '../release/release.model';

export interface ProjectModel {
  id: string;
  projectCode: string;
  projectName: string;
  benefit: string;
  status: string;
  prosentaseProject: number;
  budget: number;
  contractedValue: number;
  paymentRealization: number;
  score: number;
  weight: number;
  categoryInitiative: string;
  statusProject: string;
  projectDependency: string;
  releaseList?: ReleaseModel[];
  lineItem: string;
  lastModifiedBy: UserModel;
  lastModifiedDate: Date;
}

export interface ProjectModel2 {
  id: string;
  projectCode: string;
  projectName: string;
  benefit: string;
  status: string;
  prosentaseProject: number;
  budget: number;
  contractedValue: number;
  paymentRealization: number;
  score: number;
  weight: number;
  categoryInitiative: string;
  statusProject: string;
  projectDependency: string;
  lineItem: string;
}

export interface UserModel {
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

export interface DivisionModel {
  id: string;
  divisionName: string;
  divisionCode: string;
}

export interface ApiResponseModel {
  content: ProjectModel[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
}
