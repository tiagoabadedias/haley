import { Usuario } from "./../models/Usuario";

export class HelperUsuario {

  public exists = async (usuario: string) => {
    const usuarios = await Usuario.findAll({
      where: {
        usuario,
      },
    });

    return usuarios.length > 0;
  }

}
