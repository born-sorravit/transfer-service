export enum TransferTopics {
    // Account
    TRANSFER_CHECK_USER = 'account_check_user',
    TRANSFER_CHECK_PROCESS_SUCCESS = 'transfer_check_process_success',
    TRANSFER_ACCOUNT_UPDATE_BALANCE = 'transfer_account_update_balance',
    // Withdraw
    TRANSFER_WITHDRAW_PROCESS = 'transfer_withdraw_process',
    TRANSFER_WITHDRAW_PROCESS_SUCCESS = 'transfer_withdraw_process_success',
    TRANSFER_WITHDRAW_PROCESS_FAILED = 'transfer_withdraw_process_failed',

    // Deposit 
    TRANSFER_DEPOSIT_PROCESS = 'transfer_deposit_process',
    TRANSFER_DEPOSIT_PROCESS_SUCCESS = 'transfer_deposit_process_success',
    TRANSFER_DEPOSIT_PROCESS_FAILED = 'transfer_deposit_process_failed',

    // Transfer
    TRANSFER_PROCESS_SUCCESS = 'transfer_process_success',
    TRANSFER_PROCESS_FAILED = 'transfer_process_failed',
    TRANSFER_ERROR_HANDLER = 'transfer_error_handler',
}
