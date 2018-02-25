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
import { BateriaAtleta } from "./BateriaAtleta";
import { Juiz } from "./Juiz";
import { OndaNota } from "./OndaNota";
import { HasOne } from "sequelize-typescript/lib/annotations/association/HasOne";

@Table({
  timestamps: true,
})
export class Onda extends Model<Onda> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @ForeignKey(() => BateriaAtleta)
  @Column
  public BateriaAtletaId: string;

  @AllowNull(false)
  @Column(DataType.STRING) public numero: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN) public video: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN) public caminhoVideo: string;

  @BelongsTo(() => BateriaAtleta)
  public bateriaAtleta: BateriaAtleta;

  @HasMany(() => OndaNota)
  public ondaNota: OndaNota[];

}
