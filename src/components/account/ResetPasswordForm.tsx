// ResetPasswordForm.tsx
import { useState } from 'react';

interface Props {
  email: string;
  verificationCode: string;
}

const ResetPasswordForm: React.FC<Props> = ({ email, verificationCode }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const resetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage('Password and confirm password do not match');
      return;
    }

    try {
      const response = await fetch('https://adminx.human-initiative.org/login-api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, activkey: verificationCode, passwd: password }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage(data.message);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="border rounded-xl border-stone 300 shadow-md justify-center items-center flex min-h-screen flex-col items-center">
      <h2>Reset Password Form</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter new password"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm new password"
      />
      <button onClick={resetPassword}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default ResetPasswordForm;
