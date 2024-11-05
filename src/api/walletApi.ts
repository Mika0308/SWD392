// walletApi.ts

const API_URL = 'https://mindmath.azurewebsites.net/api/wallets/';
const TRANSACTION_URL = 'https://mindmath.azurewebsites.net/api/transactions/create';

interface WalletData {
    balance: number;
}

interface TransactionData {
    // Define the structure based on your API response
    transactionId: string;
    // Add other properties as needed
}

export const fetchWalletData = async (userId: string, token: string): Promise<WalletData> => {
    try {
        const response = await fetch(`${API_URL}${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text(); // Read the error response
            throw new Error(`Failed to fetch wallet data: ${response.status} - ${errorText}`);
        }

        const walletData: WalletData = await response.json();
        
        console.log('Fetched wallet data:', walletData); // Log the fetched wallet data
        
        return {
            balance: walletData.balance,
        };
    } catch (error) {
        console.error('Error fetching wallet data:', error);
        throw error; // Re-throw the error to handle it later if needed
    }
};

export const createTransaction = async (userId: string, amount: number, description: string, token: string): Promise<TransactionData> => {
    try {
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
            const errorText = await response.text(); // Read the error response
            throw new Error(`Failed to create transaction: ${response.status} - ${errorText}`);
        }

        const transactionData: TransactionData = await response.json();
        
        console.log('Created transaction:', transactionData); // Log the created transaction data
        
        return transactionData;
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw error; // Re-throw the error to handle it later if needed
    }
};
