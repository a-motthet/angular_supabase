import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-update.component.html',
})
export class EmployeeUpdateComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);

  employeeId!: number;
  employee: Employee = {
    id: 0,
    first_name: '',
    last_name: '',
    phone: '',
    position: '',
    department: '',
    salary: 0,
  };

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEmployee();
  }

  async loadEmployee() {
    try {
      const data = await this.employeeService.getEmployeeById(this.employeeId);
      this.employee = data!;
    } catch (err) {
      console.error('Error loading employee', err);
    }
  }

  cancelEdit() {
    this.router.navigate(['/']);
  }

  async onSubmit() {
    try {
      await this.employeeService.updateEmployee(this.employeeId, this.employee);
      alert('Employee updated successfully!');
      this.router.navigate(['/']); // หรือกลับไปหน้า employee list
    } catch (err) {
      console.error('Error updating employee', err);
      alert('Failed to update employee.');
    }
  }
}
