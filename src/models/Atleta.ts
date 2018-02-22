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
import { Associacao } from "./Associacao";

@Table({
  timestamps: true,
})
export class Atleta extends Model<Atleta> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @ForeignKey(() => Pessoa)
  @Column
  public PessoaId: string;

  @ForeignKey(() => Associacao)
  @Column
  public AssociacaoId: string;

  //#region Relacionamentos

  @BelongsTo(() => Pessoa)
  public pessoa: Pessoa;

  @BelongsTo(() => Associacao)
  public associacao: Associacao;

  //#endregion
}
