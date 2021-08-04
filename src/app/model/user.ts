export interface userAdmin {
  displayName: string;
  email: string;
  password: string;
  role: string;
}

export interface userTeacher {
  displayName: string;
  email: string;
  password: string;
  role: string;
  Teachstage: string;
  careerTitle: string;
}

export interface userStudent {
  displayName: string;
  email: string;
  password: string;
  role: string;
  stage: string;
}

