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
  taskDoc: File;
  release: ReleaseModel ;
}
