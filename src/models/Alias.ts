import { Table, Column, Model,  PrimaryKey, AllowNull, DataType, AutoIncrement, Unique } from 'sequelize-typescript'
 
@Table({
  tableName: 'aliases',
  timestamps: false,
})
export class Alias extends Model<Alias> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;
 
  @AllowNull(false)
  @Column(DataType.TEXT)
  public command: number

  @Unique
  @AllowNull(false)
  @Column(DataType.TEXT)
  public name: number
}