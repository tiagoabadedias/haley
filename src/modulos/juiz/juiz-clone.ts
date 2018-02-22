export class JuizClone {
    private nome: string;
  
    constructor( juiz: any ) {
      let juizPlan;
      try {
        juizPlan = juiz.get({ plain: true });
      } catch (err) {
        juizPlan = juiz;
      }
  
      this.nome = juizPlan.pessoa.nome;
    }
  }
  