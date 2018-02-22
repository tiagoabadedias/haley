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
import { EtapaJuiz } from "./EtapaJuiz";
import { Etapa } from "./Etapa";

@Table({
  timestamps: true,
})
export class EtapaParticipante extends Model<EtapaParticipante> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @ForeignKey(() => Etapa)
  @Column
  public EtapaId: string;

  @AllowNull(false)
  @ForeignKey(() => Usuario)
  @Column
  public UsuarioId: string;

  @Column(DataType.STRING) public funcao: string;

  @BelongsTo(() => Usuario)
  public usuario: Usuario;

  @BelongsTo(() => Etapa)
  public etapa: Etapa;

}
