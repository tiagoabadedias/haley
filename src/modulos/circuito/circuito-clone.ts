export class CircuitoClone {
  private nome: string;

  constructor( circuito: any ) {
    let circuitoPlan;
    try {
      circuitoPlan = circuito.get({ plain: true });
    } catch (err) {
      circuitoPlan = circuito;
    }

    this.nome = circuito.nome;
  }
}
