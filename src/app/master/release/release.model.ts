import {ProjectModel} from '../project/project.model';
import {TaskModel, TaskModel2} from '../task/task.model';

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
  project: ProjectModel;
  statusRelease: string;
}

export interface ApiResponseRelease {
  content: ReleaseModel2;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
}
