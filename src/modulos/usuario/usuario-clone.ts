import { IUsuario } from "./usuario-interface";

export class UsuarioClone {

  private nome: string = "";
  private usuario: string;
  private perfil: string;

  // tslint:disable-next-line:no-empty
  constructor(usuario: any) {
    let usuarioPlan;
    try {
      usuarioPlan = usuario.get({ plain: true });
    } catch (err) {
      usuarioPlan = usuario;
    }
    this.nome = usuarioPlan.pessoa.nome;
    this.usuario = usuarioPlan.usuario;
  }
}
