import { Component, OnInit, ViewChild, HostListener, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@auth/services/authentication.service';
import { DOCUMENT } from '@angular/common';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { forEach } from 'lodash';

export interface DialogData {
  DescFeature: string;
  UrlFeature: string;
  TitlFeature: string;
}

@Component({
  selector: 'kt-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public formContacto: FormGroup;
  error$ = new Subject<boolean>();
  send$ = new Subject<boolean>();
  loading$ = new Subject<boolean>();
  public send = false;
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  public testimonios = [];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
  listPlan: string;
  Urlgif: string;
  Titlef: string;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    @Inject(DOCUMENT) private document: Document
  ) { }
    
  ngOnInit(): void {

    let message = 'Visoor y su equipo de Soporte han sido clave para digitalizar mis servicios y administrar a varios usuarios con los que cuento. Siempre he tenido su apoyo.';
    let from = 'C.P. Higinio Pacheco';
    this.testimonios.push({ message, from });
    message = 'Con Visoor he optimizado mis procesos y mejorado mis tiempos. Me ha ayudado bastante.';
    from = 'Lic. Lorena Martinez';
    this.testimonios.push({ message, from });
    message = 'La atención y el servicio de la plataforma están muy bien por el acompañamiento de soporte que se tiene.';
    from = 'Auxiliar Administrativo Ma. Dolores R. ';
    this.testimonios.push({ message, from });
    message = 'La plataforma de Visoor es muy funcional, práctica y la atención del equipo  para la resolución de problemas es muy buena.';
    from = 'L.A.E. SUSANA MEJIA';
    this.testimonios.push({ message, from });

    this.formContacto = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      necesidad: ['', Validators.required],
      whatsapp: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let animado = document.querySelectorAll<HTMLElement>(".Kt-animationrightSm");
    var scrollTop = document.documentElement.scrollTop;
    for (var i = 0; i < animado.length; i++){
        var alturaAnimado = animado[i].offsetTop;
        if(alturaAnimado - 500 < scrollTop)
        {
          animado[i].classList.add("Kt-animationright");
        }
    }
    let animadoh1 = document.querySelectorAll<HTMLElement>(".animationH1SN");
    for (var i = 0; i < animadoh1.length; i++){
      var alturaAnimado1 = animadoh1[i].offsetTop;
      if(alturaAnimado1 - 600 < scrollTop)
      {
        animadoh1[i].classList.add("animationH1");
      }
    }
  }

  scroll(element: HTMLElement, id: string) {
    element.scrollIntoView();
  }

  register() {
    window.location.href = 'https://app.visoor.mx/registrar?utm_source=google&utm_medium=landing-page&utm_campaign=freelancers';
  }

  CheckSelectAnual(select){
    let SelectAnual = document.querySelectorAll<HTMLElement>(".Anual");
    let SelectMes = document.querySelectorAll<HTMLElement>(".Mes");
    let DescAN = document.querySelectorAll<HTMLElement>(".marlefahoo");
    for (var i = 0; i < SelectAnual.length; i++){
      SelectAnual[i].classList.remove("hiddenpay");
      SelectAnual[i].classList.add("showpay");
    }
    for (var i = 0; i < SelectMes.length; i++){
      SelectMes[i].classList.remove("showpay");
      SelectMes[i].classList.add("hiddenpay");
    }
    for (var i = 0; i < DescAN.length; i++){
      DescAN[i].classList.remove("hiddenpay");
      DescAN[i].classList.add("showpay");
    }
  }
  CheckSelectMes(select){
    let SelectAnual = document.querySelectorAll<HTMLElement>(".Anual");
    let SelectMes = document.querySelectorAll<HTMLElement>(".Mes");
    let DescAN = document.querySelectorAll<HTMLElement>(".marlefahoo");
    for (var i = 0; i < SelectAnual.length; i++){
      SelectAnual[i].classList.remove("showpay");
      SelectAnual[i].classList.add("hiddenpay");
    }
    for (var i = 0; i < SelectMes.length; i++){
      SelectMes[i].classList.remove("hiddenpay");
      SelectMes[i].classList.add("showpay");
    }
    for (var i = 0; i < DescAN.length; i++){
      DescAN[i].classList.remove("showpay");
      DescAN[i].classList.add("hiddenpay");
    }
  }

  contact() {
    console.log(this.formContacto);
    this.formContacto.markAllAsTouched();
    if (this.formContacto.invalid) {
      this.error$.next(true);
      setTimeout(() => {
        this.error$.next(false);
      }, 10000);
    } else {
      this.loading$.next(true);
      const nombre = this.formContacto.get('nombre').value;
      const correo = this.formContacto.get('correo').value;
      const necesidad = this.formContacto.get('necesidad').value;
      const telefono = this.formContacto.get('whatsapp').value;

      this.authService.sendLandingInfo(nombre, correo, necesidad, telefono).pipe(first()).subscribe(() => {
        this.send = true;
        this.error$.next(false);
        this.send$.next(true);
        this.loading$.next(false);
        setTimeout(() => {
          this.send$.next(false);
        }, 10000);
      });
    }
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
  openDialog($type) {
    if ($type == "DB") {
      this.listPlan = "Un resumen de tu cuenta que te ayudará a revisar tu actividad reciente, analizar tus ingresos y egresos, tener una vista previa de listas negras, verificar el status de tus facturas, entre otras funciones. ";
      this.Urlgif = "../../../../assets/media/visoor/gif/Dashboard.gif";
      this.Titlef = "Dashboard";
    }
    if ($type == "MV") {
      this.listPlan = "Monitorea en tiempo real todos tus egresos e ingresos, tus facturas, recibos de pago, nóminas y borradores. ";
      this.Urlgif = "../../../../assets/media/visoor/gif/Movimientos.gif";
      this.Titlef = "Movimientos";
    }
    if ($type == "VS") {
      this.listPlan = "Conecta tu cuenta directamente con el SAT y descarga todas tus facturas con un solo clic.  ";
      this.Urlgif = "../../../../assets/media/visoor/gif/Visoorsat.gif";
      this.Titlef = "Visoor SAT";
    }
    if ($type == "FA") {
      this.listPlan = "Crea, personaliza y envía todas la facturas, recibos de nómina, pagos, créditos, y honorarios que necesites desde Visoor. ";
      this.Urlgif = "../../../../assets/media/visoor/gif/Facturacion.gif";
      this.Titlef = "Facturación";
    }
    if ($type == "LN") {
      this.listPlan = "Te alertamos sobre la situación fiscal de los RFC a los que les ha hecho o planeas realizarles una factura con el objetivo de que evites problemas ante el SAT. ";
      this.Urlgif = "../../../../assets/media/visoor/gif/Listasnegras.gif";
      this.Titlef = "Listas Negras";
    }
    if ($type == "NM") {
      this.listPlan = "Administra tu nómina fácilmente. Descarga nuestro template, transfiere tu información y súbela a la plataforma.";
      this.Urlgif = "../../../../assets/media/visoor/gif/Nomina.gif";
      this.Titlef = "Nomina";
    }
    if ($type == "MU") {
      this.listPlan = "Crea diferentes usuarios y asígnalos a tu equipo de trabajo en la plataforma. Tú decides qué permisos darles. Esto te permitirá llevar un mejor control en la asignación de tareas.";
      this.Urlgif = "../../../../assets/media/visoor/gif/Usuarios.gif";
      this.Titlef = "MultiUsuarios";
    }
    if ($type == "DT") {
      this.listPlan = "Genera desde Visoor tu Declaración bimestral Informativa de Operaciones con Terceros. ";
      this.Urlgif = "../../../../assets/media/visoor/gif/DIOT.gif";
      this.Titlef = "Diot";
    }
    if ($type == "BN") {
      this.listPlan = "Conecta, relaciona y concilia tus movimientos bancarios con tus facturas. El proceso es completamente seguro, ya que tus datos estarán cifrados en todo momento.  ";
      this.Urlgif = "../../../../assets/media/visoor/gif/Bancos.gif";
      this.Titlef = "Bancos";
    }
    if ($type == "DC") {
      this.listPlan = "Te permitirá tener a la mano documentación importante y actualizada como lo es 32D, CIF, declaraciones y estados de cuenta de tus bancos. ";
      this.Urlgif = "../../../../assets/media/visoor/gif/Documentos.gif";
      this.Titlef = "Documentos";
    }
    if ($type == "DA") {
      this.listPlan = "Descarga automáticamente tus facturas cada vez que lo desees. Tú decides con qué recurrencia programarlo. ";
      this.Urlgif = "../../../../assets/media/visoor/gif/Conexiones.gif";
      this.Titlef = "Descarga Automática";
    }
    if ($type == "RP") {
      this.listPlan = "Descarga un resumen de tus facturas timbradas, pagadas, cobradas,  canceladas y más. Tú decides los datos que necesites en cada reporte que generes. ";
      this.Urlgif = "../../../../assets/media/visoor/gif/Reportes.gif";
      this.Titlef = "Reportes Personalizados";
    }
    if ($type == "MR") {
      this.listPlan = "Registra los contribuyentes que desees en una sola cuenta. Configura los RFC’s que necesites a precios preferenciales de manera semestral y anual. ";
      this.Urlgif = "../../../../assets/media/visoor/gif/multirfc.gif";
      this.Titlef = "Multi-RFCs";
    }
    
    this.dialog.open(DialogElementsExampleDialog, {
      width: '1000px',
      height: '370px',
      data: {
        DescFeature: this.listPlan,
        UrlFeature: this.Urlgif,
        TitlFeature:this.Titlef,
      },
    });
  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-content-example-dialog.html',
})
export class DialogElementsExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}

