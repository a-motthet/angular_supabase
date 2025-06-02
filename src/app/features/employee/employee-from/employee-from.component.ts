import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-from.component.html',
  styleUrls: ['./employee-from.component.css'],
})
export class EmployeeFormComponent {
  employeeForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      job_position: ['', Validators.required],
      department: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.employeeForm.invalid) return;

    this.isSubmitting = true;

    try {
      await this.employeeService.addEmployee(this.employeeForm.value);
      alert('Employee added successfully!');
      this.router.navigate(['/employee']);
    } catch (err) {
      console.error('Error adding employee:', err);
      alert('Something went wrong while adding the employee.');
    } finally {
      this.isSubmitting = false;
    }
  }

  resetForm(): void {
    this.employeeForm.reset();
  }
}
