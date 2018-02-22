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
import { HasMany } from "sequelize-typescript/lib/annotations/association/HasMany";
import { Usuario } from "./Usuario";
import { Atleta } from "./Atleta";

@Table({
  timestamps: true,
})
export class Associacao extends Model<Associacao> {

  @PrimaryKey
  @Column
  public id: string;

  @HasMany(() => Atleta)
  public atleta: Atleta;

}
