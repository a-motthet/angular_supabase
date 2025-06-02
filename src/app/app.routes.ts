import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/components/layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
      },

      {
        path: 'employee',
        loadComponent: () =>
          import('./features/employee/employee/employee.component').then(
            (m) => m.EmployeeComponent
          ),
      },
      {
        path: 'employee/add',
        loadComponent: () =>
          import(
            './features/employee/employee-from/employee-from.component'
          ).then((m) => m.EmployeeFormComponent),
      },
      {
        path: 'employee/edit/:id',
        loadComponent: () =>
          import(
            './features/employee/employee-update/employee-update.component'
          ).then((m) => m.EmployeeUpdateComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
