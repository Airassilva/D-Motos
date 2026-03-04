import { routes } from './../../app.routes';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { Router } from '@angular/router';

interface Usuario{
  email: String;
  senha: String
}

@Component({
  selector: 'app-auth',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth implements OnInit{
  form!: FormGroup
   erroLogin: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm():void{
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  getUsuarios(): Usuario[]{
    const dados = localStorage.getItem('usuarios');
    return dados? JSON.parse(dados) : []
  }

salvarUsuarios(Lista: Usuario[]):void{
  localStorage.setItem('usuarios', JSON.stringify(Lista))
}

onSubmit():void{
 if (this.form.invalid) {
    console.log('Form inválido', this.form.errors);
    return;
  }

  const { email, senha } = this.form.value;
  const usuarios = this.getUsuarios();

  const usuarioEncontrado = usuarios.find(
    u => u.email === email && u.senha === senha
  );

  if (usuarioEncontrado) {
    console.log('Login bem-sucedido!');
    localStorage.setItem('logado', JSON.stringify(usuarioEncontrado));
    this.router.navigate(['/home']);
  } else {
    this.erroLogin = 'Email ou senha inválidos.';
  }
}
}
