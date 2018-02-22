import { Usuario } from "./Usuario";

import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  HasOne,
  Length,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  timestamps: true,
})
export class Perfil extends Model<Perfil> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @Column(DataType.STRING) public nome: string;

  //#region Relacionamentos

  @HasOne(() => Usuario)
  public usuario: Usuario;

  //#endregion
}
