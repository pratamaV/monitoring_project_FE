import { UserModel } from "../user/user.model";

export interface DefaultResponse {
    responseCode: string;
    responseStatus: string;
    data: any[];
} 

export interface TrainingModel {
    id : string;
    competenceCode : string;
    competence : string;
    subCompetenceCode : string;
    subCompetence : string;
    masterTraining : MasterTrainingModel; 
    businessIssues : string;
    performanceIssues : string;
    competencyIssues : string
    status : string;
    divisionCode : string;
    idUsers : UserModel;
    creationDate : Date;
    lastModifiedBy : Date; 
}

export interface MasterTrainingModel {
    id : string;
    trainingName : string;
    subCompetenceCode : string;
}