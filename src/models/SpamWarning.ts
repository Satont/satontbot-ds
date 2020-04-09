import { Table, Column, Model,  PrimaryKey, AllowNull, DataType, AutoIncrement } from 'sequelize-typescript'
 
@Table({
  tableName: 'spam_warnings',
  timestamps: false,
})
export class SpamWarning extends Model<SpamWarning> {
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