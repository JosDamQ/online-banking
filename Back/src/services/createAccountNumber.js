const Account = require('../accounts/account.model')

const generateAccountNumber = async () => {
    let accountNumber 
    let accountExist
    do{
        accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000
        accountExist = await Account.findOne({ accountNumber: accountNumber })
    }while(accountExist)
        
    return accountNumber
}

module.exports = generateAccountNumber 