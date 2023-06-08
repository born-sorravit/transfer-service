import { Injectable } from '@nestjs/common';
import { TransferRequestDto } from './dto/transfer-request.dto';
import { TransferRepository } from './transfer.repository';

@Injectable()
export class TransferService {
    constructor(
        private readonly transferRepository: TransferRepository
    ) { }
    async checkUserWithdraw(transferRequestDto: TransferRequestDto) {
        await this.transferRepository.checkUserAccount(transferRequestDto)
    }

    async withdrawProcess(data: any) {
        await this.transferRepository.transferWithdrawProcess(data)
    }

    async transferSuccess(data: any) {
        console.log(`UserId : ${data.account_number} => Transfer withdraw success || Your balance ${data.balance}`);
    }

    async depositProcess(data: any) {
        await this.transferRepository.transferDepositProcess(data)
    }

    async transferFailed(data: any) {
        await this.transferRepository.transferWithdrawProcessFailed(data)
    }

}
