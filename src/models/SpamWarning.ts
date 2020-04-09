import { Table, Column, Model, Unique, PrimaryKey, AllowNull, DataType, AutoIncrement } from 'sequelize-typescript'
 
@Table({
  tableName: 'spam_warnings',
})
export class SpamWarning extends Model<SpamWarning> {
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