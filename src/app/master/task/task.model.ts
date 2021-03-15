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
  finalTarget: Date ;
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
  finalTarget: Date ;
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
  finalTarget: Date ;
  release: { id: string } ;
}
