import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaModule } from 'src/kafka/kafka.module';
import { Transfer } from './entities/transfer.entity';
import { TransferConsumer } from './transfer.consumer';
import { TransferController } from './transfer.controller';
import { TransferRepository } from './transfer.repository';
import { TransferService } from './transfer.service';

@Module({
  imports: [
    KafkaModule,
    TypeOrmModule.forFeature([Transfer]),
  ],
  controllers: [TransferController],
  providers: [TransferService, TransferRepository, TransferConsumer],
  exports: [TransferService]

})
export class TransferModule { }
