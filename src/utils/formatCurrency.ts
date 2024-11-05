export const formatCurrency = (amount: number): string => {
    if (amount >= 1000000) {
        return `${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 100000) {
        return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toLocaleString('vi-VN');
};