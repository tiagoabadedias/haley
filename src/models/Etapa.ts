import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Length,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { HasMany } from "sequelize-typescript/lib/annotations/association/HasMany";
import { Usuario } from "./Usuario";
import { Entidade } from "./Entidade";
import { Configuracao } from "./Configuracao";
import { Endereco } from "./Endereco";
import { Circuito } from "./Circuito";
import { EtapaJuiz } from "./EtapaJuiz";
import { EtapaParticipante } from "./EtapaParticipante";

@Table({
  timestamps: true,
})
export class Etapa extends Model<Etapa> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @Column(DataType.STRING) public nome: string;

  @AllowNull(false)
  @ForeignKey(() => Endereco)
  @Column
  public EnderecoId: string;

  @AllowNull(false)
  @ForeignKey(() => Circuito)
  @Column
  public CircuitoId: string;

  @AllowNull(false)
  @Column(DataType.DATE) public dataInicio: string;

  @AllowNull(false)
  @Column(DataType.DATE) public dataFim: string;

  @Column(DataType.BOOLEAN) public encerrada: string;

  @BelongsTo(() => Endereco,{ onDelete: "CASCADE" })
  public endereco: Endereco;

  @BelongsTo(() => Circuito)
  public circuito: Circuito;

  @HasMany(() => EtapaParticipante)
  public etapaParticipante: EtapaParticipante[];

}
