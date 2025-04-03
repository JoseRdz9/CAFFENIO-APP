import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EmpleadosService, Empleado } from '../common/services/empleados.service';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar la interfaz correcta
import { Timestamp } from 'firebase/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';


export interface Employee {
  id: string;
  noempleado: number;
  name: string;
  surname: string;
  phone: string;
  email?: string;  // Agregar email opcional
  password?: string; // Agregar password opcional
  schedule: { [key: string]: string };
  isEditing?: boolean;
}

@Component({
  selector: 'app-admin-control',
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class AdminControlComponent implements OnInit {
  employees: Employee[] = [];
  showPart1: boolean = false;
  daysOfWeek: string[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  shifts: string[] = ["Barista 1", "Barista 2", "Barista 3", "Barista 4", "Caja 1", "Caja 2"];

  newEmployee: Employee = {
    id: '',
    noempleado: 0,
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    schedule: {},
    isEditing: false
  };

  constructor(private empleadosService: EmpleadosService, private auth: Auth) {}

  ngOnInit() {
    this.empleadosService.obtenerEmpleados().subscribe((empleados: Empleado[]) => {
      this.employees = empleados.map(emp => ({
        id: emp.id, // Usar el id de Firestore
        noempleado: emp.noempleado,
        name: emp.nombre,
        surname: emp.apellido,
        phone: emp.telefono,
        email: emp.email,  // Evitar undefined
        schedule: {}
      }));
    });
  }

  addEmployee(): void {
    if (this.newEmployee.name.trim() && this.newEmployee.surname.trim() && this.newEmployee.phone.trim()) {
      const email = `${this.newEmployee.name.toLowerCase()}.${this.newEmployee.surname.toLowerCase()}@empresa.com`; 
      const password = 'Contraseña123'; 
  
      createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          
          const empleado: Empleado = {
            id: user.uid,
            nombre: this.newEmployee.name,
            apellido: this.newEmployee.surname,
            noempleado: this.employees.length + 1,
            telefono: this.newEmployee.phone,
            email: email,
            fechanacimiento: Timestamp.fromDate(new Date())
          };
  
          return this.empleadosService.agregarEmpleado(empleado);
        })
        .then(() => {
          this.newEmployee = {
            id: '',
            noempleado: 0,
            name: '',
            surname: '',
            phone: '',
            email: '',
            password: '',
            schedule: {},
            isEditing: false
          };
        })
        .catch((error) => {
          console.error("Error al registrar empleado:", error);
        });
    }
  }

  editEmployee(employee: Employee): void {
    employee.isEditing = true;
  }

  saveEmployee(employee: Employee): void {
    if (employee.id) {
      const updatedEmployee: Empleado = {
        id: employee.id,
        nombre: employee.name,
        apellido: employee.surname,
        noempleado: employee.noempleado,
        telefono: employee.phone,
        email: employee.email || '',
        fechanacimiento: Timestamp.fromDate(new Date())
      };
  
      this.empleadosService.actualizarEmpleado(employee.id, updatedEmployee)
        .then(() => {
          const employeeIndex = this.employees.findIndex(emp => emp.id === employee.id);
          if (employeeIndex !== -1) {
            this.employees[employeeIndex] = { ...employee, isEditing: false };
          }
        })
        .catch(error => {
          console.error("Error al guardar los cambios del empleado:", error);
        });
    } else {
      console.error("Empleado no tiene un ID válido para actualizar.");
    }
  }

  cancelEdit(employee: Employee): void {
    const originalEmployee = this.employees.find(emp => emp.id === employee.id);
    if (originalEmployee) {
      employee.name = originalEmployee.name;
      employee.surname = originalEmployee.surname;
      employee.phone = originalEmployee.phone;
      employee.email = originalEmployee.email;
    }
    employee.isEditing = false;
  }

  deleteEmployee(id: string): void {
    if (!id) {
      console.error("Error: El ID del empleado es inválido.");
      return;
    }
  
    this.empleadosService.eliminarEmpleado(id)
      .then(() => {
        this.employees = this.employees.filter(emp => emp.id !== id);
      })
      .catch(error => {
        console.error("Error al eliminar el empleado:", error);
      });
  }
  
  togglePart(): void {
    this.showPart1 = !this.showPart1;
  }
}
