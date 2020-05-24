import { Component } from '@angular/core';
import { AppService } from './service/app.service';
import { MobileService } from './service/mobile.service';

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
  types: any;
  total: any;
  mobile: any;
  openfilter: boolean;
  menu: boolean;
  router: number;
  constructor(public appService: AppService, private mobileService: MobileService) {
    this.router = 2;
    this.mobile =  this.mobileService.currentWidth();
    this.mobileService.changeResize().subscribe((value: any) => {
      this.mobile = value;
    });
    this.appService.get().subscribe((data) => {
      this.data = data;
      this.dataFilter = data;
      this.branch_offices = [];
      this.types = [];
      this.dataFilter.map((element)=> {
        if (!(element.sucursal === this.branch_offices.find((offices) => offices === element.sucursal))) {
          this.branch_offices.push(element.sucursal);
        }
        const typeFind = this.types.find((offices) => offices.name === element.tipo);
        if ((typeFind) ? element.tipo !==  typeFind.name : true) {
          const dataType = this.dataFilter.filter((data) => {
            return data.tipo === element.tipo;
          });
          let fonasaTotal = 0;
          dataType.map((fonasa) => {
            if (fonasa.prevision === 'Fonasa') {
              fonasaTotal += fonasa.total;
            }
          });
          let isapreTotal = 0;
          dataType.map((isapre) => {
            if (isapre.prevision === 'Isapre') {
              isapreTotal += isapre.total;
            }
          });
          const data = {
            name: element.tipo,
            data: dataType,
            fonasaTotal,
            isapreTotal,
          };
          this.types.push(data);
        }
      });
      this.calcTotal();
    });
  }
  filter(sucursal, anio, mes) {
    (sucursal === 'todos') ? sucursal = null : sucursal;
    (anio === 'todos') ? anio = null : anio;
    (mes === 'todos') ? anio = null : mes;
    if (sucursal || anio || mes) {
      this.dataFilter = this.data.filter((data) => {
        if (sucursal && !anio && !mes) {
          return data.sucursal === sucursal;
        } else if (!sucursal && !anio && mes) {
          return data.mes === Number(mes);
        } else if (!sucursal && anio && !mes) {
          return data.anio === Number(anio);
        } else if (sucursal && anio && !mes) {
          return data.sucursal === sucursal && data.anio === Number(anio);
        } else if (sucursal && anio && mes) {
          return data.sucursal === sucursal && data.anio === Number(anio) && data.mes === Number(mes);
        }
      });
    } else {
      this.dataFilter = this.data;
    }
    this.types.map((element) => {
      const dataType = this.dataFilter.filter((data) => {
        return data.tipo === element.name;
      });
      let fonasaTotal = 0;
      dataType.map((fonasa) => {
        if (fonasa.prevision === 'Fonasa') {
          fonasaTotal += fonasa.total;
        }
      });
      let isapreTotal = 0;
      dataType.map((isapre) => {
        if (isapre.prevision === 'Isapre') {
          isapreTotal += isapre.total;
        }
      });
      element.data = dataType;
      element.fonasaTotal = fonasaTotal;
      element.isapreTotal = isapreTotal;
    });
    this.calcTotal();
  }
  calcTotal() {
    this.total = 0;
    this.types.map((element) => {
      this.total += element.fonasaTotal + element.isapreTotal;
    });
  }
}
