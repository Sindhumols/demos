import { ProfileComponent } from './../profile/profile.component';
import { DailogBoxComponent } from './../dailog-box/dailog-box.component';
import { Countryreport } from './../../countryreport';
import { RepotersService } from './../services/repoters.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.scss']
})
export class Covid19Component implements OnInit {
  ELEMENT_DATA: any;


  dataSource = [];
  displayedColumns: string[] = ['day', 'totalSamplesTested', 'totalIndividualsTested', 'totalPositiveCases', 'action'];
  // dataSource = new MatTableDataSource<any>();
  response: any = [];

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  constructor(private service: RepotersService,
    public dialog: MatDialog) { }

  redirect() {

  }


  openDialog(action, obj, index) {
    obj.action = action;
    console.log("Index is: ", index);
    const dialogRef = this.dialog.open(DailogBoxComponent, {
      width: '280px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {

        this.updateRowData(result.data, index);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data, index);
      }
    });
  }
  /*  ---add row---- */
  addRowData(row_obj) {
    this.dataSource.push({
      day: row_obj.day,
      totalSamplesTested: row_obj.totalSamplesTested,
      totalIndividualsTested: row_obj.totalIndividualsTested,
      totalPositiveCases: row_obj.totalPositiveCases,
      source: row_obj.source
    });
    this.table.renderRows();
    console.log('row', this.dataSource);
    alert("row added successfully");
  }


  /*  ---edit row---- */
  updateRowData(row_obj, index) {
    this.dataSource[index] = row_obj;
    this.table.renderRows();
    console.log("Update", this.dataSource);
    alert("updated successfully");

  }

  /*  ---delete row---- */

  deleteRowData(row_obj, index) {
    this.dataSource.splice(index, 1);
    console.log('delete', this.dataSource);
    this.table.renderRows();
    alert("deleted the row successfully");
  }

  ngOnInit() {
    this.getAllReports();
  }

  public getAllReports() {
    this.service.covid19Reports().
      subscribe((response) => {
        console.log('response', response);

        this.dataSource = response["data"];
      });
  }
}
