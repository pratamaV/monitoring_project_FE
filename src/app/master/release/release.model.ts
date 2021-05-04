import {DivisionModel, ProjectModel} from '../project/project.model';
import {TaskModel, TaskModel2} from '../task/task.model';
import {UserModel} from '../user/user.model';

export interface ReleaseModel{
  id: string;
  releaseCode: string;
  releaseName: string;
  score: number;
  weight: number;
  description: string;
  status: string;
  stage: string;
  prosentaseRelease: number;
  estStartdate: Date;
  estEnddate: Date;
  actStartdate: Date;
  actEnddate: Date;
  statusRelease: string;
  pmo: {
    id: string
  };
  pm: {
    id: string
  };
  coPM: {
    id: string
  };
  divisiUser: {
    id: string
  };
  directorateUser: string;
  categoryActivity: string;
  contractedValue: number;
  departmentHead: {
    id: string;
  };
  developmentMode: string;
  project: {
    id: string;
  };
  taskList?: TaskModel2[];
}

export interface ReleaseModel2{
  id: string;
  releaseCode: string;
  releaseName: string;
  score: number;
  weight: number;
  description: string;
  status: string;
  stage: string;
  prosentaseRelease: number;
  estStartdate: Date;
  estEnddate: Date;
  actStartdate: Date;
  actEnddate: Date;
  pmo: UserModel;
  pm: UserModel;
  coPM: UserModel;
  divisiUser: DivisionModel;
  directorateUser: string;
  categoryActivity: string;
  contractedValue: number;
  departmentHead: UserModel;
  developmentMode: string;
  project: ProjectModel;
  statusRelease: string;
  taskList?: TaskModel2[];
  lastModifiedBy: UserModel;
  lastModifiedDate: Date;
}

export interface ApiResponseRelease {
  content: ReleaseModel2[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
}
