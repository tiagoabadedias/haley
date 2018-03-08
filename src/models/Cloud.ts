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
export class Cloud extends Model<Cloud> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @ForeignKey(() => Pessoa)
  @Column
  public PessoaId: string;

  //#region Relacionamentos

  @BelongsTo(() => Pessoa)
  public pessoa: Pessoa;

  //#endregion
}
