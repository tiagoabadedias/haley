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
  HasOne,
} from "sequelize-typescript";
import { HasMany } from "sequelize-typescript/lib/annotations/association/HasMany";
import { Usuario } from "./Usuario";
import { Circuito } from "./Circuito";
import { Bateria } from "./Bateria";

@Table({
  timestamps: true,
})
export class ConfiguracaoFase extends Model<ConfiguracaoFase> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @Column(DataType.STRING) public numeroAtletas: string;

  @AllowNull(false)
  @Column(DataType.STRING) public descricao: string;


}
