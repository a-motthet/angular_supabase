import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employee: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  async getAllEmployee(): Promise<void> {
    try {
      this.employee = await this.employeeService.getAllEmployees();
    } catch (err) {
      console.error('Error fetching Employees', err);
    }
  }

  async deleteEmployee(id: number): Promise<void> {
    const confirmDelete = confirm(
      'Are you sure you want to delete this employee?'
    );
    if (!confirmDelete) return;

    try {
      await this.employeeService.deleteEmployee(id);
      this.employee = this.employee.filter((e) => e.id !== id);
      alert('Employee deleted successfully.');
    } catch (err) {
      console.error('Error deleting employee', err);
      alert('Failed to delete employee.');
    }
  }
}
