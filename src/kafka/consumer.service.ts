import { Logger } from "@nestjs/common";
import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka, KafkaMessage } from "kafkajs";
import * as retry from 'async-retry';

interface KafkajsConsumerOptions {
    topics: ConsumerSubscribeTopics;
    config: ConsumerRunConfig;
    onMessage: (message: KafkaMessage) => Promise<void>;
}
@Injectable()
export class ConsumerService implements OnApplicationShutdown {
    private readonly kafka: Kafka;
    private readonly consumer: Consumer[] = []
    private readonly logger: Logger;
    constructor() {
        this.logger = new Logger(`test-11`);
        try {
            this.kafka = new Kafka({
                brokers: ['localhost:8097', 'localhost:8098', 'localhost:8099'],
                retry: {
                    initialRetryTime: 2500,
                    retries: 10,
                },
            });

        } catch (error) {
            console.log("🚀 error:", error)
        }
    }

    async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
        const consumer = this.kafka.consumer({ groupId: topic + `-service` })
        let onMessage: (message: KafkaMessage) => Promise<void>;
        await consumer.connect()
        await consumer.subscribe(topic)
        // ใช้แบบพี่นก
        await consumer.run(config)
        // await consumer.run({
        //     eachMessage: async ({ message, partition }) => {
        //         this.logger.debug(`Processing message partition: ${partition}`);
        //         try {
        //             await retry(async () => onMessage(message), {
        //                 retries: 1,
        //                 onRetry: (error, attempt) =>
        //                     this.logger.error(
        //                         `Error consuming message, executing retry ${attempt}/3...`,
        //                         error,
        //                     ),
        //             });
        //         } catch (err) {
        //             this.logger.error(
        //                 'Error consuming message. Adding to dead letter queue...',
        //                 err,
        //             );
        //             // this.producerService.produce('transfer_error_handler', {
        //             //     value: JSON.stringify(formatJson(message.value)),
        //             // });
        //         }
        //     },
        // })
        //
        this.consumer.push(consumer)
    }

    async onApplicationShutdown(signal?: string) {
        for (const consumer of this.consumer) {
            await consumer.disconnect()
        }
    }
}