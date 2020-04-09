import { Table, Column, Model, Unique, PrimaryKey, AllowNull, DataType } from 'sequelize-typescript'
 
@Table({
  tableName: 'spam_warnings',
})
export class SpamWarning extends Model<SpamWarning> {
  @AllowNull(false)
  @Unique
  @PrimaryKey
  @Column
  public id: number;
 
  @AllowNull(false)
  @Column(DataType.BIGINT)
  public userId: number

  @AllowNull(false)
  @Column(DataType.BIGINT)
  public guildId: number
}