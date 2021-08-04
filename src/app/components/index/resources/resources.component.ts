import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  loading: Boolean = false;
  load4C1: Boolean = true;
  // resourcesData: Observable<any[]> ;
  resourcesData: any;
  indexStage: String = "stage1";
  indexCourse: String = "course1";

  constructor(
    private uploadService: UploadService,
  ) { }

  ngOnInit(): void {
    this.uploadService.getAllResources().subscribe(
      (data: Array<any[]>) => {
        this.resourcesData = data;
      }
    );
  }

  filters(stage: String, course: String) {
    return (stage == this.indexStage) && (course == this.indexCourse);
  }

  onTabClick(index: String, typeIndex: String) {
    if (typeIndex == 'stage')
      this.indexStage = index;
    else
      this.indexCourse = index;
  }
}
