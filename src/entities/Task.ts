import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  status!: string; //"Complete" has higher priority than  "Incomplete"

  @Column()
  priority!: string; // "1" : High, "2": medium, "3": low

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  dueDate!: Date; //to be rectify better way

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;

  @ManyToOne(() => User, user => user.tasks)
  user!: User;
}
