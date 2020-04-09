import { Table, Column, Model, PrimaryKey, AllowNull, DataType, AutoIncrement } from 'sequelize-typescript'
 
@Table({
  tableName: 'links_warnings',
})
export class LinkWarning extends Model<LinkWarning> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;
 
  @AllowNull(false)
  @Column(DataType.TEXT)
  public userId: number

  @AllowNull(false)
  @Column(DataType.TEXT)
  public guildId: number
}