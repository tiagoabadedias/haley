export class AtletaClone {
  private nome: string;

  constructor( atleta: any ) {
    let atletaPlan;
    try {
      atletaPlan = atleta.get({ plain: true });
    } catch (err) {
      atletaPlan = atleta;
    }

    this.nome = atletaPlan.pessoa.nome;
  }
}
