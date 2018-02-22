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
import { Onda } from "./Onda";
import { HasOne } from "sequelize-typescript/lib/annotations/association/HasOne";

@Table({
  timestamps: true,
})
export class OndaNota extends Model<OndaNota> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @ForeignKey(() => Onda)
  @Column
  public OndaId: string;

  @AllowNull(false)
  @ForeignKey(() => Juiz)
  @Column
  public JuizId: string;

  @AllowNull(false)
  @Column(DataType.STRING) public nota: string;

  @BelongsTo(() => Onda)
  public onda: Onda;

  @BelongsTo(() => Juiz)
  public juiz: Juiz;

}
