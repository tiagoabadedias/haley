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

@Table({
  timestamps: true,
})
export class Cloud extends Model<Cloud> {

  @PrimaryKey
  @Column
  public id: string;

}
