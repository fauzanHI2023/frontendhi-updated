// Import date-fns for date formatting and Intl for currency formatting
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

export async function GetPendingTransaction(userId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/csr-api/get-pending-transaction?id=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        // Format the data
        const formattedData = data.data.map((transactionData: any) => {
            const transaction = transactionData.transaction;
            const item = transactionData.items[0]; // first item
            const product = item.product;

            return {
                product_img: product.product_img,
                name: product.name,
                category_program: product.category_program,
                status: transaction.status === 'pending' ? 'Belum Bayar' : 'Berhasil',
                transaction_time: format(new Date(transaction.transaction_time), 'dd MMMM yyyy', { locale: localeId }),
                gross_amount: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.gross_amount)
            };
        });

        return { success: data.success, transactions: formattedData };
    } catch (error) {
        throw new Error('Data tidak ada');
    }
}

export async function GetSuccessTransaction(userId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/csr-api/get-success-transaction?id=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        // Format the data
        const formattedData = data.data.map((transactionData: any) => {
            const transaction = transactionData.transaction;
            const item = transactionData.items[0]; // first item
            const product = item.product;

            return {
                product_img: product.product_img,
                name: product.name,
                category_program: product.category_program,
                status: transaction.status === 'pending' ? 'Belum Bayar' : 'Berhasil',
                transaction_time: format(new Date(transaction.transaction_time), 'dd MMMM yyyy', { locale: localeId }),
                gross_amount: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.gross_amount)
            };
        });

        return { success: data.success, transactions: formattedData };
    } catch (error) {
        throw new Error('Data tidak ada');
    }
}
