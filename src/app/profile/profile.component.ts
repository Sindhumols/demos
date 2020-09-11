import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogBoxComponent } from '../dailog-box/dailog-box.component';
import { MatTable } from '@angular/material/table';

export interface UsersData {
  contactNumber: string;
  defaultEmail:string;
  dialCountryCode:string;
  dialNumber:number;
  dialExtension:string;
  emailAddress:string;

}

const ELEMENT_DATA: UsersData[] = [
  {
    contactNumber: "9678909865",
    defaultEmail: "jacob@gmail.com",
    dialCountryCode: "+91",
    dialExtension: "#333",
    dialNumber: 111,
    emailAddress: "ann@gmail.com"
  },
  {
    contactNumber: "6789765434",
    defaultEmail: "aish@gmail.com",
    dialCountryCode: "+645",
    dialExtension: "#555",
    dialNumber: 22,
    emailAddress: "shal@gmail.com"
  }
];

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  displayedColumns: string[] = ['dialNumber','dialExtension','dialCountryCode','contactNumber'];
  displayedrows: string[] = ['defaultEmail','emailAddress'];
  dataSource=ELEMENT_DATA;
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  constructor(public dialog: MatDialog) { }
  Email:[];
  telephone:[];


  ngOnInit(): void {
  }

    


}
