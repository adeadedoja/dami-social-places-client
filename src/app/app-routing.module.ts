import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactCreateComponent } from './contact-create/contact-create.component';

const routes: Routes = [
    { path: '', redirectTo: 'contact', pathMatch: 'full' },
    {
        path: 'contact',
        component: ContactCreateComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', enableTracing: true, useHash: true }),],
    exports: [RouterModule]
})
export class AppRoutingModule { }