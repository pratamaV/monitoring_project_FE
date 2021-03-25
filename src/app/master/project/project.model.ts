import {ReleaseModel} from '../release/release.model';

export interface ProjectModel{
    id: string;
    projectCode: string;
    projectName: string;
    pmo: UserModel;
    pm: UserModel;
    benefit: string;
    description: string;
    coPM: UserModel;
    divisiUser: DivisionModel;
    directorateUser: string;
    status: string;
    targetLive: Date;
    prosentaseProject: number;
    budget: number;
    contracted_value: number;
    paymentRealization: number;
    score: number;
    weight: number;
    categoryActivity: string;
    categoryInitiative: string;
    statusProject: string;
    keyword: string;
    releaseList?: ReleaseModel[];
    departmentHead: UserModel;
}

export interface ProjectModel2{
  id: string;
  projectCode: string;
  projectName: string;
  pmo: {
    id: string
  };
  pm: {
    id: string
  };
  benefit: string;
  description: string;
  coPM: {
    id: string
  };
  divisiUser: {
    id: string
  };
  directorateUser: string;
  status: string;
  targetLive: Date;
  prosentaseProject: number;
  budget: number;
  contracted_value: number;
  paymentRealization: number;
  score: number;
  weight: number;
  categoryActivity: string;
  categoryInitiative: string;
  statusProject: string;
  keyword: string;
  departmentHead: {
    id: string;
  };

}

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

export interface DivisionModel {
  id: string;
  divisionName: string;
  divisionCode: string;
}
