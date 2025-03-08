import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Employee {
  id: string;
  name: string;
  surname: string;
  phone: string;
  schedule: { [key: string]: string };
  isEditing?: boolean;
}

@Component({
  selector: 'app-admin-control',
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class AdminControlComponent {
  employees: Employee[] = [];
  showPart1: boolean = false;
  daysOfWeek: string[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  shifts: string[] = ["Barista 1", "Barista 2", "Barista 3","Barista 4", "Caja 1", "Caja 2"];

  newEmployee: Employee = { id: '', name: '', surname: '', phone: '', schedule: {}, isEditing: false };

  addEmployee(): void {
    if (this.newEmployee.id && this.newEmployee.name.trim() && this.newEmployee.surname.trim() && this.newEmployee.phone.trim()) {
      this.employees.push({ ...this.newEmployee });
      this.newEmployee = { id: '', name: '', surname: '', phone: '', schedule: {}, isEditing: false };
    }
  }

  editEmployee(employee: Employee): void {
    employee.isEditing = true;
  }
  
  saveEmployee(employee: Employee): void {
    // Aquí podrías realizar validaciones antes de guardar
    employee.isEditing = false;
  }
  
  cancelEdit(employee: Employee): void {
    // Restaurar los valores originales del empleado
    const originalEmployee = this.employees.find(emp => emp.id === employee.id);
    if (originalEmployee) {
      employee.name = originalEmployee.name;
      employee.surname = originalEmployee.surname;
      employee.phone = originalEmployee.phone;
      employee.id = originalEmployee.id;  // Restaurar el número de empleado
    }
    employee.isEditing = false;
  }
  

  deleteEmployee(id: string): void {
    this.employees = this.employees.filter(emp => emp.id !== id);
  }

  togglePart(): void {
    this.showPart1 = !this.showPart1;
  }
}
