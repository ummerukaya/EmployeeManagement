import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../../shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit{

    @ViewChild('checkbox1') checkbox: ElementRef;
    isSlide: string = 'off';
    constructor(public employeeService: EmployeeService,
      public toast: ToastrService){

    }

    ngOnInit(): void {
      this.employeeService.getDesignations().subscribe(data=>{
        this.employeeService.designationList = data;
      });
    }

    submit(employeeForm:NgForm){
        this.employeeService.employeeData.isMarried = employeeForm.value.isMarried == true ? 1 : 0;
        this.employeeService.employeeData.isActive = employeeForm.value.isActive == true ? 1 : 0;

        if(this.employeeService.employeeData.id == 0){
          this.insertEmployee(employeeForm);
        }
        else{
          this.updateEmployee(employeeForm);
        }
    }

    insertEmployee(employeeForm:NgForm){
      this.employeeService.saveEmployee().subscribe(d=>{
        this.resetForm(employeeForm);
        this.refreshData();
        this.toast.success('Success','Record saved');
      });
    }

    updateEmployee(employeeForm:NgForm){
      this.employeeService.updateEmployee().subscribe(d=>{
          this.resetForm(employeeForm);
          this.refreshData();
          this.toast.warning('Success','Record updated');
      });
    }

    resetForm(employeeForm:NgForm){
      employeeForm.form.reset(employeeForm.value);
      this.employeeService.employeeData = new Employee();
      this.hideShowSlide();
    }

    refreshData(){
      this.employeeService.getEmployees().subscribe(data=>{
        this.employeeService.employeesList = data;
      });
    }

    hideShowSlide(){
      if(this.checkbox.nativeElement.checked){
        this.checkbox.nativeElement.checked = false;
        this.isSlide = 'off';
      }
      else{
        this.checkbox.nativeElement.checked = true;
        this.isSlide = 'on';
      }
    }
}
