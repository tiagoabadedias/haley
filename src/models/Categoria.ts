
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Length,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  timestamps: true,
})
export class Categoria extends Model<Categoria> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @Column(DataType.STRING) public nome: string;

  @Column(DataType.STRING) public descricao: string;

}
