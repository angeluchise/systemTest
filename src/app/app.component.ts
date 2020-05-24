import { Component } from '@angular/core';
import { AppService } from './service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./style/app.component.scss']
})
export class AppComponent {
  data: any;
  branch_offices: any;
  dataFilter: any;
  mes: any;
  year: any;
  sucursal: any;
  constructor(public appService: AppService) {
    this.appService.get().subscribe((data) => {
      this.data = data;
      this.branch_offices = data;
    });
  }
 filter(sucursal, anio, mes) {
  this.dataFilter = this.data.filter((data) => {
    if (sucursal && !anio && !mes) {
      return data.sucursal === sucursal;
    } else if (sucursal && anio && !mes) {
      return data.sucursal === sucursal && data.anio === Number(anio);
    } else if (sucursal && anio && mes) {
      return data.sucursal === sucursal && data.anio === Number(anio) && data.mes === Number(mes);
    }
  });
 }
}
