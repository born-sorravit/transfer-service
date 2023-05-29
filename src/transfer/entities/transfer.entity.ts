import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transfer {
    @PrimaryGeneratedColumn({
        name: 'transfer_id',
    })
    transferId: string;

    @Column({ type: 'uuid', unique: true })
    @Generated('uuid')
    uuid: string;

    @Column({ name: 'from_account_number', nullable: false, })
    fromAccountNumber: number;

    @Column({ name: 'to_account_number', nullable: false, })
    toAccountNumber: number;

    @Column({ name: 'transaction_type', nullable: false, default: '' })
    transactionType: string;

    @Column({ name: 'transfer_amount', nullable: false, default: 0 })
    transferAmount: string;

}