import { Body, Controller, Get } from '@nestjs/common';
import { TransferRequestDto } from './dto/transfer-request.dto';
import { TransferService } from './transfer.service';

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService) { }

    @Get('/')
    checkUserWithdraw(@Body() transferRequestDto: TransferRequestDto) {
        return this.transferService.checkUserWithdraw(transferRequestDto);
    }
}
