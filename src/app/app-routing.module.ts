import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/guard/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'teachers', pathMatch: 'full'},
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'forgot', loadChildren: './public/forgot/forgot.module#ForgotPageModule' },

  { path: 'teachers',
    loadChildren: './teachers/teachers.module#TeachersPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'teacher-detail', 
    loadChildren: './teacher-detail/teacher-detail.module#TeacherDetailPageModule',
    canActivate: [AuthGuardService]
  },
  { path: 'teacher-add',
    loadChildren: './teacher-add/teacher-add.module#TeacherAddPageModule',
    canActivate: [AuthGuardService]
  },
  { path: 'settings',
    loadChildren: './settings/settings.module#SettingsPageModule',
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
