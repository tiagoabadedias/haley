import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Length,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  timestamps: true,
})
export class Modulo extends Model<Modulo> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @Column
  public nome: string;

  //#region Relacionamentos

  //#endregion
}
