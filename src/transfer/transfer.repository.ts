import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProducerService } from 'src/kafka/producer.service';
import { DataSource, Repository } from 'typeorm';
import { TransferRequestDto } from './dto/transfer-request.dto';
import { Transfer } from './entities/transfer.entity';
import { TransferTopics } from './topics/transfer.enum';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransferRepository extends Repository<Transfer> {
    constructor(
        private readonly producerService: ProducerService,
        private dataSource: DataSource,
        @InjectRepository(Transfer) private transferRepository: Repository<Transfer>
    ) {
        super(Transfer, dataSource.createEntityManager());
    }

    async checkUserAccount(transferRequestDto: TransferRequestDto) {
        return this.producerService.produce({
            topic: TransferTopics.TRANSFER_CHECK_USER,
            messages: [
                {
                    value: JSON.stringify({
                        from_account_number: transferRequestDto.from_account_number.toString(),
                        to_account_number: transferRequestDto.to_account_number.toString(),
                        amount: transferRequestDto.amount,
                        payment_type: transferRequestDto.payment_type
                    }),
                }
            ]
        })
    }

    async transferWithdrawProcess(data: any) {
        // ถอนเงินสำหรับผู้โอน
        const transferId = uuidv4();
        const formatteData = {
            ...data,
            transaction_id: transferId
        }
        // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

        this.producerService.produce({
            topic: TransferTopics.TRANSFER_WITHDRAW_PROCESS,
            messages: [
                {
                    value: JSON.stringify(
                        formatteData
                    )
                }
            ]
        })
    }

    async transferDepositProcess(data: any) {
        // ฝากเงินสำหรับผู้รับโอน
        this.producerService.produce({
            topic: TransferTopics.TRANSFER_DEPOSIT_PROCESS,
            messages: [
                {
                    value: JSON.stringify({
                        to_account_number: data.to_account_number,
                        balance: data.balance,
                        amount: data.amount,
                        payment_type: data.payment_type
                    })
                }
            ]
        })
    }

    async transferWithdrawProcessFailed(data: any) {
        // ฝากเงินสำหรับผู้รับโอน
        this.producerService.produce({
            topic: TransferTopics.TRANSFER_WITHDRAW_PROCESS_FAILED,
            messages: [
                {
                    value: JSON.stringify(data)
                }
            ]
        })
    }
}
