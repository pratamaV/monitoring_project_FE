import {UserModel} from '../project/project.model';
import {ReleaseModel, ReleaseModel2} from '../release/release.model';
import {FileModel} from './file.model';

export interface TaskModel{
  id: string;
  taskName: string ;
  taskCode: string ;
  assignedTo: string ;
  score: number ;
  weight: number ;
  statusDone: string ;
  taskProsentase: number ;
  estStartDate: Date;
  estEndDate: Date;
  actStartDate: Date;
  actEndDate: Date;
  taskDoc: File;
  release: string ;
}

export interface TaskModel2{
  id: string;
  taskName: string ;
  taskCode: string ;
  assignedTo: UserModel ;
  score: number ;
  weight: number ;
  statusDone: string ;
  taskProsentase: number ;
  estStartDate: Date;
  estEndDate: Date;
  actStartDate: Date;
  actEndDate: Date;
  taskDocument: string;
  release: ReleaseModel ;
  fileList: FileModel[];
  lastModifiedBy: UserModel;
  lastModifiedDate: Date;
}


export interface TaskModel3{
  id: string;
  taskName: string ;
  taskCode: string ;
  assignedTo: { id: string } ;
  score: number ;
  weight: number ;
  statusDone: string ;
  taskProsentase: number ;
  estStartDate: Date;
  estEndDate: Date;
  actStartDate: Date;
  actEndDate: Date;
  release: { id: string } ;
}

export interface TaskModel4{
  id: string;
  taskName: string ;
  taskCode: string ;
  assignedTo: { id: string } ;
  score: number ;
  weight: number ;
  statusDone: string ;
  taskProsentase: number ;
  estStartDate: Date;
  estEndDate: Date;
  actStartDate: Date;
  actEndDate: Date;
  taskDocument: string;
  release: { id: string } ;
}
export interface TaskModel5{
  id: string;
  taskName: string ;
  taskCode: string ;
  assignedTo: UserModel ;
  score: number ;
  weight: number ;
  statusDone: string ;
  taskProsentase: number ;
  estStartDate: Date;
  estEndDate: Date;
  actStartDate: Date;
  actEndDate: Date;
  taskDocument: string;
  release: ReleaseModel2 ;
  fileList: FileModel[];
}

export interface ApiResponseTask {
  content: TaskModel2[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
}

export interface ApiResponseTask2 {
  content: TaskModel2[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
}
