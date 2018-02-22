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
  HasOne,
} from "sequelize-typescript";

import { Cidade } from "./Cidade";
import { Estado } from "./Estado";
import { Pessoa } from "./Pessoa";
import { Etapa } from "./Etapa";

@Table({
  timestamps: true,
})
export class Endereco extends Model<Endereco> {

  @PrimaryKey
  @Column
  public id: string;

  @ForeignKey(() => Cidade)
  @Column
  public CidadeId: string;

  @ForeignKey(() => Estado)
  @Column
  public EstadoId: string;

  @AllowNull(false)
  @Column(DataType.STRING) public logradouro: string;

  @Column(DataType.STRING) public numero: string;

  @Column(DataType.STRING) public complemento: string;

  @Column(DataType.STRING) public bairro: string;

  @Column(DataType.STRING) public latitude: string;

  @Column(DataType.STRING) public longitude: string;

  @Column(DataType.STRING) public cep: string;

  //#region Relacionamentos

  @HasOne(() => Pessoa, { onDelete: "CASCADE" })
  public pessoa: Pessoa;

  @HasOne(() => Etapa)
  public etapa: Etapa;

  @BelongsTo(() => Cidade)
  public cidade: Cidade;

  @BelongsTo(() => Estado)
  public estado: Estado;

  //#endregion

}
