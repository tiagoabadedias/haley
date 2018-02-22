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

import { Pessoa } from "./Pessoa";

@Table({
  timestamps: true,
})
export class Juiz extends Model<Juiz> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @Column(DataType.STRING) public tipoJuiz: string;

  @ForeignKey(() => Pessoa)
  @Column
  public PessoaId: string;

  //#region Relacionamentos

  @BelongsTo(() => Pessoa)
  public pessoa: Pessoa;

  //#endregion
}
