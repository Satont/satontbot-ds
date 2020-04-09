import { Table, Column, Model, Unique, PrimaryKey, AllowNull, DataType, Default } from 'sequelize-typescript'
 
@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @AllowNull(false)
  @PrimaryKey
  @Column
  public id: number;
 
  @AllowNull(false)
  @Column(DataType.BIGINT)
  public userId: number

  @AllowNull(false)
  @Column(DataType.BIGINT)
  public guildId: number

  @Column(DataType.TEXT)
  public username: string

  @Default(0)
  @Column(DataType.INTEGER)
  public time: boolean

  @Default(0)
  @Column(DataType.INTEGER)
  public messages: boolean

  @Default(0)
  @Column(DataType.INTEGER)
  public expirience: boolean

  @Default(0)
  @Column(DataType.TIME)
  public expirienceTimestamp: Date | number
}