import {ReleaseModel, ReleaseModel2} from '../release/release.model';

export interface IssuedModel{
  id: string;
  issuedDescription: string;
  issuedDate: Date;
  issuedPlan: string;
  estEnddate: Date;
  pic: string;
  status: string;
  release: {
    id: string
  };
}

export interface IssuedModel2{
  id: string;
  issuedDescription: string;
  issuedDate: Date;
  issuedPlan: string;
  estEnddate: Date;
  pic: string;
  status: string;
  release: ReleaseModel2;
}
