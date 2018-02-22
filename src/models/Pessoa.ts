import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Length,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { Atleta } from "./Atleta";
import { Juiz } from "./Juiz";
import { Endereco } from "./Endereco";
import { Usuario } from "./Usuario";
import { Estado } from "./Estado";
import { Entidade } from "./Entidade";

@Table({
  timestamps: true,
})
export class Pessoa extends Model<Pessoa> {
  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @Column(DataType.STRING) public nome: string;

  @Column(DataType.STRING) public email: string;

  @Column(DataType.STRING) public telefone: string;

  @Column(DataType.STRING) public dataNascimento: string;

  @ForeignKey(() => Endereco)
  @Column
  public EnderecoId: string;

  //#region Relacionamentos

  @HasOne(() => Atleta, { onDelete: "CASCADE" })
  public atleta: Atleta;

  @HasOne(() => Juiz, { onDelete: "CASCADE" })
  public juiz: Juiz;

  @HasOne(() => Usuario)
  public usuario: Usuario;

  @BelongsTo(() => Endereco, { onDelete: "CASCADE" })
  public endereco: Endereco;

  //#endregion

}
