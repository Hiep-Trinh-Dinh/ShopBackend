import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ name: 'parent_id', nullable: true })
  parentId?: number;

  @Column({ name: 'image_url' })
  imageUrl: string;
}
