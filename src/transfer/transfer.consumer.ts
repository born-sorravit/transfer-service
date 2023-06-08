import { HttpException, HttpStatus, Injectable, OnModuleInit } from "@nestjs/common";
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
            {
                topics: [
                    TransferTopics.TRANSFER_CHECK_PROCESS_SUCCESS,
                    TransferTopics.TRANSFER_WITHDRAW_PROCESS_SUCCESS,
                    TransferTopics.TRANSFER_PROCESS_SUCCESS,
                    TransferTopics.TRANSFER_ERROR_HANDLER,
                    TransferTopics.TRANSFER_PROCESS_FAILED
                ]
            },
            {
                eachMessage: async ({ topic, partition, message }) => {
                    console.log(topic);
                    if (topic === TransferTopics.TRANSFER_CHECK_PROCESS_SUCCESS) {
                        // ส่ง topic ไปเผื่อถอนเงินจากผู้โอน และฝากเงินสำหรับผู้รับโอน

                        await this.transferService.withdrawProcess(formatJSON(message.value))
                    } else if (topic === TransferTopics.TRANSFER_PROCESS_SUCCESS) {
                        // รับ topic จาก account เมื่อ trasnfer เสร็จ
                        await this.transferService.transferSuccess(formatJSON(message.value))
                    } else if (topic === TransferTopics.TRANSFER_ERROR_HANDLER) {
                        await this.transferService.transferFailed(formatJSON(message.value))
                    } else if (topic === TransferTopics.TRANSFER_PROCESS_FAILED) {
                        const result = formatJSON(message.value)
                        console.log(`delete transfer at transactionId : ${result.transactionId}`);
                    }
                }
            }
        );
    }
}