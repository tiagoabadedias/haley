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
import { Entidade } from "./Entidade";
import { Configuracao } from "./Configuracao";
import { Endereco } from "./Endereco";
import { Circuito } from "./Circuito";
import { Etapa } from "./Etapa";
import { Categoria } from "./Categoria";
import { Fase } from "./Fase";

@Table({
  timestamps: true,
})
export class EtapaCategoria extends Model<EtapaCategoria> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @ForeignKey(() => Categoria)
  @Column
  public CategoriaId: string;

  @AllowNull(false)
  @ForeignKey(() => Etapa)
  @Column
  public EtapaId: string;

  @Column(DataType.STRING) public numeroRounds: string;

  @Column(DataType.STRING) public numeroBaterias: string;

  @Column(DataType.STRING) public numeroAtletas: string;

  @BelongsTo(() => Categoria)
  public categoria: Categoria;

  @BelongsTo(() => Etapa)
  public etapa: Etapa;

  @HasMany(() => Fase)
  public fase: Fase[];

}
