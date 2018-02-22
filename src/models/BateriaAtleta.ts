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
  HasMany,
  Table,
} from "sequelize-typescript";

import { Usuario } from "./Usuario";
import { Entidade } from "./Entidade";
import { Fase } from "./Fase";
import { Configuracao } from "./Configuracao";
import { Atleta } from "./Atleta";
import { Bateria } from "./Bateria";
import { Onda } from "./Onda";

@Table({
  timestamps: true,
})
export class BateriaAtleta extends Model<BateriaAtleta> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @ForeignKey(() => Atleta)
  @Column
  public AtletaId: string;

  @AllowNull(false)
  @ForeignKey(() => Bateria)
  @Column
  public BateriaId: string;

  @BelongsTo(() => Bateria)
  public bateria: Bateria;

  @BelongsTo(() => Atleta)
  public atleta: Atleta;

  @HasMany(() => Onda)
  public onda: Onda[];

}
