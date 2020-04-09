import { Table, Column, Model, Unique, PrimaryKey, AllowNull, DataType, AutoIncrement } from 'sequelize-typescript'
 
@Table({
  tableName: 'links_warnings',
})
export class LinkWarning extends Model<LinkWarning> {
  @AutoIncrement
  @Column
  public id: number;
 
  @AllowNull(false)
  @Column(DataType.BIGINT)
  public userId: number

  @AllowNull(false)
  @Column(DataType.BIGINT)
  public guildId: number
}