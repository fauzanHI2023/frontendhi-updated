"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RiDeleteBin6Line } from "react-icons/ri";

const Checkout: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [notifMessage, setNotifMessage] = useState<string | null>(null);
  const router = useRouter();

  const formatPrice = (price: number) => {
    return `Rp ${Number(price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartItems);

    const loadSnapScript = () => {
      const script = document.createElement('script');
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute('data-client-key', 'SB-Mid-client-UF_dlhjGXoaigX0y');
      script.async = true;
      script.onload = () => {
        console.log("Snap script loaded successfully.");
      };
      script.onerror = () => {
        console.error("Failed to load Snap script.");
      };
      document.body.appendChild(script);
    };

    loadSnapScript();
  }, []);

  const handleDonateNow = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedProducts.length === 0) {
      setNotifMessage("Pilih produk terlebih dahulu.");
      return;
    }

    // Simulate user authentication
    const userId = 1; // Replace with actual user ID
    const fullName = "John Doe"; // Replace with actual user full name
    const email = "johndoe@example.com"; // Replace with actual user email

    try {
      const selectedItems = cart.filter(item => selectedProducts.includes(item.product_id));
      const response = await fetch('https://adminx.human-initiative.org/transaction/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          full_name: fullName,
          email: email,
          items: selectedItems.map(item => ({
            product_id: item.product_id,
            quantity: 1, // Assuming quantity is 1 for now
            price: item.price
          })),
        }),
      });

      const data = await response.json();
      console.log('Backend Response:', data);

      if (data.status === 'success') {
        console.log('Order ID:', data.transaction_id);
        console.log('Snap Token:', data.snap_token);

        if (window.snap) {
          window.snap.pay(data.snap_token, {
            onSuccess: function (result: any) {
              console.log('Transaction successful', result);
              router.push(`/notification?order_id=${result.order_id}&status_code=${result.status_code}&transaction_status=${result.transaction_status}`);
            },
            onPending: function (result: any) {
              console.log('Transaction pending', result);
            },
            onError: function (result: any) {
              console.log('Transaction failed', result);
            },
            onClose: function () {
              console.log('Transaction popup closed');
            }
          });
        } else {
          console.error('Snap is not defined');
        }
      } else {
        console.error('Error creating transaction:', data.message);
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const handleSelectProduct = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleSelectAllProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedProducts(cart.map(item => item.product_id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleDeleteProduct = (productId: number) => {
    const updatedCart = cart.filter(item => item.product_id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDeleteAllProducts = () => {
    setCart([]);
    setSelectedProducts([]);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce((total, productId) => {
      const product = cart.find(item => item.product_id === productId);
      return total + (product ? Number(product.price) : 0);
    }, 0);
  };

  return (
    <main className="flex min-h-screen flex-row justify-center gap-x-4 px-16 py-36 bg-blue-50 dark:bg-slate-900">
      <div className="box flex flex-col gap-y-2 w-[800px]">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        {notifMessage && <p className="mb-4 text-red-500">{notifMessage}</p>}
        <div className="flex flex-row justify-between items-center border shadow rounded-xl dark:bg-slate-900 bg-white p-6">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="selectAll"
              checked={selectedProducts.length === cart.length}
              onChange={handleSelectAllProducts}
              className="cursor-pointer"
            />
            <label htmlFor="selectAll" className="cursor-pointer ml-2">
              {selectedProducts.length === cart.length ? 'Batal Pilih Semua Produk' : 'Pilih Semua Produk'}
            </label>
          </div>
          <button onClick={handleDeleteAllProducts} className="bg-red-500 text-white p-2 rounded mb-4">
            <RiDeleteBin6Line />
          </button>
        </div>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.product_id} className="flex flex-wrap items-center w-full mb-4 border shadow rounded-xl dark:bg-slate-900 bg-white p-6">
              <h5 className="text-base w-2/5 font-normal dark:text-white text-slate-900 pr-16">
                {item.name}
              </h5>
              <p className="flex w-1/5 justify-end">{formatPrice(Number(item.price))}</p>
              <div className="flex gap-x-4 w-full items-center justify-end">
                <input
                  type="checkbox"
                  id={item.product_id}
                  checked={selectedProducts.includes(item.product_id)}
                  onChange={() => handleSelectProduct(item.product_id)}
                  className="cursor-pointer"
                />
                <label htmlFor={item.product_id} className="cursor-pointer">Pilih Donasi Ini</label>
                <button onClick={() => handleDeleteProduct(item.product_id)} className="text-red-500 p-2 rounded">
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Keranjang kosong.</p>
        )}
      </div>
      <div className="w-[384px] flex flex-col h-full justify-between border shadow rounded-xl dark:bg-slate-900 bg-white p-6 mt-[60px]">
        <h1 className="text-normal font-semibold mb-6">Ringkasan Donasi</h1>
        {cart.length > 0 && (
          <div className="flex flex-col items-center justify-end gap-x-8 mt-4">
            <div className="flex flex-row w-full justify-between mb-3">
                <p>Total Donasi</p>
                <p>{formatPrice(calculateTotalPrice())}</p>
            </div>
            <button onClick={handleDonateNow} className="bg-blue-800 text-white p-2 rounded w-full">Proses Donasi</button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Checkout;
