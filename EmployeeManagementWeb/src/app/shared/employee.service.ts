import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee} from './employee.model';
import { Designation } from './employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private myhttp:HttpClient) { }

  employeeUrl:string = 'https://localhost:7093/api/Employee';
  designationUrl:string = 'https://localhost:7093/api/Designation';

  //for domain's list
  employeesList:Employee[] = [];
  designationList:Designation[] = [];

  //for domain's data
  employeeData:Employee = new Employee();

  //methods
  saveEmployee(){
    return this.myhttp.post(this.employeeUrl,this.employeeData);
  }

  updateEmployee(){
    return this.myhttp.put(`${this.employeeUrl}/${this.employeeData.id}`,this.employeeData);
  }

  getEmployees():Observable<Employee[]>{
    return this.myhttp.get<Employee[]>(this.employeeUrl);
  }

  getDesignations():Observable<Designation[]>{
    return this.myhttp.get<Designation[]>(this.designationUrl);
  }

  deleteEmployee(id:number){
    return this.myhttp.delete(`${this.employeeUrl}/${id}`);
  }
}
