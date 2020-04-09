import { Table, Column, Model, Unique, PrimaryKey, AllowNull, DataType, Default } from 'sequelize-typescript'
 
@Table({
  tableName: 'guilds',
})
export class Guild extends Model<Guild> {
  @AllowNull(false)
  @Unique
  @PrimaryKey
  @Column
  public id: number;
 
  @AllowNull(false)
  @Column(DataType.BIGINT)
  public guildId: number

  @Default('!')
  @AllowNull(false)
  @Column(DataType.STRING)
  public preifx: string
}