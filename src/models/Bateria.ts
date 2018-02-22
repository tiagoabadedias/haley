import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Length,
  Model,
  HasMany,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Usuario } from "./Usuario";
import { BateriaAtleta } from "./BateriaAtleta";
import { Entidade } from "./Entidade";
import { Fase } from "./Fase";
import { Configuracao } from "./Configuracao";

@Table({
  timestamps: true,
})
export class Bateria extends Model<Bateria> {

  @PrimaryKey
  @Column
  public id: string;

  @ForeignKey(() => Configuracao)
  @Column
  public ConfiguracaoId: string;

  @ForeignKey(() => Fase)
  @Column
  public FaseId: string;

  @AllowNull(false)
  @Column(DataType.STRING) public nome: string;

  @BelongsTo(() => Configuracao)
  public configuracao: Configuracao;

  @BelongsTo(() => Fase)
  public fase: Fase;

  @HasMany(() => BateriaAtleta)
  public bateriaAtleta: BateriaAtleta[];

}
