import { Table, Column, Model, Unique, PrimaryKey, AllowNull, DataType, Default, AutoIncrement } from 'sequelize-typescript'
 
@Table({
  tableName: 'guilds',
})
export class Guild extends Model<Guild> {
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public name: string

  @AllowNull(false)
  @Column(DataType.BIGINT)
  public guildId: number

  @Default('!')
  @AllowNull(false)
  @Column(DataType.STRING)
  public prefix: string
}
