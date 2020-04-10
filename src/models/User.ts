import { Table, Column, Model, PrimaryKey, AllowNull, DataType, Default, AutoIncrement } from 'sequelize-typescript'
 
@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model<User> {
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

  @Column(DataType.TEXT)
  public username: string

  @Default(0)
  @Column(DataType.INTEGER)
  public time: number

  @Default(0)
  @Column(DataType.INTEGER)
  public messages: boolean

  @Default(0)
  @Column(DataType.INTEGER)
  public expirience: boolean

  @Column
  public expirienceTimestamp: number
}