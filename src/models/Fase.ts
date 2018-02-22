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
import { Bateria } from "./Bateria";
import { EtapaCategoria } from "./EtapaCategoria";

@Table({
  timestamps: true,
})
export class Fase extends Model<Fase> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @ForeignKey(() => EtapaCategoria)
  @Column
  public EtapaCategoriaId: string;

  @Column(DataType.STRING) public nome: string;

  @BelongsTo(() => EtapaCategoria)
  public etapaCategoria: EtapaCategoria;

  @HasMany(() => Bateria, { onDelete: "CASCADE" })
  public bateria: Bateria[];

}
