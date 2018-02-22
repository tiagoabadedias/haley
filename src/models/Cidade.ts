
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Length,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { Estado } from "./Estado";
import { Endereco } from "./Endereco";

@Table({
  timestamps: true,
})
export class Cidade extends Model<Cidade> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @ForeignKey(() => Estado)
  @Column
  public EstadoId: string;

  @AllowNull(false)
  @Column(DataType.STRING) public nome: string;

  //#region Relacionamentos

  @HasMany(() => Endereco)
  public endereco: Endereco;

  @BelongsTo(() => Estado)
  public estado: Estado;

  //#endregion

}
