export interface poster {
  $key: String;

  body: String;

  data: Date;

  img: String;

  stage: String;

  teacher: String;

  title: String;

}
export interface posterAdmin {
  $key: String;

  body: String;

  data: Date;

  status: String;

  title: String;

}


export interface pdfS {
  $key: String;
  course: String;

  nameSubject: String;

  nameTech: String;

  stage: String;

  urlpdf: String;


}