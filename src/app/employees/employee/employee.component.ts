import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService,
    private toastr : ToastrService) { }
    showSuccess() {
      this.toastr.success('Hello world!', 'Toastr fun!');
    }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form!=null)
    form.resetForm();
    this.service.formData = {
      ID : null,
      Fullname : '',
      Code : '',
      Mobile_No : '',
      Position : '',
    }
  }

  onSubmit(form : NgForm){
    if(form.value.ID == null)
     this.insertRecord(form);
    else
      this.updateRecord(form);
  }
  insertRecord(form : NgForm){
    this.service.postEmployee(form.value).subscribe(res =>{
    this.toastr.success('Registered Successfully','EMP. register', {progressBar: true});
    this.resetForm(form);
    this.service.refreshList();
    });
  }
  updateRecord(form : NgForm){
    this.service.putEmployee(form.value).subscribe(res =>{
      this.toastr.success('Updated Successfully','EMP. update');
      this.resetForm(form);
      this.service.refreshList();
      });


  }
  deleteForm(id : number){
    if(confirm('Are you sure you want to delete? '+ id))
      this.service.deleteEmployee(id).subscribe(res =>{
        this.service.refreshList();
        this.toastr.info('Deleted Successfully','EMP. delete');
            });
  }


  
}
