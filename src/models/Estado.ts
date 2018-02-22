
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

import { Cidade } from "./Cidade";

@Table({
  timestamps: true,
})
export class Estado extends Model<Estado> {

  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING) public sigla: string;

  @AllowNull(false)
  @Column(DataType.STRING) public nome: string;

}
