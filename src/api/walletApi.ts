// walletApi.ts
const API_URL = 'https://mindmath.azurewebsites.net/api/wallets/';
const TRANSACTION_URL = 'https://mindmath.azurewebsites.net/api/transactions/create';

export const fetchWalletData = async (userId: string, token: string) => {
    const response = await fetch(`${API_URL}${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch wallet data');
    }
    
    const walletData = await response.json();
    
    return {
        balance: walletData.balance,
    };
};

export const createTransaction = async (userId: string, amount: number, description: string, token: string) => {
    const response = await fetch(`${TRANSACTION_URL}?userId=${userId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: amount,
            description: description,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to create transaction');
    }

    const transactionData = await response.json();
    return transactionData;
};
