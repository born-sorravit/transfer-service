export enum TransferTopics {
    // Account
    TRANSFER_CHECK_USER = 'account_check_user',
    TRANSFER_CHECK_PROCESS_SUCCESS = 'transfer_check_process_success',
    TRANSFER_ACCOUNT_UPDATE_BALANCE = 'transfer_account_update_balance',

    // Withdraw
    TRANSFER_WITHDRAW_PROCESS = 'transfer_withdraw_process',
    TRANSFER_WITHDRAW_PROCESS_SUCCESS = 'transfer_withdraw_process_success',

    // Deposit 
    TRANSFER_DEPOSIT_PROCESS = 'transfer_deposit_process',
    TRANSFER_DEPOSIT_PROCESS_SUCCESS = 'transfer_deposit_process_success'
}
