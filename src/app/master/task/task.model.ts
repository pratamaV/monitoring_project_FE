<<<<<<< HEAD
export interface TaskModel{
    id : string;
    taskName : string;
    assignedTo : string;
    score : number;
    weight : number;
    statusDone : string;
    taskProsentase : string;
    finalTarget : string;
    taskDocument : string;
}
=======
import {UserModel} from '../project/project.model';
import {ReleaseModel} from '../release/release.model';

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
>>>>>>> development-pull-wnt
