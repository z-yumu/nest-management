import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

// 抽象类是提供可以由子类共享的一般形式，由子类根据自己的实际情况去处理这个一般形式。
export abstract class BaseEntity {
  @CreateDateColumn({ name: 'created_time' })
  @ApiProperty()
  createdTime: Date

  @UpdateDateColumn({ name: 'updated_time' })
  @ApiProperty()
  updatedTime: Date
}

/**
  type: ColumnType - 列类型。其中之一在上面.
  name: string - 数据库表中的列名。默认情况下，列名称是从属性的名称生成的。 你也可以通过指定自己的名称来更改它。
  length: number - 列类型的长度。 例如，如果要创建varchar（150）类型，请指定列类型和长度选项。
  width: number - 列类型的显示范围。 仅用于MySQL integer types(opens new window)
  onUpdate: string - ON UPDATE触发器。 仅用于 MySQL (opens new window).
  nullable: boolean - 在数据库中使列NULL或NOT NULL。 默认情况下，列是nullable：false。
  update: boolean - 指示"save"操作是否更新列值。如果为false，则只能在第一次插入对象时编写该值。 默认值为"true"。
  select: boolean - 定义在进行查询时是否默认隐藏此列。 设置为false时，列数据不会显示标准查询。 默认情况下，列是select：true
  default: string - 添加数据库级列的DEFAULT值。
  primary: boolean - 将列标记为主要列。 使用方式和@ PrimaryColumn相同。
  unique: boolean - 将列标记为唯一列（创建唯一约束）。
  comment: string - 数据库列备注，并非所有数据库类型都支持。
  precision: number - 十进制（精确数字）列的精度（仅适用于十进制列），这是为值存储的最大位数。仅用于某些列类型。
  scale: number - 十进制（精确数字）列的比例（仅适用于十进制列），表示小数点右侧的位数，且不得大于精度。 仅用于某些列类型。
  zerofill: boolean - 将ZEROFILL属性设置为数字列。 仅在 MySQL 中使用。 如果是true，MySQL 会自动将UNSIGNED属性添加到此列。
  unsigned: boolean - 将UNSIGNED属性设置为数字列。 仅在 MySQL 中使用。
  charset: string - 定义列字符集。 并非所有数据库类型都支持。
  collation: string - 定义列排序规则。
  enum: string[]|AnyEnum - 在enum列类型中使用，以指定允许的枚举值列表。 你也可以指定数组或指定枚举类。
  asExpression: string - 生成的列表达式。 仅在MySQL (opens new window)中使用。
  generatedType: "VIRTUAL"|"STORED" - 生成的列类型。 仅在MySQL (opens new window)中使用。
  hstoreType: "object"|"string" -返回HSTORE列类型。 以字符串或对象的形式返回值。 仅在Postgres中使用。
  array: boolean - 用于可以是数组的 postgres 列类型（例如 int []）
  transformer: { from(value: DatabaseType): EntityType, to(value: EntityType): DatabaseType } - 用于将任意类型EntityType的属性编组为数据库支持的类型DatabaseType。
*/
