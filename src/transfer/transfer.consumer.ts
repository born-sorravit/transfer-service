import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "src/kafka/consumer.service";
import { formatJSON } from "src/utils/formatJSON";
import { TransferTopics } from "./topics/transfer.enum";
import { TransferService } from "./transfer.service";

@Injectable()
export class TransferConsumer implements OnModuleInit {
    constructor(
        private readonly consumerService: ConsumerService,
        private readonly transferService: TransferService
    ) { }

    async onModuleInit() {
        await this.consumerService.consume(
            { topics: [TransferTopics.TRANSFER_CHECK_PROCESS_SUCCESS, TransferTopics.TRANSFER_WITHDRAW_PROCESS_SUCCESS] },
            {
                eachMessage: async ({ topic, partition, message }) => {
                    console.log(topic);
                    if (topic === TransferTopics.TRANSFER_CHECK_PROCESS_SUCCESS) {
                        // ส่ง topic ไปเผื่อถอนเงินจากผู้โอน และฝากเงินสำหรับผู้รับโอน
                        await this.transferService.withdrawProcess(formatJSON(message.value))
                        await this.transferService.depositProcess(formatJSON(message.value))
                    } else if (topic === TransferTopics.TRANSFER_WITHDRAW_PROCESS_SUCCESS || TransferTopics.TRANSFER_DEPOSIT_PROCESS_SUCCESS) {
                        // รับ topic จาก account 
                        await this.transferService.withdrawSuccess(formatJSON(message.value))
                        await this.transferService.depositSuccess(formatJSON(message.value))
                    }
                }
            }
        );
    }
}