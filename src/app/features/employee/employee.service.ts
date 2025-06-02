import { Injectable } from '@angular/core';
import { supabase } from '../../shared/components/supabase.client'; // ต้องสร้างไฟล์นี้แยกไว้
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private table = 'employees';

  async getAllEmployees(): Promise<Employee[]> {
    const { data, error } = await supabase.from(this.table).select('*');
    if (error) throw error;
    return data as Employee[];
  }

  async addEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    const { data, error } = await supabase
      .from(this.table)
      .insert([employee])
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data as Employee;
  }

  async getEmployeeById(id: number): Promise<Employee | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async updateEmployee(
    id: number,
    employee: Partial<Employee>
  ): Promise<Employee> {
    const { data, error } = await supabase
      .from(this.table)
      .update(employee)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Employee;
  }

  async deleteEmployee(id: number): Promise<void> {
    const { error } = await supabase.from(this.table).delete().eq('id', id);
    if (error) throw error;
  }
}
