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
export class Configuracao extends Model<Configuracao> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @Column(DataType.STRING) public numeroOndasValidas: string;

  @AllowNull(false)
  @Column(DataType.STRING) public numeroJuizes: string;

  @AllowNull(false)
  @Column(DataType.STRING) public numeroEtapasValidasRanking: string;

  @AllowNull(false)
  @Column(DataType.STRING) public tempoBateria: string;

  @HasOne(() => Circuito, { onDelete: "CASCADE" })
  public circuito: Circuito;

  @HasOne(() => Bateria, { onDelete: "CASCADE" })
  public bateria: Bateria;

}
