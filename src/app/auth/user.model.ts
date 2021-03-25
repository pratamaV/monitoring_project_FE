export interface User {
  directorateUser: string;
  divisiUser: {
    id: string;
    divisionName: string;
    divisionCode: string;
  };
  email: string;
  username: string;
  id: string;
  phone: string;
  userRole: string;
  statusUser: string;
}
