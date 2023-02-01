import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(private navCtrl: NavController
    , formBuilder: FormBuilder
    ,private alertController: AlertController
    ,private authenticate: AuthenticateService) {

    this.registerForm = formBuilder.group({
      name: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9 ]{50}$")]))
      , last_name: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9 ]{50}$")]))
      , document_number: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[0-9]{15}$")]))
      , email: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]))
      , password: new FormControl("", Validators.compose([Validators.required, Validators.minLength(8)]))
      , document_type: new FormControl()
      , career: new FormControl()
      
    });
  }

  ngOnInit() {
    console.log('register into module');
  }

  goToLogin() {
    this.navCtrl.navigateBack("/login");
  }


  registerUser(data: any){
    console.log(data)
    this.authenticate.registerUser(data).then( res => {
      this.navCtrl.navigateForward("/login");
    }).catch(err => {
      this.presentAlert("Opps", "Hubo un error", err);
    })
  }

  async presentAlert(header: any, subHeader: any, message: any) {
    const alert = await this.alertController.create(
      {
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: ['Ok']
      }
    );
    await alert.present();
  }
  
  ListDocumentType = [
    { display : "Tarjeta Identidad", type: "ti" },
    { display : "Cédula de Ciudadania", type: "cc" },
    { display : "Registro Civil", type: "rc" },
    { display : "Numero de Pasaporte", type: "ps" },
    { display : "Documentacion Extranjera", type: "ce" }
  ]

  ListCareer = [
    { display : "Ingeniería Sistemas", type: "sistemas" },
    { display : "Contaduria", type:"contaduria" },
    { display : "Inginieria industrial", type:"industrial"},
    { display : "Administracion", type:"administracion" }
  ]
}
