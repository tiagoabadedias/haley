import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Length,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  timestamps: true,
})
export class Imagem extends Model<Imagem> {

  @PrimaryKey
  @Column
  public id: string;

  @AllowNull(false)
  @Column(DataType.STRING) public nome: string;

  @AllowNull(false)
  @Column(DataType.BLOB("long"))
  get imagem(): string {
    return this.getDataValue("imagem").toString("utf-8");
  }

  @AllowNull(false)
  @Column(DataType.BLOB("long"))
  get thumbnail(): string {
    return this.getDataValue("thumbnail").toString("utf-8");
  }

  //#region Relacionamentos

  //#endregion

}
