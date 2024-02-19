import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {

  @ViewChild(EmployeeFormComponent) emp: EmployeeFormComponent;
  constructor(public employeeService: EmployeeService,
    public datePipe: DatePipe,
    public toast: ToastrService){

  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(
      data => {
        this.employeeService.employeesList = data;
      }
    );
  }

  populateEmployee(selectedEmployee: Employee){
    let dateFormat = this.datePipe.transform(selectedEmployee.doj, 'yyyy-MM-dd');
    selectedEmployee.doj = dateFormat;
    this.employeeService.employeeData = selectedEmployee;
    if(this.emp.isSlide === 'off'){
      this.emp.hideShowSlide();
    }
  }

  deleteEmployee(id:number){
    if(confirm("Are are really want to delete this record?"))
    {
      this.employeeService.deleteEmployee(id).subscribe(data=>{
        this.toast.error('Success','Record deleted');
        this.employeeService.getEmployees().subscribe(data=>{
          this.employeeService.employeesList = data;
        });
      },
      err=>{
        console.log("record not deleted...");
      });
    }
  }

}
