import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: EmployeeService,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.service.refreshList()
  }

  populateForm(emp : Employee){
    this.service.formData = emp;
  }
  deleteForm(id : number){
    if(confirm('Are you sure you want to delete? '+ id))
      this.service.deleteEmployee(id).subscribe(res =>{
        this.service.refreshList();
        this.toastr.info('Deleted Successfully','EMP delete');
            });
    }
  

}
